"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Collapse,
  TextField,
  Paper,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const subMaterials = [
  { name: "Alüminyum", image: "/static/images/aluminum.jpg", description: "Hafif ve dayanıklı" },
  { name: "DKP Çelik", image: "/static/images/steel_dkp.jpg", description: "Şekillendirmeye uygun" },
  { name: "ST37-K / S235JR", image: "/static/images/steel_st37.jpeg", description: "Yapı çeliği" },
  { name: "Paslanmaz Çelik 304", image: "/static/images/stainless_304.jpg", description: "Gıda ve medikal kullanım" },
  { name: "Paslanmaz Çelik 316L", image: "/static/images/stainless_316.jpg", description: "Kimyasal ve tuzlu suya dayanıklı" },
];

const thicknesses = ["1.0 mm", "1.6 mm", "2.0 mm", "2.3 mm", "2.5 mm", "3.2 mm", "4.7 mm", "6.3 mm", "9.5 mm"];

const Step2 = ({ 
  svg,
  onNext,
  onBack, 
  dispatch 
}: {
  svg: string;
  onNext: () => void;
  onBack: () => void;
  dispatch: (payload: { material?: string; thickness?: string; quantity?: number; note?: string }) => void;
}) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedThickness, setSelectedThickness] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const [openMaterial, setOpenMaterial] = useState<boolean>(true);
  const [openThickness, setOpenThickness] = useState<boolean>(false);
  const [openQuantity, setOpenQuantity] = useState<boolean>(true);

  const handleMaterialSelect = (material: string) => {
    setSelectedMaterial(material);
    setOpenMaterial(false);
    setOpenThickness(true);
    dispatch({ material });
  };

  const handleThicknessSelect = (thickness: string) => {
    setSelectedThickness(thickness);
    setOpenThickness(false);
    dispatch({ thickness });
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* 📌 Başlık & Alt Başlık */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        Malzeme ve Kalınlık Seçimi
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Lütfen malzeme, kalınlık, adet ve ek not girerek devam edin.
      </Typography>

      <Grid container spacing={4}>
        {/* 📌 Sol: DXF Önizleme */}
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: "8px" }}>
            <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: "100%", height: "auto" }} />
          </Box>
        </Grid>

        {/* 📌 Sağ: Seçim Alanları */}
        <Grid item xs={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* 🟢 Malzeme Seçimi */}
            <Box>
              <Button
                fullWidth
                onClick={() => setOpenMaterial(!openMaterial)}
                endIcon={<ExpandMoreIcon />}
                sx={{ border: "1px solid #000", color: "#000" }}
              >
                {selectedMaterial ? `Malzeme Seçildi: ${selectedMaterial}` : "Malzeme Seçimi"}
              </Button>
              <Collapse in={openMaterial}>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {subMaterials.map((material) => (
                    <Grid item xs={12} key={material.name}>
                      <Paper
                        sx={{
                          border: selectedMaterial === material.name ? "2px solid #1976D2" : "1px solid #ddd",
                          borderRadius: "8px",
                          padding: "16px",
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => handleMaterialSelect(material.name)}
                      >
                        <img
                          src={material.image}
                          alt={material.name}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "16px",
                          }}
                        />
                        <Box>
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
            {selectedMaterial && (
              <Box>
                <Button
                  fullWidth
                  onClick={() => setOpenThickness(!openThickness)}
                  endIcon={<ExpandMoreIcon />}
                  sx={{ border: "1px solid #000", color: "#000" }}
                >
                  {selectedThickness ? `Kalınlık Seçildi: ${selectedThickness}` : "Kalınlık Seçimi"}
                </Button>
                <Collapse in={openThickness}>
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <Select
                      value={selectedThickness || ""}
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
            )}

            {/* 🟢 Adet Seçimi ve Not Alanı */}
            {selectedThickness && (
              <Box>
                <Button
                  fullWidth
                  onClick={() => setOpenQuantity(!openQuantity)}
                  endIcon={<ExpandMoreIcon />}
                  sx={{ border: "1px solid #000", color: "#000" }}
                >
                  {quantity ? `Seçilen Adet: ${quantity}` : "Adet Seçimi"}
                </Button>
                <Collapse in={openQuantity}>
                  <TextField
                    fullWidth
                    label="Adet Seçimi"
                    value={quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        setQuantity(val);
                        dispatch({ quantity: val });
                      }
                    }}
                    inputProps={{ min: 1, max: 10, type: "number" }}
                    sx={{ mt: 2 }}
                  />
                </Collapse>

               <Stack sx= {{m:2}}>
                <Typography variant="bodySmall" >
                  Ürününüz için eklemek istediğiniz detaylar varsa buraya yazabilirsiniz.
                </Typography>
                </Stack>
                <TextField
                  label="Ek Notlar (Opsiyonel)"
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
            )}
          </Box>
        </Grid>
      </Grid>

      {/* 🔹 Navigasyon Butonları (Sağ Alt Köşe) */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          Geri
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          disabled={!selectedMaterial || !selectedThickness}
        >
          İleri
        </Button>
      </Box>
    </Box>
  );
};

export default Step2;
