"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios,{ Axios } from "axios";
import toast from "react-hot-toast";
export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch(error : any) {
            console.log("Login Failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-gray-700">
            <h1 className="text-4xl text-blue-500 mb-5 font-bold">{loading ? "Processing..." : "Login"}</h1>
            <hr />
            <div className="flex flex-col w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg gap-2">
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
            onClick={onLogin}
            className={`px-3 py-2 font-semibold my-4 rounded-xl text-xl shadow-3xl transition-all duration-200
                ${buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 cursor-pointer"}`}
            disabled={buttonDisabled}
            >{buttonDisabled ? "No Login" : "Login"}</button>
            <p className="text-center my-3">Don't have an account? Click <Link href='/signup' className="text-blue-500 underline">here</Link> to Signup</p>
            </div>
        </div>
    )
}