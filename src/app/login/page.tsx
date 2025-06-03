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
        <div className="flex flex-col items-center justify-center min-h-screen py-3">
            <h1>{loading ? "Processing..." : "Login"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input
             id="email"
             type="text"
             value={user.email}
             onChange={(e) => setUser({...user, email:e.target.value})}
             placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
             id="password"
             type="text"
             value={user.password}
             onChange={(e) => setUser({...user, password:e.target.value})}
             placeholder="Password"
            />
            <button
            onClick={onLogin}
            >{buttonDisabled ? "No Login" : "Login"}</button>
            <p>Don't have an account? Click <Link href='/signup'>here</Link> to Signup</p>
        </div>
    )
}