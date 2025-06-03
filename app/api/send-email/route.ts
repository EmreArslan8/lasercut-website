import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { subject, text, html } = await req.json();

    // 🔒 Burada sabit alıcıyı belirliyoruz
    const recipientEmail = process.env.GMAIL_USER;

    if (!subject || !text || !html) {
      return NextResponse.json(
        { error: "Eksik veri: subject, text ve html zorunludur." },
        { status: 400 }
      );
    }

    console.log("📩 Gönderilecek e-posta adresi:", recipientEmail);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const result = await transporter.sendMail({
      from: `"2dtocut" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      subject,
      text,
      html,
    });

    console.log(`✅ Mail gönderildi: ${process.env.GMAIL_USER} -> ${recipientEmail}`);
    console.log("📦 SMTP yanıtı:", result.response);

    return NextResponse.json({ message: "E-posta başarıyla gönderildi." });
  } catch (error: any) {
    console.error("🚨 Mail gönderme hatası:", error.message);
    return NextResponse.json(
      { error: "Mail gönderilemedi", details: error.message },
      { status: 500 }
    );
  }
}

