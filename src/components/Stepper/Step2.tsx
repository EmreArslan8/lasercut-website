"use client";

import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Tik ikonu ekledik
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

interface Material {
  key: string;
  name: string;
  description: string;
  image: string;
}

const Step2 = ({
  svg,
  onNext,
  onBack,
  dispatch,
}: {
  svg: string;
  onNext: () => void;
  onBack: () => void;
  dispatch: (payload: {
    material?: string;
    thickness?: string;
    quantity?: number;
    note?: string;
  }) => void;
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>();
  const [note, setNote] = useState<string>("");
  const [openMaterial, setOpenMaterial] = useState<boolean>(true);
  const [openThickness, setOpenThickness] = useState<boolean>(false);
  const [openQuantity, setOpenQuantity] = useState<boolean>(true);
  const t = useTranslations("Step2");
  const materials = t.raw("materials") as Material[];

  const thicknessMap: Record<string, number[]> = {
    "ST37-K / S235JR": [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15],
    "Stainless Steel 316L": [0.5, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15],
    "Stainless Steel 304": [0.5, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15],
    Aluminum: [1, 1.5, 2, 3, 4, 5, 6, 8, 10],
    "DKP Steel": [1, 1.5, 2, 3, 4, 5, 6, 8, 10],
    "Black Sheet": [1, 1.5, 2, 3, 4, 5, 6, 8, 10],
  };

  // Seçilen malzemeye göre kalınlık listesini getir
  const thicknesses = selectedMaterial
    ? thicknessMap[selectedMaterial] || []
    : [];

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material);
    setSelectedThickness(null); // Yeni malzeme seçildiğinde kalınlığı sıfırla
    setOpenMaterial(false);
    setOpenThickness(true);
    dispatch({ material });
    console.log("Seçilen Materyal Keyi:", material); // Log the selected key
  };

  const handleThicknessSelect = (thickness: string) => {
    setSelectedThickness(thickness);
    setOpenThickness(false);
    dispatch({ thickness });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // Sadece sayı al
    const parsedValue = val === "" ? undefined : parseInt(val, 10);

    setQuantity(parsedValue); // State güncelle
    if (parsedValue !== undefined) {
      dispatch({ quantity: parsedValue }); // Redux veya state yönetimine gönder
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        {t("materialSelection")}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {t("materialSelectionDesc")}
      </Typography>
      <Grid container spacing={4}>
        {/* 📌 Sol: DXF Önizleme */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: "center" }}>
          <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: "8px" }}>
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Grid>

        {/* 📌 Sağ: Seçim Alanları */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* 🟢 Malzeme Seçimi */}
            <Box>
              <Button
                fullWidth
                onClick={() => setOpenMaterial(!openMaterial)}
                endIcon={
                  selectedMaterial ? (
                    <CheckCircleIcon sx={{ color: "#2E7D32" }} />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
                sx={{
                  border: selectedMaterial
                    ? "2px solid #2E7D32"
                    : "1px solid #000", // Yeşil veya siyah çerçeve
                  backgroundColor: selectedMaterial ? "#E8F5E9" : "transparent", // Açık yeşil arka plan
                  color: selectedMaterial ? "#2E7D32" : "#000", // Yeşil yazı rengi
                  fontWeight: selectedMaterial ? "bold" : "normal",
                  "&:hover": {
                    backgroundColor: selectedMaterial ? "#C8E6C9" : "#F5F5F5", // Daha koyu yeşil hover efekti
                  },
                }}
              >
                {selectedMaterial
                  ? `${t("selectedMaterial")} ${t(
                      "materialNames." + selectedMaterial
                    )}`
                  : t("selectMaterial")}
              </Button>

              <Collapse in={openMaterial}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {materials.map((material: Material) => (
                    <Grid size={{ xs: 12 }} key={material.key}>
                      <Paper
                        sx={{
                          border:
                            selectedMaterial === material.key
                              ? "2px solid #1976D2"
                              : "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "16px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleMaterialSelect(material.key)}
                      >
                        <Image
                          src={material.image}
                          alt={material.name}
                          width={80}
                          height={80}
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "16px",
                          }}
                        />
                        <Box sx={{ textAlign: "left" }}>
                          <Typography variant="body1" fontWeight="bold">
                            {material.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {material.description}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* 🟢 Kalınlık Seçimi */}
            <Box>
              <Button
                fullWidth
                onClick={() => setOpenThickness(!openThickness)}
                endIcon={
                  selectedThickness ? (
                    <CheckCircleIcon sx={{ color: "#2E7D32" }} />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
                sx={{
                  border: selectedThickness
                    ? "2px solid #2E7D32"
                    : "1px solid #000", // Seçiliyse yeşil çerçeve
                  backgroundColor: selectedThickness
                    ? "#E8F5E9"
                    : "transparent", // Açık yeşil arka plan
                  color: selectedThickness ? "#2E7D32" : "#000", // Yazı rengi yeşil
                  fontWeight: selectedThickness ? "bold" : "normal", // Seçiliyse kalın yazı
                  "&:hover": {
                    backgroundColor: selectedThickness ? "#C8E6C9" : "#F5F5F5", // Hover efekti
                  },
                }}
              >
                {selectedThickness
                  ? `${t("selectedThickness")}: ${selectedThickness}`
                  : t("selectThickness")}
              </Button>

              <Collapse in={openThickness}>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Select
                    value={selectedThickness || "1.0 mm"}
                    onChange={(e) => handleThicknessSelect(e.target.value)}
                  >
                    {thicknesses.map((thickness) => (
                      <MenuItem key={thickness} value={thickness}>
                        {thickness}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Collapse>
            </Box>

            <Box>
              <Button
                fullWidth
                onClick={() => setOpenQuantity(!openQuantity)}
                endIcon={
                  quantity ? (
                    <CheckCircleIcon sx={{ color: "#2E7D32" }} />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
                sx={{
                  border: quantity ? "2px solid #2E7D32" : "1px solid #000", // Seçiliyse yeşil çerçeve
                  backgroundColor: quantity ? "#E8F5E9" : "transparent", // Açık yeşil arka plan
                  color: quantity ? "#2E7D32" : "#000", // Yazı rengi yeşil
                  fontWeight: quantity ? "bold" : "normal", // Seçiliyse kalın yazı
                  "&:hover": {
                    backgroundColor: quantity ? "#C8E6C9" : "#F5F5F5", // Hover efekti
                  },
                }}
              >
                {quantity
                  ? `${t("selectedQuantity")} ${quantity}`
                  : t("selectQuantity")}
              </Button>

              <Collapse in={openQuantity}>
                <TextField
                  fullWidth
                  label={t("selectQuantity")}
                  value={quantity ?? ""} // undefined olursa boş göster
                  onChange={handleQuantityChange} // Fonksiyonu çağır
                  type="number"
                  sx={{ mt: 2 }}
                  slotProps={{
                    htmlInput: { min: 1 },
                  }}
                />
              </Collapse>
              <TextField
                label={t("additionalNotes")}
                multiline
                rows={4}
                fullWidth
                sx={{ mt: 2 }}
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
                  dispatch({ note: e.target.value });
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          {t("back")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={
            !selectedMaterial || !selectedThickness || !quantity || quantity < 1
          }
        >
          {t("next")}
        </Button>
      </Box>
    </Box>
  );
};

export default Step2;
