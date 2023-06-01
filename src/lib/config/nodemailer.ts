import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
})

export const mailOptions = (from: string, to: string) => {
    return {
        from,
        to
    }
}