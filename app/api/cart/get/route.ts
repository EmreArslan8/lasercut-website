import { supabase } from "@/lib/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // 1) URL'den query parametrelerini çek
    const { searchParams } = new URL(req.url);
    const cartSessId = searchParams.get("cart_sess_id");

    // 2) cart_sess_id yoksa hata döndür
    if (!cartSessId) {
      return NextResponse.json(
        { success: false, message: "cart_sess_id parametresi eksik" },
        { status: 400 }
      );
    }

    // 3) Supabase sorgusunda cart_sess_id'ye göre filtreleme yap
    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("cart_sess_id", cartSessId);

    if (error) {
      console.error("🚨 Supabase Hatası:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    // 4) Veritabanından gelen kolon isimlerini Frontend'e uygun şekilde dönüştür
    const formattedData = data.map((item) => ({
      id: item.id,
      fileName: item.file_name, // ✅ `file_name` → `fileName`
      fileUrl: item.file_url, // ✅ `file_url` → `fileUrl`
      material: item.material,
      thickness: item.thickness,
      quantity: item.quantity,
      coating: item.coating,
      note: item.note,
      priceTL: item.price_tl,
      priceUSD: item.price_usd,
      dimensions: item.dimensions ? JSON.parse(item.dimensions) : null,
      extraServices: Array.isArray(item.extra_services)
        ? item.extra_services
        : [],
      svg: item.svg || "",
    }));

    // 5) JSON formatında başarılı yanıt döndür
    return NextResponse.json({ success: true, items: formattedData });
  } catch (error) {
    console.error("🚨 API Hatası:", error);
    return NextResponse.json(
      { success: false, message: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
