"use client";

import { useState } from "react";
import { Box, Button, Stepper, Step, StepLabel, Typography, Paper, CircularProgress, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import DXFUpload from "@/app/components/DXFUpload";

const steps = ["Upload DXF", "Confirm Measurements", "View 2D", "Confirm"];

export default function QuotePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [svgData, setSvgData] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number; aspectRatio: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("mm");

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleUploadSuccess = (svg: string, width: number, height: number, aspectRatio: number) => {
    setSvgData(svg);
    setDimensions({ width, height, aspectRatio });
    handleNext();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 900, mx: "auto", mt: 4 }}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* İçerik Alanı */}
      <Paper sx={{ p: 3, mt: 3, minHeight: 350, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {activeStep === 0 && <DXFUpload onUploadSuccess={handleUploadSuccess} setLoading={setLoading} />}
        
        {loading && <CircularProgress sx={{ mt: 2 }} />}

        {activeStep === 1 && dimensions && (
          <>
            <Typography variant="h6">Confirm Drawing Units</Typography>
            <Typography variant="body1">
              Genişlik: <strong>{dimensions.width.toFixed(3)} mm</strong>
            </Typography>
            <Typography variant="body1">
              Yükseklik: <strong>{dimensions.height.toFixed(3)} mm</strong>
            </Typography>
            <Typography variant="body1">
              En-Boy Oranı: <strong>{dimensions.aspectRatio.toFixed(3)}</strong>
            </Typography>
            
            <RadioGroup row value={unit} onChange={(e) => setUnit(e.target.value)}>
              <FormControlLabel value="inch" control={<Radio />} label="INCH" />
              <FormControlLabel value="mm" control={<Radio />} label="MM" />
            </RadioGroup>
          </>
        )}

        {activeStep === 2 && svgData && (
          <>
            <Typography variant="h6">2D Önizleme</Typography>
            <Box sx={{ border: "1px solid #ddd", p: 2, maxHeight: 400, overflow: "auto" }}>
              <div dangerouslySetInnerHTML={{ __html: svgData }} />
            </Box>
          </>
        )}

        {activeStep === 3 && <Typography variant="h6">Tasarımı Onaylayın</Typography>}
      </Paper>

      {/* Navigasyon Butonları */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button variant="contained" onClick={handleNext} disabled={loading}>
            Next
          </Button>
        ) : (
          <Button variant="contained" color="success">
            Confirm
          </Button>
        )}
      </Box>
    </Box>
  );
}
