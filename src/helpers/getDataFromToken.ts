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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decodedToken: any = jwt.verify(token, tokenSecret);
        return decodedToken.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new Error(error.message)
    }
}
