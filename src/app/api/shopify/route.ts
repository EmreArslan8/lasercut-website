import { NextRequest, NextResponse } from 'next/server';

const densities: Record<string, number> = {
  "Aluminum": 0.00272,
  "DKP Steel": 0.00786,
  "ST37-K / S235JR": 0.00785,
  "Stainless Steel 304": 0.00793,
  "Stainless Steel 316L": 0.00800,
  "Black Sheet": 0.00785,
};

const unitPrices: Record<string, number> = {
  "Aluminum": 165.72024,
  "DKP Steel": 45.3726,
  "ST37-K / S235JR": 46.62,
  "Stainless Steel 304": 139.1544,
  "Stainless Steel 316L": 123.97392,
  "Black Sheet": 40.7358,
};

const laborCosts: Record<string, number> = {
  "Aluminum": 50,
  "DKP Steel": 50,
  "ST37-K / S235JR": 50,
  "Stainless Steel 304": 50,
  "Stainless Steel 316L": 50,
  "Black Sheet": 50,
};

// OPTIONS isteği, preflight kontrolü için gerekli
export async function OPTIONS(req: NextRequest) {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*', // İsteğe özel domain ekleyebilirsiniz
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { material, width, height, thickness, quantity } = body;

    if (!material || !width || !height || !thickness || !quantity) {
      return NextResponse.json(
        { error: 'Eksik bilgi' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Fiyat Hesaplama
    const density = densities[material];
    const rawPrice = unitPrices[material];
    const laborCost = laborCosts[material];
    const weight = (thickness * width * height * density) / 1000;
    const laserMaterialPrice = rawPrice * 1.04;
    const materialCost = weight * laserMaterialPrice;
    const laborCostTotal = weight * laborCost;
    const totalCost = (materialCost + laborCostTotal) * quantity;
    const totalUSD = totalCost * 1.35 / 38;
    const finalPrice = parseFloat(totalUSD.toFixed(2));
    const productTitle = `${material} ${width}x${height}x${thickness}`;

    // Shopify API isteği
    const shop = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ACCESS_TOKEN;

    const productRes = await fetch(`https://${shop}/admin/api/2023-10/products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token!,
      },
      body: JSON.stringify({
        product: {
          title: productTitle,
          status: 'active',
          variants: [
            {
              price: finalPrice.toString(),
              inventory_management: 'shopify',
              inventory_quantity: 9999,
              requires_shipping: false
            }
          ]
        }
      })
    });

    const productData = await productRes.json();
    const variantId = productData?.product?.variants?.[0]?.id;

    if (!variantId) {
      return NextResponse.json(
        { error: 'Varyant oluşturulamadı.' },
        { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    return NextResponse.json(
      { variantId, price: finalPrice },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
