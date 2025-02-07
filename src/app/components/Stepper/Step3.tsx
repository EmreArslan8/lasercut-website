"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const extraServices = [
  { name: "Kaynak", description: "Metal parçaları birleştirme işlemi" },
  { name: "Büküm", description: "Sac veya metal parçaların bükülmesi" },
  { name: "Boya", description: "Renk kaplama işlemi (Özel Renk Girişi Yapılabilir)" },
];

const Step3 = ({
  svg,
  onBack,
  onConfirm,
  dispatch, // ✅ Ana state'e güncelleme için dispatch fonksiyonu
}: {
  svg: string;
  onBack: () => void;
  onConfirm: () => void;
  dispatch: (payload: { extraServices?: string[]; coating?: string }) => void;
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [customColor, setCustomColor] = useState<string>("");

  const handleServiceToggle = (serviceName: string) => {
    let updatedServices = selectedServices.includes(serviceName)
      ? selectedServices.filter((s) => s !== serviceName)
      : [...selectedServices, serviceName];

    setSelectedServices(updatedServices);
    dispatch({ extraServices: updatedServices });

    // Eğer "Boya" seçildiyse renk alanını aç/kapat
    if (serviceName === "Boya") {
      setSelectedColor("");
      setCustomColor("");
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setCustomColor("");

    if (color === "Özel") {
      dispatch({ coating: "" }); // Özel renk için boş geç
    } else {
      dispatch({ coating: color }); // Seçili rengi kaydet
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
    dispatch({ coating: e.target.value }); // Özel rengi kaydet
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* 🟢 Başlık & Açıklama */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        Ek Hizmetler
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        Aşağıdan ek hizmetleri seçebilirsiniz. Boya için özel renk girişi yapabilirsiniz.
      </Typography>

      <Grid container spacing={4}>
        {/* 📌 Sağ: DXF Önizleme */}
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: "8px" }}>
            <div dangerouslySetInnerHTML={{ __html: svg }} style={{ width: "100%", height: "auto" }} />
          </Box>
        </Grid>

        {/* 📌 Sol: Hizmet Seçimi */}
        <Grid item xs={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {extraServices.map((service) => (
              <Paper
                key={service.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "12px",
                  border: selectedServices.includes(service.name) ? "2px solid #1976D2" : "1px solid #ddd",
                  backgroundColor: selectedServices.includes(service.name) ? "#E3F2FD" : "transparent",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onClick={() => handleServiceToggle(service.name)}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color={selectedServices.includes(service.name) ? "#1976D2" : "#000"}
                >
                  {service.name}
                </Typography>
                <Checkbox checked={selectedServices.includes(service.name)} color="primary" />
              </Paper>
            ))}

            {/* 🟢 Boya Seçilirse Renk Girişi */}
            {selectedServices.includes("Boya") && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Boya Rengi Seçin veya Girin:
                </Typography>
                <FormControl fullWidth>
                  <Select value={selectedColor} onChange={(e) => handleColorChange(e.target.value)} displayEmpty>
                    <MenuItem value="">Boya Rengi Seçin</MenuItem>
                    <MenuItem value="Kırmızı">Kırmızı</MenuItem>
                    <MenuItem value="Mavi">Mavi</MenuItem>
                    <MenuItem value="Siyah">Siyah</MenuItem>
                    <MenuItem value="Özel">Özel Renk Gir</MenuItem>
                  </Select>
                </FormControl>

                {/* Kullanıcı özel renk seçerse elle giriş aktif olur */}
                {selectedColor === "Özel" && (
                  <TextField
                    label="Özel Renk"
                    fullWidth
                    sx={{ mt: 2 }}
                    value={customColor}
                    onChange={handleCustomColorChange}
                  />
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* 🔹 Geri & Siparişi Tamamla Butonları */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={onBack}>
          Geri
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Siparişi Tamamla
        </Button>
      </Box>
    </Box>
  );
};

export default Step3;
