import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Slack API çağrıldı...");

    // JSON verisini yalnızca bir kez oku
    const body = await req.json();
  

    const { orderId, name, email, phone, items } = body; // Değişkenlere ata

    if (!items || !Array.isArray(items)) {
      console.error("🚨 HATA: items eksik veya hatalı!", items);
      return NextResponse.json(
        { success: false, error: "Sipariş içeriği eksik veya yanlış formatta!" },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("HATA: Slack Webhook URL tanımlanmamış!");
      return NextResponse.json(
        { success: false, error: "Slack Webhook URL tanımlanmamış!" },
        { status: 500 }
      );
    }

    // Ürünleri Slack mesajına ekle
    const itemsText = items
    .map((item) => 
      `- **Ürün:** ${item.material} | **Adet:** ${item.quantity || 1} | **Kalınlık:** ${item.thickness || 'Bilinmiyor'} | **Fiyat:** ${item.price || 'Bilinmiyor'}\n  📎 **Dosya:** ${item.fileUrl || 'Dosya Yok'}`
    )
    .join("\n");
  

    const message = {
      text: `📢 *Yeni Sipariş Geldi!*\n🆔 *Sipariş ID:* ${orderId || "Bilinmiyor"}\n👤 *Müşteri:* ${name}\n📧 *E-Posta:* ${email}\n📞 *Telefon:* ${phone || "Belirtilmemiş"}\n📦 **Sipariş İçeriği:**\n${itemsText}`
    };

   

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("🚨 Slack mesajı gönderilemedi! Hata:", errorText);
      throw new Error(`Slack API Hatası: ${errorText}`);
    }

    console.log("✅ Slack mesajı başarıyla gönderildi!");
    return NextResponse.json({ success: true, message: "Slack mesajı gönderildi!" }, { status: 200 });

  } catch (error: unknown) {
    console.error("🚨 API Hatası:", 
      error instanceof Error ? error.message : 'Bilinmeyen hata',
      error instanceof Error ? error.stack : ''
    );
    return NextResponse.json(
      { error: `Slack mesajı gönderilemedi: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}` },
      { status: 500 }
    );
  }
}
