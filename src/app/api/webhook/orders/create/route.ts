import { supabase } from "@/lib/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

// Slack bildirimi için fonksiyon
async function sendSlackNotification(message: string) {
  try {
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
  } catch (err) {
    console.error("❌ Slack bildirimi gönderilemedi:", err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    const draftOrderId =
      orderData.note_attributes?.find(
        (attr: { name: string; value: string }) => attr.name === "draft_order_id"
      )?.value || null;

    if (!draftOrderId) {
      console.error("❌ draft_order_id bulunamadı!");
      return NextResponse.json(
        { error: "draft_order_id bulunamadı!" },
        { status: 400 }
      );
    }

    const { data: pendingOrder, error: pendingOrderError } = await supabase
      .from("pending_orders")
      .select("*")
      .eq("draft_order_id", draftOrderId)
      .single();

    if (pendingOrderError) {
      console.error("❌ Pending Order bulunamadı:", pendingOrderError.message);
      return NextResponse.json(
        { error: "Pending Order bulunamadı." },
        { status: 404 }
      );
    }

    const customerInfo = orderData.billing_address || {};
    const email = orderData.contact_email || orderData.email;
    const productDetails = JSON.parse(pendingOrder.product_details);

    const { error: insertError } = await supabase.from("orders").insert({
      order_id: orderData.id.toString(),
      draft_order_id: draftOrderId,
      user_name: `${customerInfo.first_name} ${customerInfo.last_name}`,
      user_email: email,
      user_phone: customerInfo.phone || null,
      address: `${customerInfo.address1}, ${customerInfo.city}, ${customerInfo.country}`,
      file_url: pendingOrder.file_url,
      product_details: pendingOrder.product_details,
      status: "Sipariş Alındı",
      total_price: orderData.current_total_price,
      currency: orderData.currency,
    });

    if (insertError) {
      console.error(
        "❌ Sipariş orders tablosuna eklenemedi:",
        insertError.message
      );
      return NextResponse.json(
        { error: "Sipariş kaydedilemedi." },
        { status: 500 }
      );
    }

    // pending_orders tablosundan silebilirsin istersen
    await supabase.from("pending_orders").delete().eq("draft_order_id", draftOrderId);

    // 🟢 Slack Bildirimi
    await sendSlackNotification(`
✅ Yeni Sipariş Alındı!
🧾 Sipariş ID: ${orderData.id}
📦 Draft Order ID: ${draftOrderId}
👤 Müşteri: ${customerInfo.first_name} ${customerInfo.last_name}
✉️ E-Posta: ${email}
📞 Telefon: ${customerInfo.phone || "Belirtilmemiş"}
📍 Adres: ${customerInfo.address1}, ${customerInfo.city}, ${customerInfo.country}
💲 Toplam Fiyat: ${orderData.current_total_price} ${orderData.currency}
📄 Dosya Linki: ${pendingOrder.file_url || "Dosya Eklenmemiş"}
🛠️ Ürün Detayı:
  - Malzeme: ${productDetails.material}
  - Kalınlık: ${productDetails.thickness} mm
  - Adet: ${productDetails.quantity}
`);

    return NextResponse.json({ message: "Sipariş başarıyla eklendi." });
  } catch (error) {
    console.error("❌ Webhook işleme hatası:", error);
    return NextResponse.json(
      { error: "Beklenmedik bir hata oluştu." },
      { status: 500 }
    );
  }
}
