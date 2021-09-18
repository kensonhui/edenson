import {connectToDatabase} from "./_connector"
export default async (req, res) => {
  const db = await connectToDatabase();
  const entry = await db.db("sample_airbnb").collection('listingsAndReviews').findOne();
  res.status(200).json({ name: entry })
}
