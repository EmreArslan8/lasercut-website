import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/api/supabaseClient";


export async function POST(request: NextRequest) {
  try {
    const { lineItems, userData } = await request.json();

    const response = await fetch(
      `https://kiy6sc-im.myshopify.com/admin/api/2024-01/draft_orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          draft_order: {
            line_items: lineItems,
            use_customer_default_address: false,
            currency: "USD",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Shopify API Hata Yanıtı:", errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    const draftOrderId = data.draft_order.id.toString();

    console.log("✅ Shopify Draft Order Oluşturuldu:", draftOrderId);

    // Supabase'e Pending Order Kaydet
    const { error: insertError } = await supabase.from("pending_orders").insert({
      draft_order_id: draftOrderId,
      user_name: userData.name,
      user_email: userData.email,
      user_phone: userData.phone,
      file_name: userData.fileName,
      file_url: userData.fileUrl,
      product_details: JSON.stringify(userData.productDetails),
    });

    if (insertError) {
      console.error("❌ Supabase Pending Order Kaydı Hatası:", insertError);

      // Slack Hata Bildirimi Gönderel
    }

    // Shopify Draft Order'a note_attributes eklemek için güncelleme
    await fetch(
      `https://kiy6sc-im.myshopify.com/admin/api/2024-01/draft_orders/${draftOrderId}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          draft_order: {
            note_attributes: [{ name: "draft_order_id", value: draftOrderId }],
          },
        }),
      }
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Draft Order API Hatası:", error);


    return NextResponse.json(
      { error: "Draft Order oluşturulurken beklenmedik bir hata oluştu." },
      { status: 500 }
    );
  }
}
