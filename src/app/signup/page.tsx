"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import {toast} from "react-hot-toast"
export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            toast.success("Signup success");
            router.push("/login");
        } catch(error : any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-linear-to-r from-gray-800 via-blue-700 to-gray-900">
            <h1 className="text-4xl text-yellow-500 mb-5 font-bold">{loading ? "Processing..." : "Signup"}</h1>
            <hr />
            <div className="flex flex-col w-full max-w-md bg-gray-800 p-8 gap-2 rounded-xl shadow-lg">
            <label className="text-start text-xl my-3" htmlFor="username">Username</label>
            <input
             className="py-2 px-3 focus:outline-none bg-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:bg-gray-700"
             id="username"
             type="text"
             value={user.username}
             onChange={(e) => setUser({...user, username:e.target.value})}
             placeholder="Username"
            />
            <label className="text-start text-xl my-3" htmlFor="email">Email</label>
            <input
             className="py-2 px-3 focus:outline-none bg-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:bg-gray-700"
             id="email"
             type="text"
             value={user.email}
             onChange={(e) => setUser({...user, email:e.target.value})}
             placeholder="Email"
            />
            <label className="text-start text-xl my-3" htmlFor="password">Password</label>
            <input
             className="py-2 px-3 focus:outline-none bg-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:bg-gray-700"
             id="password"
             type="password"
             value={user.password}
             onChange={(e) => setUser({...user, password:e.target.value})}
             placeholder="Password"
            />
            <button
            onClick={onSignup}
            className={`px-3 py-2 font-semibold my-4 rounded-xl text-xl shadow-3xl transition-all duration-200
        ${buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 cursor-pointer"}`}
            disabled={buttonDisabled}>{buttonDisabled ? "No Signup" : "Signup"}</button>
            <p className="text-center my-3">Already have an account? Click <Link href='/login' className="text-blue-500 underline">here</Link> to Login</p>
            </div>
        </div>
    )
}