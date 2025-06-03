import { supabase } from "@/lib/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      cart_sess_id,
      fileName,
      material,
      thickness,
      quantity,
      fileUrl,
      priceTL,
      priceUSD,
      dimensions,
      coating = "",
      note = "",
      extraServices = [],
      svg = "",
    } = body;

    if (!fileName || !material || !thickness || !quantity) {
      console.error("❌ Eksik zorunlu alanlar:", {
        cart_sess_id,
        fileName,
        material,
        thickness,
        quantity,
      });
      return NextResponse.json(
        {
          success: false,
          message: "Eksik zorunlu alanlar var",
          receivedData: body,
        },
        { status: 400 }
      );
    }

    // Yeni id üretmeye gerek yok, Supabase auto-increment id üretecek
    const { data, error } = await supabase
      .from("cart_items")
      .insert([
        {
          cart_sess_id,
          file_name: fileName,
          material,
          thickness,
          quantity,
          coating,
          note,
          extra_services: extraServices,
          svg,
          file_url: fileUrl,
          price_tl: priceTL ? parseFloat(priceTL) : null,
          price_usd: priceUSD ? parseFloat(priceUSD) : null,
          dimensions: dimensions ? JSON.stringify(dimensions) : null,
        },
      ])
      .select("id")
      .single();

    console.log("🔍 Supabase DB Yanıtı:", { data, error });

    if (error) {
      console.error("🚨 Supabase Hatası:", error);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Item added to cart", data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("🚨 API Hatası:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
