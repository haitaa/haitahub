import connect from "@/lib/db";
import User from "@/lib/modals/user";
import { NextResponse } from "next/server";
import { Types } from "mongoose";

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

export const PATCH = async (req: Request) => {
    try {
        const body = await req.json();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse("Invalid user ID", { status: 400 });
        }

        await connect();

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: body },
            { new: true, runValidators: true }
        )

        if (!updatedUser) {
            return new NextResponse("User not found", { status: 404 });
        }

        return new NextResponse(
            JSON.stringify({ message: "User updated successfully", user: updatedUser }),
            { status: 200 }
        )

    } catch (error: any) {
        return new NextResponse("Error in updating user" + error.message, { status: 500 });
    }
}

export const DELETE = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(
                JSON.stringify({ message: "Invalid or missing user ID" }),
                { status: 400 }
            )
        }

        await connect();

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return new NextResponse(
                JSON.stringify({ message: "User not found" }),
                { status: 404 }
            )
        }

        // Returns a success message
        return new NextResponse(
            JSON.stringify({ message: "User deleted successfully", user: deletedUser}),
            { status: 200}
        )

    } catch (error: any) {
        return new NextResponse("Error in deleting user" + error.message, { status: 500 });
    }
}