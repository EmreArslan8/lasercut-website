"use client";

import { useState } from "react";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useCart } from "@/app/context/CartContext";


const DXFStepper = ({ svg, width, height, fileName }: { svg: string; width: string; height: string; fileName: string }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { addToCart } = useCart(); // Sepete ekleme fonksiyonu

  // ✅ Merkezi state
  const [stepData, setStepData] = useState({
    fileName,
    dimensions: { width, height, unit: "mm" as "mm" | "inch" },
    material: "",
    thickness: "",
    quantity: 1,
    note: "",
    coating: "",
  });

  // ✅ Güncelleme fonksiyonu
  const updateStepData = (data: Partial<typeof stepData>) => {
    setStepData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  // ✅ Sepete ekleme işlemi
  const handleConfirmOrder = () => {
    addToCart(stepData);
    console.log("Sepete eklenen ürün:", stepData);
  };

  const steps = ["Ölçüler", "Malzeme Seçimi", "Ek Hizmetler"];

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* 📌 Step1 */}
      {activeStep === 0 && (
        <Step1
          svg={svg}
          width={stepData.dimensions.width}
          height={stepData.dimensions.height}
          unit={stepData.dimensions.unit}
          onNext={handleNext}
          onDimensionsChange={(w, h) => updateStepData({ dimensions: { ...stepData.dimensions, width: w, height: h } })}
          onUnitChange={(unit) => updateStepData({ dimensions: { ...stepData.dimensions, unit } })}
        />
      )}

      {/* 📌 Step2 */}
      {activeStep === 1 && <Step2 svg={svg} onNext={handleNext} onBack={handleBack} dispatch={updateStepData} />}
      {/* 📌 Step3 */}
      {activeStep === 2 &&  <Step3
  svg={svg}
  onBack={handleBack}
  onConfirm={handleConfirmOrder}
  dispatch={(payload) => updateStepData(payload)} 
/>
}
      
    </Box>
  );
};

export default DXFStepper;
