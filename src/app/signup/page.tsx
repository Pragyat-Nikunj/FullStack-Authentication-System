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
        <div className="flex flex-col items-center justify-center min-h-screen py-3">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
             id="username"
             type="text"
             value={user.username}
             onChange={(e) => setUser({...user, username:e.target.value})}
             placeholder="Username"
            />
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
            onClick={onSignup}
            >{buttonDisabled ? "No Signup" : "Signup"}</button>
            <p>Already have an account? Click <Link href='/login'>here</Link> to Login</p>
        </div>
    )
}