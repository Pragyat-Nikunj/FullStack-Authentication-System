import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: 'prag@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `<p>Click ${emailType === "VERIFY" ? `<a href=${process.env.DOMAIN!}/verifyemail?token=${hashedToken}
            >here</a>` : `<a href=${process.env.DOMAIN!}/changepassword?token=${hashedToken}
            >here</a>`} to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paster the link below in your browser. </br> ${emailType === "VERIFY" ? `${process.env.DOMAIN!}/verifyemail?token=${hashedToken}` : `${process.env.DOMAIN!}/changepassword?token=${hashedToken}`}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }

}