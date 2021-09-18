import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white w-screen p-4">
      <ul className="flex">
        <li className="p-1">
          <Link href="/">
            <h1>Edenson</h1>
          </Link>
        </li>
        <li className="p-1">
          <Link href="/app">
            <h2>App</h2>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
