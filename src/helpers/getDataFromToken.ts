import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const tokenSecret = process.env.TOKEN_SECRET; // You were using toKeNSECret (typo error) here
        console.log("Token secret:", tokenSecret);
        if (!tokenSecret) {
            throw new Error("TOKEN SECRET NOT FOUND");
        }
        const decodedToken: any = jwt.verify(token, tokenSecret);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message)
    }
}
