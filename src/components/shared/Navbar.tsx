import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-gray-200">
            <div className="flex items-center">
                <Image
                    src="/blog.png"
                    alt="Blog Sphere Logo"
                    width={48}
                    height={48}
                />
            </div>
            <div className="flex items-center">
                <Link href="/login">
                    <button className="p-2 font-medium text-lg bg-slate-100">
                        Login
                    </button>
                </Link>
            </div>
        </nav>
    );
}
