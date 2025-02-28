"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import useScreen from "@/lib/hooks/useScreen";
import { useLocale, useTranslations } from "next-intl";
import MaterialCardList from "./MaterialCarousel";
import theme from "@/theme/theme";
import capitalize from "@/utils/capitalize";
import { calculatePrice } from "@/utils/calculatePrice";

interface Material {
  key: string;
  name: string;
}

interface DisplayFilesProps {
  files: File[];
  onClose: () => void;
  onAddToCart?: (
    file: File,
    productDetails: {
      material: string;
      thickness: string;
      quantity: number;
      coating: string;
      note?: string;
      width: string;
      height: string;
    }
  ) => void;
}

const OrderDetails: React.FC<DisplayFilesProps> = ({ files }) => {
  const { setCartItems } = useCart();
  const [, setDrawerOpen] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState("Black Sheet");
  const [thickness, setThickness] = useState("1");
  const [quantity, setQuantity] = useState("1");
  const [coating, setCoating] = useState("unpainted");
  const [note, setNote] = useState("");
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [bending, setBending] = useState<boolean>(false);
  const [errors, setErrors] = useState({
    material: false,
    thickness: false,
    quantity: false,
    coating: false,
    width: false,
    height: false,
  });
  const [selectedFileIndex] = useState(0);
  const router = useRouter();
  const t = useTranslations("OrderDetails");
  const { isMobile, isTablet } = useScreen();
  const locale = useLocale();

  const materials = t.raw("materials") as Material[];

  const validateForm = () => {
    const newErrors = {
      material: !selectedMaterial.trim(),
      thickness: !thickness.trim(),
      quantity: !quantity.trim(),
      coating: !coating.trim(),
      width: !width.trim(),
      height: !height.trim(),
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
    if (field === "width") setWidth(value);
    if (field === "height") setHeight(value);
  };

  const handleAddToCart = async () => {
    if (!validateForm()) return;

    const coatingValue = coating.startsWith("painted")
      ? `painted ${capitalize(coating.replace("painted ", ""))}`
      : coating;

    const extraServices = [];
    if (bending) extraServices.push("bending");
    if (coating.startsWith("painted")) extraServices.push("painting");

    try {
      const priceResult = await calculatePrice({
        dimensions: { width, height },
        material: selectedMaterial,
        thickness,
        quantity: parseInt(quantity, 10),
        extraServices,
      });

      console.log("Fiyat Sonucu (TL):", priceResult.priceTL);
      console.log("Fiyat Sonucu (USD):", priceResult.priceUSD);

      const newCartItem = {
        fileName: files[selectedFileIndex]?.name || t("noFileName"),
        file: files[selectedFileIndex],
        material: selectedMaterial,
        thickness,
        quantity: parseInt(quantity, 10),
        coating: coatingValue,
        note,
        dimensions: {
          width,
          height,
          unit: "mm" as const,
        },
        extraServices,
        priceTL: priceResult.priceTL,
        priceUSD: priceResult.priceUSD,
      };

      setCartItems((prevItems) => [...prevItems, newCartItem]);
      setDrawerOpen(false);

      router.push(`/${locale}/cart`);
    } catch (error) {
      console.error("Fiyat hesaplama hatası:", error);
    }
  };

  const isSmallScreen = isMobile || isTablet;

  const handleMaterialSelect = (materialValue: string) => {
    setSelectedMaterial(materialValue);
  };

  return (
    <Stack direction="row">
      <Box
        sx={{ flex: 7, padding: 3, position: "relative", overflowY: "auto" }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <InsertDriveFileIcon sx={{ fontSize: 40 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              wordBreak: "break-word",
              whiteSpace: "normal",
              overflow: "visible",
            }}
          >
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
            onChange={(e) =>
              handleFieldChange("selectedMaterial", e.target.value)
            }
            fullWidth
            displayEmpty
            error={errors.material}
          >
            {materials.map((material) => (
              <MenuItem key={material.key} value={material.key}>
                {material.name}
              </MenuItem>
            ))}
          </Select>
          {errors.material && (
            <Typography variant="caption" color="error">
              {t("requiredField")}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <TextField
              label={t("width")}
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              fullWidth
              error={errors.width}
            />
            <TextField
              label={t("height")}
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              fullWidth
              error={errors.height}
            />
          </Box>

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
                slotProps={{
                  input: {
                    endAdornment: (
                      <Typography
                        variant="subtitle2"
                        sx={{ ml: 1, color: theme.palette.text.secondary }}
                      >
                        mm
                      </Typography>
                    ),
                  },
                }}
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

            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                {t("coating")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: isSmallScreen ? "column" : "row", // Mobilde dikey, masaüstünde yatay düzen
                  alignItems: isSmallScreen ? "stretch" : "center", // Mobilde tam genişlikte hizalama
                  gap: 1, // Elemanlar arası boşluk
                }}
              >
                {coating.startsWith("painted") ? (
                  <>
                    <TextField
                      onChange={(e) =>
                        handleFieldChange(
                          "coating",
                          `painted ${e.target.value}`
                        )
                      }
                      fullWidth
                      error={errors.coating}
                      helperText={errors.coating ? t("requiredField") : ""}
                    />
                    <Button
                      onClick={() => handleFieldChange("coating", "unpainted")} // Unpainted'e geçiş
                      variant="outlined"
                      fullWidth={isSmallScreen} // Mobilde tam genişlik
                    >
                      {t("unpainted")}
                    </Button>
                  </>
                ) : (
                  <Select
                    value={coating}
                    onChange={(e) =>
                      handleFieldChange("coating", e.target.value)
                    }
                    fullWidth
                    displayEmpty
                    error={errors.coating}
                  >
                    <MenuItem value="unpainted">{t("unpainted")}</MenuItem>
                    <MenuItem value="painted">{t("painted")}</MenuItem>
                  </Select>
                )}
              </Box>
              {errors.coating && (
                <Typography variant="caption" color="error">
                  {t("requiredField")}
                </Typography>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 5 }}>
            <input
              type="checkbox"
              id="bending"
              checked={bending}
              onChange={(e) => setBending(e.target.checked)}
              style={{ transform: "scale(1.5)", width: "12px", height: "12px" }} // Checkbox büyütme
            />
            <Typography variant="h5" sx={{ ml: 2 }}>
              {t("bendingService")}
            </Typography>
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
    </Stack>
  );
};

export default OrderDetails;
