"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function forgotPasswordPage (){
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    
    useEffect(() => {
        if (email.length > 0 && email.includes('@')) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);

    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", {email});
            console.log(response);
            toast.success("Email Sent")
        } catch (error : any) {
            console.log("Request Failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white bg-linear-to-r from-gray-800 via-blue-700 to-gray-900">
            <h1 className="text-4xl text-yellow-500 mb-5 font-bold">{loading ? "Processing..." : "Forgot Password"}</h1>
            <div className="flex flex-col w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg gap-2">
            <label className="text-start text-xl my-3" htmlFor="email">Email</label>
            <input
             className="py-2 px-3 focus:outline-none bg-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:bg-gray-700"
             id="password"
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Email"
            />
            <button
            onClick={onSubmit}
            className={`px-3 py-2 font-semibold my-4 rounded-xl text-xl shadow-3xl transition-all duration-200
                ${buttonDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 cursor-pointer"}`}
            disabled={buttonDisabled}>Submit</button>
            </div>
        </div>
    )
}