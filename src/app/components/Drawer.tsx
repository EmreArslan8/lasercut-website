"use client";

import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../context/CartContext";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MaterialCarousel from "./MaterialCarousel";
import { usePathname, useRouter } from "next/navigation";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";

const materials = [
  { value: "1050", label: "Alüminyum 1050" },
  { value: "5754", label: "Alüminyum 5754 / 3.3535 / AlMg3" },
  { value: "GalvanizliSac", label: "Çelik Galvanizli Sac" },
  { value: "SiyahSac", label: "Çelik Siyah Sac" },
  { value: "DC01", label: "Çelik DC01 / 6112 / C (DKP)" },
  { value: "ST37", label: "Çelik ST37-K / S235JR / 1.0038" },
  { value: "Paslanmaz304", label: "Paslanmaz Çelik 304 / 1.4301 / X5CrNi18.10 / V2A" },
  { value: "Paslanmaz316L", label: "Paslanmaz Çelik 316L / 1.4404 / X2CrNiMo17-12-2 / V4A" },
];

interface DisplayFilesProps {
  files: File[];
  onClose: () => void;
  onAddToCart: (file: File, productDetails: { material: string; thickness: string; quantity: number; note?: string }) => void;
}

const DisplayFiles: React.FC<DisplayFilesProps> = ({ files, onClose, onAddToCart }) => {
  const { setCartItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [thickness, setThickness] = useState("");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Drawer");
  const { isMobile, isTablet } = useScreen();

  const handleAddToCart = () => {
    if (!selectedMaterial || !thickness || !quantity) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const newCartItem = {
      fileName: files[selectedFileIndex]?.name || "Dosya Adı Yok",
      file: files[selectedFileIndex],
      material: selectedMaterial,
      thickness,
      quantity: parseInt(quantity, 10),
      note,
    };
    setCartItems((prevItems) => [...prevItems, newCartItem]);
    setDrawerOpen(false);

    const locale = pathname.split("/")[1];
    router.push(`/${locale}/cart`);
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
      {/* Sol Kısım */}
      <Box
        sx={{
          flex: 6,
          padding: 3,
          position: "relative",
          overflowY: "auto",
        }}
      >
        {/* Logo ve Kapatma Tuşu */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <img src="/static/images/logo.png" alt="Logo" width={100} height={70} />
          <IconButton onClick={onClose} sx={{ color: "#333" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Dosya İsmi ve İkon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <InsertDriveFileIcon sx={{ fontSize: 40, color: "#007BFF" }} />
          <Typography variant="h5" sx={{ fontWeight: "600", color: "#333" }}>
            {files[selectedFileIndex]?.name}
          </Typography>
        </Box>

        {/* Form Alanları */}
        <Typography variant="body1" sx={{ mb: 2 }}>
         {t("fileDetails")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
             {t("materialSelection")}
            </Typography>
            <Select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              fullWidth
              displayEmpty
            >
              <MenuItem value="">Materyal Seç</MenuItem>
              {materials.map((material) => (
                <MenuItem key={material.value} value={material.value}>
                  {material.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              {t("thickness")}
            </Typography>
            <TextField
              type="number"
              label="Kalınlık (mm)"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
             {t("quantity")}
            </Typography>
            <TextField
              type="number"
              label="Adet"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
             {t("noteOptional")}
            </Typography>
            <TextField
              label="Not (Opsiyonel)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleAddToCart}>
    {t("addToCart")}
        </Button>
      </Box>

      {/* Sağ Kısım */}
      {!(isMobile || isTablet) && ( 
        <Box
          sx={{
            flex: 4,
            backgroundColor: "#ffffff",
            padding: 3,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
            Materyal Seçimi
          </Typography>
          <MaterialCarousel />
        </Box>
      )}
    </Drawer>
  );
};

export default DisplayFiles;
