import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log('Gelen body:', body);

    const { productName, quantity, price, customDetails } = body;

    // properties nesnesini [{ name: ..., value: ... }] şeklinde diziye çeviriyoruz
    const propertiesArray = Object.entries(customDetails).map(([key, value]) => ({
      name: key,
      value: String(value),
    }));

    const requestBody = {
      draft_order: {
        line_items: [
          {
            title: productName,
            quantity,
            price,
            properties: propertiesArray,
          },
        ],
      },
    };

    console.log('Shopify API’ye gönderilecek body:', JSON.stringify(requestBody, null, 2));

    const shopifyResponse = await fetch(
      `https://kiy6sc-im.myshopify.com/admin/api/2024-01/draft_orders.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN || '',
        },
        body: JSON.stringify(requestBody),
      }
    );

    const responseText = await shopifyResponse.text();
    console.log('Shopify API Response Status:', shopifyResponse.status);
    console.log('Shopify API Response Text:', responseText);

    if (!shopifyResponse.ok) {
      console.error('Shopify API Hata Yanıtı:', responseText);
      return NextResponse.json({ error: responseText }, { status: shopifyResponse.status });
    }

    const data = JSON.parse(responseText);
    console.log('Shopify API Parsed Data:', data);

    return NextResponse.json({ checkoutUrl: data.draft_order.invoice_url });
  } catch (error) {
    console.error('Sunucu Tarafında Hata:', error);
    return NextResponse.json({ error: 'Beklenmedik bir hata oluştu' }, { status: 500 });
  }
}
