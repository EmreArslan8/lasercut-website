import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, text, html } = await req.json();

    // Nodemailer transport tanımlayın
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail kullanıcı adınız
        pass: process.env.EMAIL_PASS, // Gmail uygulama şifreniz
      },
    });

    // E-posta gönderimi
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Gönderen e-posta
      to, // Alıcı e-posta
      subject, // Konu
      text, // Metin içeriği
      html, // HTML içeriği
    });

    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
