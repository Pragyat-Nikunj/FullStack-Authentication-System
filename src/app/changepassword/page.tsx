"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function changePasswordPage (){
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(""); 
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if (password.length > 0 && confirmPassword.length > 0 && password.toString() === confirmPassword.toString()) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [password, confirmPassword]);
    
    
    const changePassword = async () => {
        try {
            setLoading(true);
            console.log(token);
            const response = await axios.post("/api/users/changepassword", {token, password});
            console.log(response);
            toast.success("Password Changed");
            router.push("/login");
        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [token])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-linear-to-r from-gray-800 via-blue-700 to-gray-900">
            <h1 className="text-4xl text-yellow-500 mb-5 font-bold">{loading ? "Processing..." : "Change Password"}</h1>
            <div className="flex flex-col w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg gap-2">
            <label className="text-start text-xl my-3" htmlFor="password">Password</label>
            <input
             className="py-2 px-3 focus:outline-none bg-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:bg-gray-700"
             id="password"
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Password"
            />
            <label className="text-start text-xl my-3" htmlFor="password">Confirm password</label>
            <input
             className="py-2 px-3 focus:outline-none bg-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:bg-gray-700"
             id="password"
             type="password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             placeholder="Password"
            />
            <button
            onClick={changePassword}
            className={`px-3 py-2 font-semibold my-4 rounded-xl text-xl shadow-3xl transition-all duration-200
                ${buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 cursor-pointer"}`}
            disabled={buttonDisabled}>Change Password</button>
            </div>
        </div>
    )
}