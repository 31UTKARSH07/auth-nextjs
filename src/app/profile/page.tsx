"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Successful");
            router.push("/login");
        } catch (error: any) {
            console.log("LOGOUT ERROR", error.message);
            toast.error(error.message)
        }
    }
    // const getUserDetails = async () => {
    //     const res = await axios.get("/api/users/me");
    //     console.log("User Details", res.data);
    //     setData(res.data.data._id);
    // }
    const getUserDetails = async () => {
        try {
          console.log("Fetching user details...");
          const res = await axios.get("/api/users/me");
          console.log("User Details response:", res);
          setData(res.data.data._id);
        } catch (err: any) {
          console.error("GET /api/users/me failed:", err.response?.status, err.message);
          toast.error("Could not load profile");
        }
      };
      
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h1>Profile Page</h1>
            <h2 className="p-1 bg-green-600 rounded mt-2">{data === "nothing" ? "Nothing ,Data is null" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 p-2 border border-gray-300 rounded-lg mt-4 mb-4 focus:outline-none focus:border-gray-600"
            >Logout</button>
            <button
                onClick={getUserDetails}
                className="bg-green-800 p-2 border border-gray-300 rounded-lg mt-4 mb-4 focus:outline-none focus:border-gray-600"
            >Get_Users_Details</button>
        </div>
    )
}