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
  onNext,
  onDimensionsChange,
}: {
  svg: string;
  width: string;
  height: string;
  onNext: () => void;
  onDimensionsChange: (width: string, height: string) => void;
}) => {
  const t = useTranslations("Step1");
  const [editableWidth, setEditableWidth] = useState(width);
  const [editableHeight, setEditableHeight] = useState(height);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableWidth(e.target.value);
    onDimensionsChange(e.target.value, editableHeight);
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableHeight(e.target.value);
    onDimensionsChange(editableWidth, e.target.value);
  };

  const handleNextClick = () => {
    setOpenConfirmDialog(true);
  };

  const handleConfirm = () => {
    setOpenConfirmDialog(false);
    onNext();
  };

  return (
    <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>{t("title")}</Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>{t("description")}</Typography>

      {/* 🔹 SVG Görseli */}
      <Box
        dangerouslySetInnerHTML={{ __html: svg }}
        sx={{
          width: { xs: "100%", sm: "60%" },
          height: "auto",
          mb: 2,
        }}
      />

      {/* 🔹 Ölçü Girişleri + MM Birimi Aynı Satırda */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField label={t("width")} variant="outlined" value={editableWidth} onChange={handleWidthChange} sx={{ width: "120px" }} />
        <TextField label={t("height")} variant="outlined" value={editableHeight} onChange={handleHeightChange} sx={{ width: "120px" }} />

        {/* MM Radio Butonu (Sadece Görsel) */}
        <RadioGroup row value="mm">
          <FormControlLabel value="mm" control={<Radio  />} label={t("mm")} />
        </RadioGroup>
      </Box>

      <Button variant="contained" color="primary" onClick={handleNextClick} sx={{ mt: 2 }}>{t("next")}</Button>

      {/* ✅ Onay Diyaloğu */}
      <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
        <DialogTitle>{t("confirmTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("confirmMessage", {
              width: editableWidth,
              height: editableHeight,
              unit: "mm", // ✅ Birim sabitlendi
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
              {editableWidth} mm
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
                {editableHeight} mm
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
