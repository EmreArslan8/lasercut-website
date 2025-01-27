import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  return NextResponse.json(
    { error: "This endpoint only supports POST requests." },
    { status: 405 }
  );
}

export async function POST(req: Request) {
  try {
    // İstekten `to`, `subject`, `text`, ve `html` alanlarını alın
    const { to, subject, text, html } = await req.json();

    // Eğer `to` alanı boşsa hata döndür
    if (!to || !to.includes("@")) {
      return NextResponse.json(
        { error: "A valid recipient email address is required" },
        { status: 400 }
      );
    }

    // Nodemailer transport tanımlayın
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gönderen e-posta adresi
        pass: process.env.EMAIL_PASS, // Şifre veya uygulama şifresi
      },
    });

    // E-posta gönderimi
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Gönderen adres
      to, // Formdan alınan alıcı e-posta adresi
      subject, // Konu
      text, // Düz metin içeriği
      html, // HTML içeriği
    });

    // Başarılı yanıt
    return NextResponse.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
