"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/stores/useLoginModal";

export const LoginForm = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submitLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setError("");
        // Call API to login user and handle response

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            console.log(response);

            const data = await response.json();
            if (response.ok) {
                console.log("Logged in successfully", data);
                loginModal.close();
                router.push("/");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred while logging in");
            console.log("Error logging in", error);
        }
    };

    return (
        <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Welcome back</span>
            <span className="font-light text-gray-400 mb-8">
                Welcome back! Please enter your details
            </span>
            <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    placeholder="Your email address"
                    required
                />
            </div>
            <div className="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                    placeholder="Your password"
                    required
                />
            </div>
            <div className="flex justify-between w-full py-4">
                <div className="mr-24">
                    <input type="checkbox" name="ch" id="ch" className="mr-2" />
                    <span className="text-md">Remember for 30 days</span>
                </div>
                <span className="font-bold text-md">Forgot password</span>
            </div>
            <button
                onClick={submitLogin}
                className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white  hover:text-black hover:border hover:border-gray-300"
            >
                Sign in
            </button>
            <button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
                <Image
                    src="/logos/google.svg"
                    alt="Google"
                    width={"6"}
                    height={"6"}
                    className="w-6 h-6 inline mr-2"
                />
                Sign in with Google
            </button>
            <div className="text-center text-gray-400">
                Don't have an account?
                <Link href="/register">
                    <span
                        className="pl-5 font-bold text-black"
                        onClick={() => {}}
                    >
                        Sign up for free
                    </span>
                </Link>
            </div>
        </div>
    );
};
