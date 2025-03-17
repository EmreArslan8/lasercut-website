import { supabase } from "@/lib/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { data, error } = await supabase.from("cart_items").select("*");

    if (error) {
      console.error("🚨 Supabase Hatası:", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }



    // 📌 **Burada `file_name` → `fileName`, `file_url` → `fileUrl` gibi dönüşümler yapılıyor**
    const formattedData = data.map((item) => ({
      id: item.id,
      fileName: item.file_name, // ✅ `file_name` → `fileName`
      fileUrl: item.file_url,   // ✅ `file_url` → `fileUrl`
      material: item.material,
      thickness: item.thickness,
      quantity: item.quantity,
      coating: item.coating,
      note: item.note,
      priceTL: item.price_tl,
      priceUSD: item.price_usd,
      dimensions: item.dimensions ? JSON.parse(item.dimensions) : null,
      extraServices: Array.isArray(item.extra_services) ? item.extra_services : [], // ✅ Diziyi garanti altına al
      svg: item.svg || "",
    }));

 

    // 📌 **Frontend'in kullanacağı API cevabı**
    return NextResponse.json({ success: true, items: formattedData });
  } catch (error) {
    console.error("🚨 API Hatası:", error);
    return NextResponse.json({ success: false, message: "Sunucu hatası" }, { status: 500 });
  }
}
