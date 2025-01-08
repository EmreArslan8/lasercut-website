import { useState } from "react";
import { supabase } from "@/lib/api/supabaseClient";

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

  const uploadFiles = async (formData: { name: string; email: string; phone: string }) => {
    const results: UploadResult[] = [];

    for (const file of uploadedFiles) {
      try {
        const sanitizedFileName = sanitizeFileName(file.name);
        const uniqueFileName = `uploads/${Date.now()}_${sanitizedFileName}`;

        // Check if the file already exists
        const { data: existingFiles, error: checkError } = await supabase
          .from("files")
          .select("id")
          .eq("file_name", uniqueFileName)
          .eq("form_data->>email", formData.email);

        if (checkError) {
          console.error("Kontrol sırasında hata oluştu:", checkError.message);
          results.push({ success: false, message: `Hata: ${checkError.message}` });
          continue;
        }

        if (existingFiles && existingFiles.length > 0) {
          console.warn(`Bu dosya zaten yüklendi: ${sanitizedFileName}`);
          results.push({ success: false, message: `Dosya zaten yüklendi: ${sanitizedFileName}` });
          continue;
        }

        // Upload file to Supabase storage
        const { error: uploadError } = await supabase.storage
          .from("uploaded-files")
          .upload(uniqueFileName, file);

        if (uploadError) {
          console.error("Dosya yükleme hatası:", uploadError.message);
          results.push({ success: false, message: `Yükleme hatası: ${uploadError.message}` });
          continue;
        }

        // Insert file metadata into the database
        const { error: dbError } = await supabase.from("files").insert([
          {
            file_name: uniqueFileName,
            form_data: formData,
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
