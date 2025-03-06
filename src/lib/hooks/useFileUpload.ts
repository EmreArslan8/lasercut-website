import { useState } from "react";
import { supabase } from "../api/supabaseClient";
import { useCart } from "@/context/CartContext";

interface UploadResult {
  success: boolean;
  message: string;
}

interface UseFileUploadReturn {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  uploadFiles: (
    files: File[],
    formData: { name: string; email: string; phone: string }
  ) => Promise<UploadResult[]>;
  clearFiles: () => void;
  isDxf: boolean; // DXF kontrolü
}

const sanitizeFileName = (fileName: string) => {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
};

const useFileUpload = (): UseFileUploadReturn => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDxf, setIsDxf] = useState(false);
  const { cartItems } = useCart();
  

  const uploadFiles = async (
    files: File[],
    formData: { name: string; email: string; phone: string }
  ) => {
    const results: UploadResult[] = [];

    for (const file of files) {
      try {
        const sanitizedFileName = sanitizeFileName(file.name);
        const uniqueFileName = `uploads/${Date.now()}_${sanitizedFileName}`;

        // Format Kontrolü
        const allowedExtensions = ["pdf", "png", "jpg", "jpeg", "dxf"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();

        console.log(`📂 Dosya yüklendi: ${file.name} (Uzantı: ${fileExtension})`);

        if (!allowedExtensions.includes(fileExtension!)) {
          console.warn(`❌ Geçersiz dosya türü: ${file.name}`);
          results.push({ success: false, message: `Geçersiz dosya türü: ${file.name}` });
          continue;
        }

        // Supabase'e yükleme
        const { error: uploadError } = await supabase.storage
          .from("uploaded-files")
          .upload(uniqueFileName, file);

        if (uploadError) {
          console.error(`⚠️ Yükleme hatası: ${uploadError.message}`);
          results.push({ success: false, message: `Yükleme hatası: ${uploadError.message}` });
          continue;
        }

        // Dosya URL'sini alma
        const { data } = await supabase.storage
          .from("uploaded-files")
          .getPublicUrl(uniqueFileName);

        // Veritabanına kayıt
        const { error: dbError } = await supabase.from("files").insert([
          {
            file_name: uniqueFileName,
            file_url: data?.publicUrl, // Dosya URL'si
            form_data: formData,
            cart_items: cartItems,
          },
        ]);

        if (dbError) {
          console.error(`⚠️ DB hatası: ${dbError.message}`);
          results.push({ success: false, message: `DB hatası: ${dbError.message}` });
          continue;
        }

        results.push({ success: true, message: `✅ Dosya başarıyla yüklendi: ${sanitizedFileName}` });
      } catch (error) {
        console.error(`🚨 Beklenmeyen hata: ${error}`);
        results.push({ success: false, message: `Hata: ${error}` });
      }
    }

    clearFiles();
    return results;
  };

  const handleFileUpload = (files: File[]) => {
    console.log("📥 Dosya yükleme işlemi başladı:", files.map((file) => file.name));
  
    // 0 bayt olan dosyaları filtrele
    const validFiles = files.filter((file) => {
      if (file.size === 0) {
        console.warn(`❌ Geçersiz dosya: ${file.name} (Dosya boyutu 0 bayt)`);
        return false;
      }
      return true;
    });
  
    if (validFiles.length === 0) {
      console.error("🚨 Hiçbir dosya yüklenmedi, tüm dosyalar 0 bayt.");
      return;
    }
  
    setUploadedFiles(validFiles);
  
    // DXF kontrolü
    const hasDxf = validFiles.some((file) => file.name.toLowerCase().endsWith(".dxf"));
    setIsDxf(hasDxf);
  
    console.log(`🔍 DXF kontrolü: ${hasDxf ? "Evet, DXF dosyası var." : "Hayır, DXF dosyası yok."}`);
  };
  

  const clearFiles = () => {
    console.log("🗑️ Yüklenen dosyalar temizlendi.");
    setUploadedFiles([]);
    setIsDxf(false);
  };

  return {
    uploadedFiles,
    setUploadedFiles: handleFileUpload, // DXF kontrolünü buraya ekledik
    uploadFiles,
    clearFiles,
    isDxf,
  };
};

export default useFileUpload;
