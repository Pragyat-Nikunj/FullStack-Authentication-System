import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';    
import bcryptjs from 'bcryptjs';



connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        if (!username) {
            return NextResponse.json({message: "Username Required"}, {status: 400});
        }

        if (!email) {
            return NextResponse.json({message: "Email Required"}, {status: 400});
        }

        if (!password) {
            return NextResponse.json({message: "Password Required"}, {status: 400});
        }

        console.log(reqBody);


        const user = await User.findOne({email});

        if (user) {
            return NextResponse.json({error: "User already exists."}, {status: 400})
        }

        //hash password
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password ,salt);

        const newUser = new User({
            username,
            email, 
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully.",
            success: true,
            savedUser,
        }, {status: 201})
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}