import { emailVerificationTemplate } from "@/components/nodemailerTemplate/emailVerificationTemplate";
import { mailOptions, transporter } from "@/lib/config/nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { title, message, receiverEmail, link } = await req.json()
        if (!title || !message || !receiverEmail) {
            return NextResponse.json({ "message": "Missing required data" })
        }
        const mailOption = mailOptions("impactnutritionconsult@gmail.com", receiverEmail)
        await transporter.sendMail({
            ...mailOption,
            subject: title,
            text: message,
            html: emailVerificationTemplate(title, message, link)
        })
        return NextResponse.json("Email Sent", { status: 200 })
    } catch (error) {
        //@ts-ignore
        const msg = error?.message ? error?.message : "Something went wrong!"
        return NextResponse.json({ error: msg }, { status: 500 })
    }

}