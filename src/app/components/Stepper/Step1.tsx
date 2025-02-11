"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTranslations } from "next-intl";

const Step1 = ({
  svg,
  width,
  height,
  unit,
  onNext,
  onDimensionsChange,
  onUnitChange,
}: {
  svg: string;
  width: string;
  height: string;
  unit: "mm" | "inch";
  onNext: () => void;
  onDimensionsChange: (width: string, height: string) => void;
  onUnitChange: (unit: "mm" | "inch") => void;
}) => {
  const t = useTranslations("Step1");
  const [editableWidth, setEditableWidth] = useState(width);
  const [editableHeight, setEditableHeight] = useState(height);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableWidth(e.target.value);
    onDimensionsChange(e.target.value, editableHeight); // ✅ Ana state'e güncelle
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableHeight(e.target.value);
    onDimensionsChange(editableWidth, e.target.value); // ✅ Ana state'e güncelle
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUnit = e.target.value as "mm" | "inch";
    onUnitChange(newUnit); // ✅ Ana state'e güncelle
  };

  const handleNextClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirm = () => {
    setOpenConfirmDialog(false);
    onNext();
  };

  return (
    <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>{t("title")}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>{t("description")}</Typography>

      {/* 🔹 SVG Görseli */}
      <Box
  dangerouslySetInnerHTML={{ __html: svg }}
  sx={{
    width: { xs: "100%", sm: "60%" }, // xs ekranlarda %60, sm ve üstünde %40
    height: "auto",
    mb: 2,
  }}
/>


      {/* 🔹 Ölçü Girişleri */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
        <TextField label={t("width")} variant="outlined" value={editableWidth} onChange={handleWidthChange} sx={{ width: "120px" }} />
        <TextField label={t("height")} variant="outlined" value={editableHeight} onChange={handleHeightChange} sx={{ width: "120px" }} />
      </Box>

      {/* 🔹 Ölçü Birimi */}
      <RadioGroup row value={unit} onChange={handleUnitChange}>
        <FormControlLabel value="inch" control={<Radio />} label={t("inch")} />
        <FormControlLabel value="mm" control={<Radio />} label={t("mm")} />
      </RadioGroup>

      <Button variant="contained" color="primary" onClick={handleNextClick} sx={{ mt: 2 }}>{t("next")}</Button>

      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>{t("confirmTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("confirmMessage", {
              width: editableWidth,
              height: editableHeight,
              unit,
            })}
          </Typography>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              mt: 3,
              border: "1px solid black",
              padding: "10px",
            }}
          >
            <Typography>
              {editableWidth} {unit}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography
                sx={{
                  writingMode: "vertical-lr",
                  textAlign: "right",
                }}
              >
                {editableHeight} {unit}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="error">
            {t("cancel")}
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            {t("confirmButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Step1;
