import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connect from "@/lib/db";
import User from "@/lib/modals/user";

export const POST = async (req: Request) => {
    try {
        const { email, password } = await req.json();
        await connect();

        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid credentials" }),
                { status: 401 }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: "Login successful", user }),
            { status: 200 }
        );
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Error in login: " + error.message }),
            { status: 500 }
        );
    }
};
