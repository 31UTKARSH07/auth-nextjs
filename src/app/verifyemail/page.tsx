"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"

export default function VerifyEmailPage() {
  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(true)
      console.log(error.response?.data)
    }
  }

  // ✅ Runs once to extract token from URL
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || "")
  })

  // ✅ Runs whenever token is set
  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 ">{token ? token : "No token"}</h2>

      {verified && (
        <div className="p-2 bg-green-500">
          <h2>Email verified successfully!</h2>
          <Link href="/login" className="text-blue-500">Login</Link>
        </div>
      )}

      {error && (
        <div className="p-2 bg-red-500">
          <h2 className="text-2xl">Error found</h2>
        </div>
      )}
    </div>
  )
}
