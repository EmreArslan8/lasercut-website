"use client";

import React, { useState } from "react";
import { Box, Container, Stack, Typography, Button, CircularProgress } from "@mui/material";
import { supabase } from "@/lib/api/supabaseClient";
import AdvantageSection from "./components/Advantage";
import FileUpload from "./components/FileUpload";
import ModalForm from "./components/Form";
import ProcessSteps from "./components/Process";

const HomePage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false); // Formun görünürlüğü
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Yüklenen dosyalar
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false); // Gönderim durumu
  const [isSubmitting, setIsSubmitting] = useState(false); // Form gönderim durumu
  const [loadingMessage, setLoadingMessage] = useState(""); // Yükleme mesajı

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files); // Yüklenen dosyaları kaydet
  };

  const handleOpenForm = () => {
    setIsFormVisible(true); // Formu göster
  };

  const handleCloseForm = () => {
    setIsFormVisible(false); // Formu gizle
  };

  const handleSubmit = async (formData: { name: string; email: string; phone: string }) => {
    setIsSubmitting(true); // Gönderim başladığında loading durumuna geç
    setLoadingMessage("Değerli müşterimiz, modeliniz ve bilgileriniz sisteme yükleniyor. Lütfen sayfayı kapatmayın.");

    try {
      for (const file of uploadedFiles) {
        const { data: existingFiles, error: checkError } = await supabase
          .from("files")
          .select("id")
          .eq("file_name", file.name)
          .eq("form_data->>email", formData.email);

        if (checkError) {
          console.error("Kontrol sırasında hata oluştu:", checkError.message);
          continue;
        }

        if (existingFiles && existingFiles.length > 0) {
          console.warn(`Bu dosya zaten yüklendi: ${file.name}`);
          continue;
        }

        const uniqueFileName = `uploads/${Date.now()}_${file.name}`;
        const { error } = await supabase.storage
          .from("uploaded-files")
          .upload(uniqueFileName, file);

        if (error) {
          console.error("Dosya yükleme hatası:", error.message);
          continue;
        }

        const { error: dbError } = await supabase.from("files").insert([
          {
            file_name: uniqueFileName,
            form_data: formData,
          },
        ]);

        if (dbError) {
          console.error("Veritabanına ekleme hatası:", dbError.message);
          continue;
        }
      }

      setUploadedFiles([]);
      setIsFormVisible(false);
      setIsSubmissionComplete(true); // Gönderim tamamlandı
      setLoadingMessage("");
    } catch (error) {
      console.error("Hata oluştu:", error);
      setLoadingMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false); // Gönderim tamamlandıktan sonra loading durumundan çık
    }
  };

  const handleGoBack = () => {
    setIsSubmissionComplete(false); // Gönderim durumunu sıfırla
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={4} sx={{ m: 4 }}>
        {isSubmissionComplete ? (
          <Box
            sx={{
              textAlign: "center",
              padding: "32px",
              background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
              Tebrikler! Modeliniz başarıyla yüklendi.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: "1.5rem", color: "#555" }}>
              Teklifiniz için sizinle en kısa sürede iletişime geçilecektir.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGoBack}
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#145ca8",
                },
              }}
            >
              Ana Sayfaya Dön
            </Button>
          </Box>
        ) : (
          <>
            {uploadedFiles.length === 0 && (
              <>
                <FileUpload onFileUpload={handleFileUpload} />
                <ProcessSteps />
                <AdvantageSection />
              </>
            )}
            {uploadedFiles.length > 0 && (
              <FileUpload
                onFileUpload={handleFileUpload}
                files={uploadedFiles}
                onOpenForm={handleOpenForm}
              />
            )}
          </>
        )}
      </Stack>
      {isFormVisible && (
        <ModalForm
          onClose={handleCloseForm}
          onSubmit={handleSubmit}
          disabled={isSubmitting} // Gönderim sırasında form devre dışı
          loading={isSubmitting} // Gönderim sırasında yükleme göstergesi
        />
      )}
      {isSubmitting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            textAlign: "center",
          }}
        >
          <CircularProgress />
          <Typography variant="body1" sx={{ marginTop: "16px", color: "#555" }}>
            {loadingMessage}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
