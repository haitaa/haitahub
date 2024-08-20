import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), { status: 200 });
    } catch (error: any) {
        return new NextResponse("Error in fetching users" + error.message, { status: 500 });
    }
}

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        await connect();
        const newUser = new User(body);
        await newUser.save();

        return new NextResponse(
            JSON.stringify({ message: "User created successfully", user: newUser }),
            { status: 201 }
        )
    } catch(error: any) {
        return new NextResponse("Error in creating user" + error.message, { status: 500 });
    }
}