import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Slack API çağrıldı...");

    const { orderId, formData, cartItemsWithUrls } = await req.json();
    console.log("Gelen Sipariş:", orderId, formData, cartItemsWithUrls);

    const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("HATA: Slack Webhook URL tanımlanmamış!");
      return NextResponse.json({ success: false, error: "Slack Webhook URL tanımlanmamış!" }, { status: 500 });
    }

    // **Ürünleri Slack mesajına ekleyelim**
    const itemsText = cartItemsWithUrls
      .map((item: { material: string ; thickness: string; quantity: number; price: number;   fileUrl?: string; }) => `- **Ürün:** ${item.material} | **Adet:** ${item.quantity || 1} | *Kalınlık:** ${item.quantity || 1} | **Fiyat:** ${item.price || 'Bilinmiyor'}\n  📎 **Dosya:** ${item.fileUrl || 'Dosya Yok'}`)
      .join("\n");

    const message = {
      text: `📢 *Yeni Sipariş Geldi!*\n🆔 *Sipariş ID:* ${orderId}\n👤 *Müşteri:* ${formData.name}\n📧 *E-Posta:* ${formData.email}\n📞 *Telefon:* ${formData.phone}\n📦 **Sipariş İçeriği:**\n${itemsText}`
    };

    console.log("Slack Mesajı Gönderiliyor...", message);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Slack mesajı gönderilemedi! Hata:", errorText);
      throw new Error(`Slack API Hatası: ${errorText}`);
    }

    console.log("Slack mesajı başarıyla gönderildi!");
    return NextResponse.json({ success: true, message: "Slack mesajı gönderildi!" }, { status: 200 });

  } catch (error: unknown) {
    console.error("🚨 API Hatası:", 
      error instanceof Error ? error.message : 'Unknown error',
      error instanceof Error ? error.stack : ''
    );
    return NextResponse.json(
      { error: `Failed to send slack: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}
