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
      .map((item: { material: string ; quantity: any; price: any; fileUrl: any;  thickness: any }) => `- **Ürün:** ${item.material} | **Adet:** ${item.quantity || 1} | *Kalınlık:** ${item.quantity || 1} | **Fiyat:** ${item.price || 'Bilinmiyor'}\n  📎 **Dosya:** ${item.fileUrl || 'Dosya Yok'}`)
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

  } catch (error: any) {
    console.error("Slack mesaj gönderme hatası:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
