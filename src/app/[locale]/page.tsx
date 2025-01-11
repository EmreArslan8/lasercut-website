"use client";

import React, { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import useFileUpload from "@/lib/hooks/useFileUpload";
import SubmissionSuccess from "../components/SubmissionSuccess";
import AdvantageSection from "../components/Advantage";
import FileUpload from "../components/FileUpload";
import ProcessSteps from "../components/Process";
import DisplayFiles from "../components/MaterialSelectionDrawer";
import { useCart } from "@/app/context/CartContext";
import ExampleSlider from "../components/ExampleWorks";
import WhatsAppButton from "../components/WpButton";

const HomePage = () => {
  const { uploadedFiles, setUploadedFiles } = useFileUpload();
  const { addToCart } = useCart(); 

  const [isSubmissionComplete, setIsSubmissionComplete] = useState(false);

  const handleAddToCart = (file: File, productDetails: { material: string; thickness: string; quantity: number; note?: string }) => {
    const cartItem = {
      fileName: file.name,
      file,
      ...productDetails,
    };
    addToCart(cartItem); 
  };

  const handleClearFiles = () => {
    setUploadedFiles([]); 
  };

  return (
    <Container maxWidth="xl">
      <Stack spacing={4} sx={{ mt: 4 }}>
        {isSubmissionComplete ? (
          <SubmissionSuccess onGoBack={function (): void {
            throw new Error("Function not implemented.");
          }} />
        ) : (
          <>
            {uploadedFiles.length === 0 ? (
              <>
                <FileUpload
                  onFileUpload={(files) => {
                    setUploadedFiles(files);

                  }}
                />
                <ProcessSteps />
                <ExampleSlider />
                <AdvantageSection />
                <WhatsAppButton />

              </>
            ) : (
              <DisplayFiles files={uploadedFiles} onAddToCart={handleAddToCart} onClose={handleClearFiles} />
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
