import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {


    const { subject, text, html, recipients } = await req.json();
    
    // **📌 Alıcı listesi belirle (eğer dışarıdan bir alıcı belirtilmemişse .env içindekileri kullan)**
    const recipientEmails = recipients || [
      process.env.GMAIL_USER,
      process.env.HOTMAIL_USER,
    ].filter(Boolean); // `undefined` olanları kaldır

    console.log("📩 Gönderilecek e-posta adresleri:", recipientEmails);

    if (recipientEmails.length === 0) {
      return NextResponse.json(
        { error: "At least one recipient email is required" },
        { status: 400 }
      );
    }

    // **📌 Gmail ve Hotmail için ayrı transporter oluştur**
    const gmailTransporter = process.env.GMAIL_USER
      ? nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
          },
        })
      : null;

    const hotmailTransporter = process.env.HOTMAIL_USER
      ? nodemailer.createTransport({
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.HOTMAIL_USER,
            pass: process.env.HOTMAIL_PASS,
          },
          tls: {
            ciphers: "SSLv3",
          },
        })
      : null;

    // **📌 E-posta gönderme fonksiyonu**
    const sendEmail = async (transporter: nodemailer.Transporter | null, user: string | undefined) => {
      if (!transporter || !user) return null;
      try {
        return await transporter.sendMail({
          from: user,
          to: recipientEmails,
          subject,
          text,
          html,
        });
      } catch (error) {
        console.error(`🚨 ${user} için e-posta gönderme hatası:`, error);
        return null;
      }
    };

    // **📌 Aynı anda Gmail ve Hotmail'e e-posta gönder**
    const [gmailResult, hotmailResult] = await Promise.all([
      sendEmail(gmailTransporter, process.env.GMAIL_USER),
      sendEmail(hotmailTransporter, process.env.HOTMAIL_USER),
    ]);

    console.log("✅ E-postalar gönderildi:", { gmailResult, hotmailResult });

    return NextResponse.json({ message: "Emails sent successfully!" });
  } catch (error: unknown) {
    console.error(
      "🚨 API Hatası:",
      error instanceof Error ? error.message : "Unknown error",
      error instanceof Error ? error.stack : ""
    );
    return NextResponse.json(
      {
        error: `Failed to send emails: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}
