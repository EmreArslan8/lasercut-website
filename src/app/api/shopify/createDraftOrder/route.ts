import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lineItems } = body;

    console.log("📥 Gelen İstek Verisi (lineItems):", JSON.stringify(lineItems, null, 2));

    const shopifyResponse = await fetch(
      `https://kiy6sc-im.myshopify.com/admin/api/2024-01/draft_orders.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN || "",
        },
        body: JSON.stringify({
          draft_order: {
            line_items: lineItems,
          },
        }),
      }
    );

    const data = await shopifyResponse.json();

    console.log(
      `📤 Shopify API Yanıtı - Status: ${shopifyResponse.status}`,
      JSON.stringify(data, null, 2)
    );

    if (!shopifyResponse.ok) {
      console.error("❌ Shopify API Hata Yanıtı:", data);
      return NextResponse.json({ error: data }, { status: shopifyResponse.status });
    }

    console.log("✅ Taslak Sipariş Başarıyla Oluşturuldu:", data.draft_order.invoice_url);

    return NextResponse.json({ checkoutUrl: data.draft_order.invoice_url });
  } catch (error) {
    console.error("❌ Sunucu Tarafında Beklenmedik Hata:", error);
    return NextResponse.json(
      { error: "Beklenmedik bir hata oluştu" },
      { status: 500 }
    );
  }
}
