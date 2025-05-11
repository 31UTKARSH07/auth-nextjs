import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModel";

await connect();

export async function GET(request: NextRequest) {
    try {
        console.log("API HIT")
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).
            select("-password")
        return NextResponse.json({
            message: "User found",
            data: user,
        }, { status: 200 })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}