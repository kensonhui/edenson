import { useRef, useEffect, useState, useCallback } from "react";
import Head from "next/head";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { deepStrictEqual } from "assert";
import { nextTick } from "process";
import { drawSkeleton, drawKeypoints } from "../../utils/utilities";
const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 800,
  height: 720,
  facingMode: "user",
};
const Home = (props) => {
  useEffect(() => {
      let interval;
    const runPosenet = async () => {
      const posenet_model = await posenet.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.5,
      });
      //
    interval = setInterval(() => {
      detectWebcamFeed(posenet_model);
    }, 200);
    };
    runPosenet();

    return () => {
      clearInterval(interval);
    };
  });
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detectWebcamFeed = async (posenet_model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // Make Estimation
      const pose = await posenet_model.estimateSinglePose(video);
      drawResult(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawResult = (pose, video, videoWidth, videoHeight, canvas) => {
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;
    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
};

export default Home;
