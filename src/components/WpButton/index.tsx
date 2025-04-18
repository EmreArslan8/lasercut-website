import React from "react";
import { Link, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";

const WhatsAppButton = () => {
  const { mdUp } = useScreen();
  const t = useTranslations("WpButton");
  const whatsappUrl = "https://wa.me/905055207511"; 

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: "fixed",
        bottom: 40,
        right: {xs: 40, md: 20},
        zIndex: 100, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25D366", 
        color: "#fff",
        borderRadius: 30, 
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        textDecoration: "none",
        p: "0 15px", 
        width: "auto", 
        height: "48px", 
        "&:hover": {
          backgroundColor: "#1da856",
        },
      }}
    >
      <WhatsAppIcon sx={{ fontSize: 41, marginRight: mdUp ? 1 : 0 }} />
      {mdUp && (
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        {t("buttonText")}
        </Typography>
      )}
    </Link>
  );
};

export default WhatsAppButton;
