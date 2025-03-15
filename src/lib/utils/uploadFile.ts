import { supabase } from "@/lib/api/supabaseClient";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL; // .env.local'den al

export const uploadFileToSupabase = async (file: File, onProgress?: (progress: number) => void) => {
  if (!SUPABASE_URL) {
    console.error("🚨 Supabase URL bulunamadı! .env.local dosyanızı kontrol edin.");
    return null;
  }

  if (onProgress) {
    onProgress(50); // Örnek ilerleme değeri
  }

  const bucketName = "uploaded-files";
  const folderPath = "cart"; // Dosyalar "uploaded-files/cart" içine yüklenecek

  // **Dosya adını kısalt**
  const extension = file.name.split(".").pop(); // Dosya uzantısını al
  const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "").slice(0, 20); // Özel karakterleri kaldır, 20 karaktere indir
  const fileName = `${Date.now()}-${baseName}.${extension}`;

  console.log(`📤 Supabase'e yükleniyor: ${folderPath}/${fileName}`);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`${folderPath}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false, // Aynı isimde dosya varsa üzerine yazma
    });

  console.log("🔍 Supabase Yanıtı:", { data, error });

  if (error) {
    console.error("🚨 Dosya yükleme hatası:", error);
    return null;
  }

  // ✅ Supabase'den yüklenen dosyanın detaylarını alalım
  const { data: fileData } = await supabase
    .storage
    .from(bucketName)
    .getPublicUrl(`${folderPath}/${fileName}`);

  console.log("🌍 Alınan Public URL:", fileData.publicUrl);

  return fileData.publicUrl;
};
