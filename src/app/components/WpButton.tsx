import React from "react";
import { Link, Box, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const WhatsAppButton = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // md ve üzeri ekranlar için kontrol

  const whatsappUrl = "https://wa.me/905555555555"; // WhatsApp numarası

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: "fixed",
        bottom: 16, // Alt kenardan uzaklık
        right: 16, // Sağ kenardan uzaklık
        zIndex: 1000, // İçeriklerin üstünde olması için
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25D366", // WhatsApp yeşili
        color: "#fff",
        borderRadius: 30, // Butonun yuvarlak köşeleri
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Hafif gölge
        textDecoration: "none",
        padding: "0 15px", // md üzeri yazıya göre padding
        width: "auto", // Genişlik yazı varsa otomatik, yoksa sabit
        height: "48px", // Yükseklik sabit
        "&:hover": {
          backgroundColor: "#22c35e", // Hover durumunda daha koyu yeşil
        },
      }}
    >
      <WhatsAppIcon sx={{ fontSize: 41, marginRight: isMdUp ? "8px" : 0 }} />
      {isMdUp && (
        <Typography
          variant="body2"
          sx={{
            color: "#fff", // Yazı rengi
            whiteSpace: "nowrap", // Taşma olmaması için
            fontWeight: 600,
            fontSize: "18px"
          }}
        >
          WhatsApp Destek
        </Typography>
      )}
    </Link>
  );
};

export default WhatsAppButton;
