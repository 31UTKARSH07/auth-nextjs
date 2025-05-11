// File: /app/api/users/signup/route.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

// REMOVE the top-level await connect() call!
// Instead, we'll call connect() inside the handler

export async function POST(request: NextRequest) {
    try {
        // Connect to the database INSIDE the handler function
        console.log("Connection started");
        await connect();
        console.log("Connection completed");

        // Parse request body
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log("Request body:", reqBody);

        // Check if user exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to database
        const savedUser = await newUser.save();
        console.log("User saved:", savedUser);
        // Send verification email (optional)
        await sendEmail({
            email,emailType: "VERIFY", userId: savedUser._id
            
        })



        // Return success response
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            }
        }, { status: 201 }); // Add status code 201 for resource creation
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}