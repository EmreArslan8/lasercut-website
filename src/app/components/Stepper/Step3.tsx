"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Grid2,
  Paper,
  Button,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Stack,
  Modal,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Icon from "../Icon";

const Step3 = ({
  svg,
  onBack,
  dispatch,
}: {
  svg: string;
  onBack: () => void;
  onConfirm: () => void;
  dispatch: (payload: { extraServices?: string[]; coating?: string }) => void;
}) => {
  const t = useTranslations("Step3");

  const extraServices = t.raw("extraServices") as {
    name: string;
    description: string;
  }[];
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [customColor, setCustomColor] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleServiceToggle = (serviceName: string) => {
    const updatedServices = selectedServices.includes(serviceName)
      ? selectedServices.filter((s) => s !== serviceName)
      : [...selectedServices, serviceName];

    setSelectedServices(updatedServices);
    dispatch({ extraServices: updatedServices });

    if (serviceName === extraServices[2]?.name) {
      // Boya (Painting) için özel işlem
      setSelectedColor("");
      setCustomColor("");
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setCustomColor("");

    if (color === t("customColor")) {
      dispatch({ coating: "" });
    } else {
      dispatch({ coating: color });
    }
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
    dispatch({ coating: e.target.value });
  };

  const handleConfirm = () => {
    setModalOpen(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* 🟢 Başlık & Açıklama */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
        {t("title")}
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
        {t("description")}
      </Typography>

      <Grid2 container spacing={4}>
        {/* 📌 DXF Önizleme */}
        <Grid2 size={{ xs: 6 }} sx={{ textAlign: "center" }}>
          <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: "8px" }}>
            <div
              dangerouslySetInnerHTML={{ __html: svg }}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Grid2>

        {/* 📌 Ek Hizmet Seçimi */}
        <Grid2 size={{ xs: 6 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {extraServices.map((service: { name: string }) => (
              <Paper
                key={service.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  borderRadius: "12px",
                  border: selectedServices.includes(service.name)
                    ? "2px solid #1976D2"
                    : "1px solid #ddd",
                  backgroundColor: selectedServices.includes(service.name)
                    ? "#E3F2FD"
                    : "transparent",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onClick={() => handleServiceToggle(service.name)}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color={
                    selectedServices.includes(service.name) ? "#1976D2" : "#000"
                  }
                >
                  {service.name}
                </Typography>
                <Checkbox
                  checked={selectedServices.includes(service.name)}
                  color="primary"
                />
              </Paper>
            ))}

            {/* 🟢 Boya Seçilirse Renk Girişi */}

            {selectedServices.includes(extraServices[2]?.name) && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {t("colorSelection")}
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={selectedColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">{t("selectColor")}</MenuItem>
                    <MenuItem value="Black">{t("black")}</MenuItem>
                    <MenuItem value="Blue">{t("blue")}</MenuItem>
                    <MenuItem value="Red">{t("red")}</MenuItem>
                    <MenuItem value={t("customColor")}>
                      {t("customColor")}
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* Kullanıcı özel renk seçerse giriş alanını aç */}
                {selectedColor === t("customColor") && (
                  <TextField
                    label={t("customColor")}
                    fullWidth
                    sx={{ mt: 2 }}
                    value={customColor}
                    onChange={handleCustomColorChange}
                  />
                )}
              </Box>
            )}
          </Box>
        </Grid2>
      </Grid2>
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="outlined"
          onClick={onBack}
          startIcon={<Icon name="arrow_back" />}
        >
          {t("buttons.back")}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          startIcon={<Icon name="check_circle" />}
        >
          {t("buttons.confirm")}
        </Button>

        <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              width: { xs: 300, sm: 500, md: 600 }, // Mobil için daha küçük boyut
              bgcolor: "white",
              p: { xs: 2, sm: 4 }, // Mobil için daha az padding
              mx: "auto",
              my: "20vh",
              boxShadow: 24,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            <Icon name="check_circle" sx={{ fontSize: 50, color: "green" }} />

            <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
              {t("modal.title")}
            </Typography>
            <Typography sx={{ mt: 2 }}>{t("modal.description")}</Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }} // Mobilde dikey, büyük ekranlarda yatay
              spacing={2}
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <Link href="/" passHref>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<Icon name="home" />}
                >
                  {t("modal.goHome")}
                </Button>
              </Link>
              <Link href="/cart" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Icon name="shopping_cart" />}
                >
                  {t("modal.goCart")}
                </Button>
              </Link>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Step3;
