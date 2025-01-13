import { Typography, useTheme, Grid2 } from "@mui/material";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";

const AdvantageSection = () => {
  const theme = useTheme();
  const t = useTranslations("Advantages");
  const { isMobile } = useScreen();

  const advantages = [
    { icon: "🚀", title: t("highSpeed.title"), description: t("highSpeed.description") },
    { icon: "🎯", title: t("highPrecision.title"), description: t("highPrecision.description") },
    { icon: "✨", title: t("advancedSurface.title"), description: t("advancedSurface.description") },
    { icon: "🛠️", title: t("materialSelection.title"), description: t("materialSelection.description") },
    { icon: "✔️", title: t("qualityControl.title"), description: t("qualityControl.description") },
    { icon: "📜", title: t("certificatesReports.title"), description: t("certificatesReports.description") },
  ];

  return (
    <Grid2 container spacing={4} sx={{ px: 2, pb: 7 }}>
      <Grid2  size={{xs:12}}>
        <Typography variant={isMobile ? "h6" : "h5"} textAlign="center" fontWeight= "bold" mb={3}>
          {t("sectionTitle")}
        </Typography>
      </Grid2>

      {advantages.map((adv, index) => (
        <Grid2 size= {{xs: 12, sm: 6, md: 4}}
          key={index}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: isMobile ? theme.typography.h4.fontSize : theme.typography.h3.fontSize,
              color: theme.palette.primary.main,
            }}
          >
            {adv.icon}
          </Typography>
          <div>
            <Typography variant="body1" mb={1}>
              {adv.title}
            </Typography>
            <Typography variant="bodySmall">
              {adv.description}
            </Typography>
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default AdvantageSection;
