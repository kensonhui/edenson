import Link from 'next/link'

export default function Navbar() {
    return (
        <ul
            className="flex p-3 items-baseline shadow-md">
            <li className="m-2 text-2xl">
                <Link href="/">HackMyBack</Link>
            </li>
            <li className="m-2 text-base">
                <Link href="/app">App</Link>
            </li>
            <li className="m-2 text-base">
                <Link href="/app">App</Link>
            </li>
        </ul>
    )
}
