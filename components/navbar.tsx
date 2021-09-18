import Link from 'next/link'

export default function Navbar() {
    return (
        <ul
            className="flex p-3 bg-blue-600 text-white items-center shadow-md">
            <li className="m-2 text-xl">
                <Link href="/">HackMyBack</Link>
            </li>
            <li className="m-2 text-base">
                <Link href="/app">Start Session</Link>
            </li>
        </ul>
    )
}