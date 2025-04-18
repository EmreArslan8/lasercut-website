import { useState } from "react";
import { supabase } from "@/lib/api/supabaseClient";
import { useCart } from "@/contexts/CartContext";



interface UploadResult {
  success: boolean;
  message: string;
}

interface UseFileUploadReturn {
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
  uploadFiles: (
    formData: { name: string; email: string; phone: string }
  ) => Promise<UploadResult[]>;
  clearFiles: () => void;
}

const sanitizeFileName = (fileName: string) => {
  // Geçersiz karakterleri "_" ile değiştir
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
};

const useFileUpload = (): UseFileUploadReturn => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { cartItems } = useCart(); // Sepet bilgilerini al

  const uploadFiles = async (formData: { name: string; email: string; phone: string }) => {
    const results: UploadResult[] = [];

    for (const file of uploadedFiles) {
      try {
        const sanitizedFileName = sanitizeFileName(file.name);
        const uniqueFileName = `uploads/${Date.now()}_${sanitizedFileName}`;
        console.log("Yüklenen dosyalar:", uploadedFiles);
        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("uploaded-files")
          .upload(uniqueFileName, file);

        if (uploadError) {
          console.error("Dosya yükleme hatası:", uploadError.message);
          results.push({ success: false, message: `Yükleme hatası: ${uploadError.message}` });
          continue;
        }

        // Insert form and cart data into Supabase
        const { error: dbError } = await supabase.from("files").insert([
          {
            file_name: uniqueFileName,
            form_data: formData, // Form bilgileri
            cart_items: cartItems, // Sepet bilgileri
          },
        ]);

        if (dbError) {
          console.error("Veritabanına ekleme hatası:", dbError.message);
          results.push({ success: false, message: `DB hatası: ${dbError.message}` });
          continue;
        }

        results.push({ success: true, message: `Dosya başarıyla yüklendi: ${sanitizedFileName}` });
      } catch (error) {
        console.error("Hata oluştu:", error);
        results.push({ success: false, message: `Hata: ${error}` });
      }
    }
    console.log("Yüklenen dosyalar:", uploadedFiles);
    console.log("Sepet bilgileri:", cartItems);
    console.log("Form bilgileri:", formData);
    
    return results;
  };

  const clearFiles = () => {
    setUploadedFiles([]);
  };

  return {
    uploadedFiles,
    setUploadedFiles,
    uploadFiles,
    clearFiles,
  };
};

export default useFileUpload;
