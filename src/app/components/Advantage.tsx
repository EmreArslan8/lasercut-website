"use client";

import useScreen from "@/lib/hooks/useScreen";
import { Box, Typography, useTheme, Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";

const AdvantageSection = () => {
  const theme = useTheme();
  const t = useTranslations("Advantages");
  const isMobile = useScreen();

  const advantages = [
    {
      icon: "🚀",
      title: t("highSpeed.title"),
      description: t("highSpeed.description"),
    },
    {
      icon: "🎯",
      title: t("highPrecision.title"),
      description: t("highPrecision.description"),
    },
    {
      icon: "✨",
      title: t("advancedSurface.title"),
      description: t("advancedSurface.description"),
    },
    {
      icon: "🛠️",
      title: t("materialSelection.title"),
      description: t("materialSelection.description"),
    },
    {
      icon: "✔️",
      title: t("qualityControl.title"),
      description: t("qualityControl.description"),
    },
    {
      icon: "📜",
      title: t("certificatesReports.title"),
      description: t("certificatesReports.description"),
    },
  ];

  return (
    <Box sx={{ p: "16px", pb: "56px"}}>
      <Typography
        sx={{
          fontSize: isMobile ? "20px" : "28px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "24px",
          color: theme.palette.text.primary,
        }}
      >
        {t("sectionTitle")}
      </Typography>

      <Grid2 container spacing={4}>
        {advantages.map((adv, index) => (
          <Grid2
          
          size={{ xs: 12, sm: 6 }}
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              textAlign: "left",
              gap: "12px",
            }}
          >
            <Box
              sx={{
                fontSize: isMobile ? "28px" : "32px",
                color: theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {adv.icon}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                  marginBottom: "4px",
                }}
              >
                {adv.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: theme.palette.text.secondary,
                }}
              >
                {adv.description}
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default AdvantageSection;
