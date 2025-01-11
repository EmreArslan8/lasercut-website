"use client";

import { Box, Typography, Link, Divider, Container, Grid2 } from "@mui/material";

import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";

const Footer = () => {
  const t = useTranslations("Footer");
const isMobile = useScreen();
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #e0e0e0",
        padding: "32px 0",
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{
                fontWeight: "bold",
                marginBottom: "16px",
                color: "#333",
              }}
            >
              {t("brand")}
            </Typography>
            <Typography variant="body2" sx={{ color: "#757575" }}>
              {t("copyright")}
            </Typography>
          </Grid2>

          {/* Contact and Address sections in a nested grid for mobile */}
          <Grid2 size= {{xs: 12, sm: 8}}>
            <Grid2 container spacing={2}>
              {/* İletişim */}
              <Grid2 size= {{xs: 6, sm: 6}}>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#333",
                  }}
                >
                  <PhoneIcon fontSize="small" />
                  {t("contact")}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: "8px", color: "#757575" }}>
                  {t("phoneNumber")}
                </Typography>
                <Link
                  href="mailto:help@xometry.com.tr"
                  underline="hover"
                  sx={{
                    color: "#0073e6",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("email")}
                </Link>
              </Grid2>

              {/* Adres */}
              <Grid2 size= {{xs: 6, sm: 6}}>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#333",
                  }}
                >
                  <LocationOnIcon fontSize="small" />
                  {t("address")}
                </Typography>
                <Typography variant="body2" sx={{ color: "#757575" }}>
                Uludağ üniversitesi, Ulutek No:Z12 Nilüfer / Bursa
                </Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Divider sx={{ margin: "32px 0", backgroundColor: "#e0e0e0" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Typography variant="body2" sx={{ color: "#757575" }}>
            {t("invoice")}
          </Typography>
          <Typography variant="body2" sx={{ color: "#757575" }}>
            {t("payWithIyzico")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
