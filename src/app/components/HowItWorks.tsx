"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";

const steps = [
  {
    title: "Dosya Yükle",
    description: "Kesim için gerekli dosyanızı yükleyin.",
    icon: <CloudUploadIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
  },
  {
    title: "Ürün Detaylarını Kontrol Et",
    description: "Dosyanızın detaylarını doğrulayın.",
    icon: <CheckCircleIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
  },
  {
    title: "Malzeme ve Kalınlık Seçimi",
    description: "Projeniz için uygun malzeme ve kalınlık belirleyin.",
    icon: <BuildIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
  },
  {
    title: "Sepete Ekle",
    description: "Ürünlerinizi sepete ekleyin.",
    icon: <ShoppingCartIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
  },
  {
    title: "Sipariş Ver",
    description: "Ödeme işlemini tamamlayarak siparişinizi oluşturun.",
    icon: <PaymentIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
  },
];

const StepWizard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{ width: "100%", textAlign: "center", py: 4 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ mb: 4 }}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box
        sx={{
          p: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Box>{steps[activeStep].icon}</Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {steps[activeStep].title}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555" }}>
            {steps[activeStep].description}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 4,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Geri
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
        >
          İleri
        </Button>
      </Box>
    </Box>
  );
};

export default StepWizard;
