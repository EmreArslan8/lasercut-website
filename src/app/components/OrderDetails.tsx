"use client";

import React, { useState, useMemo } from "react";
import {
  Drawer,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import useScreen from "@/lib/hooks/useScreen";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import MaterialCardList from "./MaterialCarousel";
import theme from "@/theme/theme";

interface DisplayFilesProps {
  files: File[];
  onClose: () => void;
  onAddToCart?: (
    file: File,
    productDetails: { material: string; thickness: string; quantity: number; coating: string; note?: string }
  ) => void;
}

const OrderDetails: React.FC<DisplayFilesProps> = ({ files, onClose }) => {
  const { setCartItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [thickness, setThickness] = useState("");
  const [quantity, setQuantity] = useState("");
  const [coating, setCoating] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({ material: false, thickness: false, quantity: false, coating: false });
  const [selectedFileIndex] = useState(0);
  const router = useRouter();
  const t = useTranslations("OrderDetails");
  const { isMobile, isTablet } = useScreen();
  const locale = useLocale();

  const materials = useMemo(
    () => [
      { value: "1050", label: "Alüminyum 1050" },
      { value: "5754", label: "Alüminyum 5754 / 3.3535 / AlMg3" },
      { value: "GalvanizliSac", label: "Çelik Galvanizli Sac" },
      { value: "SiyahSac", label: "Çelik Siyah Sac" },
      { value: "DC01", label: "Çelik DC01 / 6112 / C (DKP)" },
      { value: "ST37", label: "Çelik ST37-K / S235JR / 1.0038" },
      { value: "Paslanmaz304", label: "Paslanmaz Çelik 304 / 1.4301 / X5CrNi18.10 / V2A" },
      { value: "Paslanmaz316L", label: "Paslanmaz Çelik 316L / 1.4404 / X2CrNiMo17-12-2 / V4A" },
    ],
    []
  );

  const validateForm = () => {
    const newErrors = {
      material: !selectedMaterial.trim(),
      thickness: !thickness.trim(),
      quantity: !quantity.trim(),
      coating: !coating.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleFieldChange = (field: string, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: !value.trim() }));
    if (field === "selectedMaterial") setSelectedMaterial(value);
    if (field === "thickness") setThickness(value);
    if (field === "quantity") setQuantity(value);
    if (field === "coating") setCoating(value);
  };

  const handleAddToCart = () => {
    if (!validateForm()) return;

    const newCartItem = {
      fileName: files[selectedFileIndex]?.name || t("noFileName"),
      file: files[selectedFileIndex],
      material: selectedMaterial,
      thickness,
      quantity: parseInt(quantity, 10),
      coating,
      note,
    };

    setCartItems((prevItems) => [...prevItems, newCartItem]);
    setDrawerOpen(false);

    router.push(`/${locale}/cart`);
  };

  const isSmallScreen = isMobile || isTablet;

  const handleMaterialSelect = (materialValue: string) => {
    setSelectedMaterial(materialValue);
  };

  return (
    <Drawer
      anchor="top"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      PaperProps={{
        sx: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
        },
      }}
    >
      <Box sx={{ flex: 7, padding: 3, position: "relative", overflowY: "auto" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <Image
            src="/static/images/logo.png"
            alt="logo"
            width={120}
            height={60}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
              width: "auto",
            }}
          />
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <InsertDriveFileIcon sx={{ fontSize: 40 }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {files[selectedFileIndex]?.name}
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("fileDetails")}
        </Typography>

        <Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
            {t("materialSelection")}
          </Typography>
          <Select
            value={selectedMaterial}
            onChange={(e) => handleFieldChange("selectedMaterial", e.target.value)}
            fullWidth
            displayEmpty
            error={errors.material}
          >
            {materials.map((material) => (
              <MenuItem key={material.value} value={material.value}>
                {material.label}
              </MenuItem>
            ))}
          </Select>
          {errors.material && (
            <Typography variant="caption" color="error">
              {t("requiredField")}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {/* Kalınlık Section */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                {t("thickness")}
              </Typography>
              <TextField
                type="number"
                value={thickness}
                onChange={(e) => handleFieldChange("thickness", e.target.value)}
                fullWidth
                error={errors.thickness}
                helperText={errors.thickness ? t("requiredField") : ""}
              />
            </Box>

            {/* Adet Section */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                {t("quantity")}
              </Typography>
              <TextField
                type="number"
                value={quantity}
                onChange={(e) => handleFieldChange("quantity", e.target.value)}
                fullWidth
                error={errors.quantity}
                helperText={errors.quantity ? t("requiredField") : ""}
              />
            </Box>

            {/* Boyalı/Boyasız Section */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                {t("coating")}
              </Typography>
              <Select
                value={coating}
                onChange={(e) => handleFieldChange("coating", e.target.value)}
                fullWidth
                displayEmpty
                error={errors.coating}
              >
                <MenuItem value="painted">{t("painted")}</MenuItem>
                <MenuItem value="unpainted">{t("unpainted")}</MenuItem>
              </Select>
              {errors.coating && (
                <Typography variant="caption" color="error">
                  {t("requiredField")}
                </Typography>
              )}
            </Box>
          </Box>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
            {t("noteOptional")}
          </Typography>
          <TextField
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            multiline
            rows={5}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 3 }}
          onClick={handleAddToCart}
        >
          {t("addToCart")}
        </Button>
      </Box>

      {!isSmallScreen && (
        <Box
          sx={{
            flex: 3,
            background: theme.palette.grey[100],
            padding: 3,
            overflowY: "auto",
          }}
        >
          <MaterialCardList
            selectedMaterial={selectedMaterial}
            onMaterialSelect={handleMaterialSelect}
          />
        </Box>
      )}
    </Drawer>
  );
};

export default OrderDetails;
