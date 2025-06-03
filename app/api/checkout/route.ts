import { supabase } from "@/lib/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();


    const { items } = body; // Kullanıcıdan gelen ürün ID’leri

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Eksik bilgiler!" }, { status: 400 });
    }

    // **📌 Yeni `checkoutId` oluştur**
    const checkoutId = `CHKOUT-${Date.now()}`; // Örn: CHKOUT-1710792000000

  


    // **📌 Seçili ürünleri Supabase’ten al**
    const { data: selectedItems, error } = await supabase
      .from("cart_items")
      .select("*")
      .in("id", items); // Seçili ürün ID’leriyle filtrele

    if (error) {
      console.error("🚨 API Hatası:", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    // **📌 Checkout bilgisini Supabase’e kaydet**
    const { error: checkoutError } = await supabase
      .from("checkouts") // 📌 "checkouts" tablosuna kaydediyoruz
      .insert([
        {
          id: checkoutId,
          items: JSON.stringify(selectedItems),
          status: "pending", // Ödeme yapılana kadar "pending" olarak kalır
        },
      ]);

    if (checkoutError) {
      console.error("🚨 Checkout kaydedilemedi:", checkoutError);
      return NextResponse.json({ success: false, message: checkoutError.message }, { status: 500 });
    }

    console.log(`✅ Checkout oluşturuldu: ${checkoutId}`);

    return NextResponse.json({ success: true, checkoutId });
  } catch (error: any) {
    console.error("🚨 API Hatası:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
