"use client";

import { useState, useEffect } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useCart } from "@/app/context/CartContext";
import { useTranslations } from "next-intl";

const DXFStepper = ({
  svg,
  width,
  height,
  fileName,
  file,
}: {
  svg: string;
  width: string;
  height: string;
  fileName: string;
  file: File;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const { addToCart } = useCart();

  const t = useTranslations("File");
  // ✅ Merkezi state
  const [stepData, setStepData] = useState({
    fileName,
    file,
    dimensions: { width, height, unit: "mm" as "mm" | "inch" },
    material: "",
    thickness: "",
    quantity: 1,
    note: "",
    coating: "",
    extraServices: [] as string[],
    svg,
  });

  const [isReadyToAdd, setIsReadyToAdd] = useState(false);

  useEffect(() => {
    if (isReadyToAdd) {
      console.log("🚀 Güncellenmiş stepData ile sepete ekleniyor:", stepData);
      addToCart(stepData);
      setIsReadyToAdd(false); // İşlem tamamlandı, tekrar tetiklenmesin
    }
  }, [isReadyToAdd, addToCart, stepData]); // ✅ Eksik bağımlılıklar eklendi

  // ✅ Güncelleme fonksiyonu
  const updateStepData = (data: Partial<typeof stepData>) => {
    setStepData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleConfirmOrder = () => {
    setIsReadyToAdd(true);
  };

  const steps = [
    t("steps.dimensions"),
    t("steps.materialSelection"),
    t("steps.additionalServices"),
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      {/* 📌 Step1 */}
      {activeStep === 0 && (
        <Step1
          svg={svg}
          width={stepData.dimensions.width}
          height={stepData.dimensions.height}
          unit={stepData.dimensions.unit}
          onNext={handleNext}
          onDimensionsChange={(w, h) =>
            updateStepData({
              dimensions: { ...stepData.dimensions, width: w, height: h },
            })
          }
          onUnitChange={(unit) =>
            updateStepData({ dimensions: { ...stepData.dimensions, unit } })
          }
        />
      )}

      {/* 📌 Step2 */}
      {activeStep === 1 && (
        <Step2
          svg={svg}
          onNext={handleNext}
          onBack={handleBack}
          dispatch={updateStepData}
        />
      )}

      {/* 📌 Step3 */}
      {activeStep === 2 && (
        <Step3
          svg={svg}
          onBack={handleBack}
          onConfirm={handleConfirmOrder}
          dispatch={(payload) => updateStepData(payload)}
        />
      )}
    </Box>
  );
};

export default DXFStepper;
