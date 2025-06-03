import { supabase } from "@/lib/api/supabaseClient";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    if (!id) {
      console.error("🚨 Eksik ürün ID, silme işlemi iptal edildi!");
      return NextResponse.json({ success: false, message: "Eksik ürün ID" }, { status: 400 });
    }

    console.log(`🗑 Ürün siliniyor: ${id}`);

    // **Supabase'den ürünü sil**
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("🚨 Ürün silme hatası:", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    console.log(`✅ Ürün başarıyla silindi: ${id}`);

    return NextResponse.json({ success: true, message: "Ürün sepetten silindi." });
  } catch (error: any) {
    console.error("🚨 API Silme Hatası:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
