import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log("Request body:", reqBody);
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" },
                { status: 400 }
            )
        };
        // Check if password is correct
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: "Invalid credentials" },
                { status: 400 }
            )
        }
        // Create a token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // Create a token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "5d"
        });

        // Create the response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });
        // Set the token in the cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}
