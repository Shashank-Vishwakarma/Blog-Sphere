"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
                <h2 className="text-3xl font-bold text-center">
                    Login to Blog Sphere
                </h2>
                <div className="mt-4"></div>

                <div
                    className="flex items-center justify-center bg-slate-100 p-4 rounded-md cursor-pointer"
                    onClick={() => signIn("google", { redirectTo: "/" })}>
                    <Image
                        src="/search.png"
                        alt="Google Logo"
                        width={50}
                        height={18}
                    />
                </div>

                <div className="flex items-center justify-center m-2 text-blue-600 cursor-pointer">
                    <Link href="/">Go back to home</Link>
                </div>
            </div>
        </div>
    );
}
