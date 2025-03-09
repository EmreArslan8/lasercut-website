"use client";

import { useState, useEffect, Dispatch, SetStateAction} from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

import { useTranslations } from "next-intl";
import { calculatePrice } from "@/utils/calculatePrice";
import { useCart } from "@/context/CartContext";

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
  const { addToCart} = useCart();
  const t = useTranslations("File");
  const [priceTL, setPriceTL] = useState<string>("0.00");
  const [priceUSD, setPriceUSD] = useState<string>("0.00");
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  // Add to cart once everything is ready
  useEffect(() => {
    if (isReadyToAdd) {
      console.log("🚀 Güncellenmiş stepData ile sepete ekleniyor:", stepData);
      addToCart({ ...stepData, priceTL, priceUSD });
      setIsReadyToAdd(false); 
    }
  }, [isReadyToAdd, addToCart, stepData, priceTL, priceUSD]);
  

  const updateStepData = async (data: Partial<typeof stepData>) => {
    setStepData((prev) => {
      const newData = { ...prev, ...data };

      // Fiyatları güncelle
      calculatePrice(newData)
        .then(({ priceTL, priceUSD }) => {
          console.log("✅ Hesaplanan Fiyat (TL):", priceTL);
          console.log("✅ Hesaplanan Fiyat (USD):", priceUSD);
          setPriceTL(priceTL);
          setPriceUSD(priceUSD);

          // Fiyatı `stepData` içine ekleyelim
          setStepData((prev) => ({
            ...prev,
            priceTL: priceTL,
            priceUSD: priceUSD,
          }));
        })
        .catch((error) => console.error("❌ Fiyat Hesaplama Hatası:", error));

      return newData;
    });
  };

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleConfirmOrder = () => {
    console.log("✅ Sipariş Onaylandı! Son stepData:", stepData);
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

      {/* 📌 Step1 - Ölçüleri Al */}
      {activeStep === 0 && (
        <Step1
          svg={svg}
          width={stepData.dimensions.width}
          height={stepData.dimensions.height}
          unit={stepData.dimensions.unit}
          onNext={() => {
            console.log("✅ Step 1 Tamamlandı! Ölçüler:", stepData.dimensions);
            handleNext();
          }}
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

      {/* 📌 Step2 - Malzeme, Kalınlık, Not vs. */}
      {activeStep === 1 && (
        <Step2
          svg={svg}
          onNext={() => {
            console.log("✅ Step 2 Tamamlandı! Malzeme Bilgisi:", {
              material: stepData.material,
              thickness: stepData.thickness,
              quantity: stepData.quantity,
              note: stepData.note,
            });
            handleNext();
          }}
          onBack={handleBack}
          dispatch={updateStepData}
        />
      )}

      {/* 📌 Step3 - Ek Hizmetler ve Sipariş Onayı */}
      {activeStep === 2 && (
        <Step3
          svg={svg}
        
          onBack={handleBack}
          onConfirm={handleConfirmOrder}
          dispatch={(payload) => {
            console.log("📌 Step 3 - Ek Hizmetler Güncellendi:", payload);
            updateStepData(payload);
          }}
        />
      )}
    </Box>
  );
};

export default DXFStepper;
