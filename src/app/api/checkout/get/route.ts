import { supabase } from "@/lib/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // ✅ Checkout ID'yi URL'den al
    const { searchParams } = new URL(req.url);
    const checkoutId = searchParams.get("checkoutId");

    if (!checkoutId) {
      return NextResponse.json({ success: false, message: "Checkout ID eksik!" }, { status: 400 });
    }

 

    // ✅ Supabase’ten checkout verisini al
    const { data, error } = await supabase
      .from("checkouts")
      .select("*")
      .eq("id", checkoutId)
      .single();

    if (error || !data) {
      console.error("🚨 Checkout bulunamadı:", error);
      return NextResponse.json({ success: false, message: "Checkout bulunamadı!" }, { status: 404 });
    }


    return NextResponse.json({ success: true, items: JSON.parse(data.items) });
  } catch (error: any) {
    console.error("🚨 API Hatası:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
