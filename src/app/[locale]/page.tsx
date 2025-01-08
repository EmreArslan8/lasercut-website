"use client";

import React, { useState } from "react";
import { Container, Stack } from "@mui/material";
import useFileUpload from "@/lib/hooks/useFileUpload";
import SubmissionSuccess from "../components/SubmissionSuccess";
import AdvantageSection from "../components/Advantage";
import FileUpload from "../components/FileUpload";
import ModalForm from "../components/Form";
import ProcessSteps from "../components/Process";

const HomePage = () => {
  const {
    uploadedFiles,
    setUploadedFiles,
    uploadFiles,
    clearFiles,
  } = useFileUpload();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenForm = () => setIsFormVisible(true);
  const handleCloseForm = () => setIsFormVisible(false);

  const handleSubmit = async (formData: { name: string; email: string; phone: string }) => {
    setIsSubmitting(true); // Gönderim işlemi başlıyor
    const results = await uploadFiles(formData);

    // Eğer tüm dosyalar başarıyla yüklendiyse
    const allSuccess = results.every((result) => result.success);
    if (allSuccess) {
      setIsSubmissionComplete(true); // Başarılı ekranını göster
      clearFiles(); // Yüklenen dosyaları temizle
    } else {
      console.error("Bazı dosyalar yüklenirken hata oluştu:", results);
      alert("Bazı dosyalar yüklenirken hata oluştu. Lütfen tekrar deneyin.");
    }

    setIsSubmitting(false); // Gönderim işlemi tamamlandı
    setIsFormVisible(false); // Formu kapat
  };

  const handleGoBack = () => setIsSubmissionComplete(false);

  return (
    <Container maxWidth="xl">
      <Stack spacing={4} sx={{ mt: 4 }}>
        {isSubmissionComplete ? (
          <SubmissionSuccess onGoBack={handleGoBack} />
        ) : (
          <>
            {uploadedFiles.length === 0 ? (
              <>
                <FileUpload onFileUpload={setUploadedFiles} />
                <ProcessSteps />
                <AdvantageSection />
              </>
            ) : (
              <FileUpload
                onFileUpload={setUploadedFiles}
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
          disabled={isSubmitting}
          loading={isSubmitting}
        />
      )}
    </Container>
  );
};

export default HomePage;
