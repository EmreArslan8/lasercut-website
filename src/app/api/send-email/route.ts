import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {


    const { to, subject, text, html } = await req.json();


    if (!to || !to.includes("@")) {
      return NextResponse.json(
        { error: "A valid recipient email address is required" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });

   

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error: unknown) {
    console.error("🚨 API Hatası:", 
      error instanceof Error ? error.message : 'Unknown error',
      error instanceof Error ? error.stack : ''
    );
    return NextResponse.json(
      { error: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
