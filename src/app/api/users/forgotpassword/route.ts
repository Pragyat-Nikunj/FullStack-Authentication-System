import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import {sendEmail} from '@/helpers/mailer';

connect();

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await User.findOne({email: email});
        
        if (!user) {
            return NextResponse.json({message: "User with this email doesn't exist"}, {status: 404});
        }

        await sendEmail({email, emailType: "RESET", userId: user._id});
        return NextResponse.json({message: "Email Sent for changing password successfully"}, {status: 201})
    } catch (error: any) {
        return NextResponse.json({message: "Something went wrong while verifying email.", error: error.message}, {status: 500})
    }
}