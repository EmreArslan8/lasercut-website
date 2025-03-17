"use client";

import { Box, Container, Typography, Stack, Grid2 } from "@mui/material";
import styles from "./styles";
import { useTranslations } from "next-intl";

const FeatureSection = () => {
  const t = useTranslations("FeatureSection");

  return (
    <Stack sx={styles.topSection}>
      <Container>
        {/* Badge Animasyonu */}
        <Box sx={styles.badge}>{t("badge")}</Box>

        <Grid2 container spacing={4} alignItems="center" textAlign="start">
          {/* Sağdaki Grid (Mobilde Üstte) */}
          <Grid2 size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
            <Typography sx={styles.heading}>
              {t("heading")}
              <Box component="span" sx={styles.highlight}>
                {t("highlight")}
              </Box>{" "}
              {t("headingContinuation")}
            </Typography>
          </Grid2>

          {/* Soldaki Grid (Mobilde Altta) */}
          <Grid2 size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Typography variant="body1" sx={styles.desc}>
              {t("desc")}
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
};

export default FeatureSection;
