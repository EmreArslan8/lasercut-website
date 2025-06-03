"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./styles";

const FeatureSection = () => {
  const t = useTranslations("FeatureSection");

  return (
    <Stack sx={styles.topSection}>
      <Container>
        {/* Badge Animasyonu */}
        <Box sx={styles.badge}>{t("badge")}</Box>

        <Grid container spacing={4} alignItems="center" textAlign="start">
          {/* Sağdaki Grid (Mobilde Üstte) */}
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
            <Typography sx={styles.heading}>
              {t("heading")}
              <Box component="span" sx={styles.highlight}>
                {t("highlight")}
              </Box>{" "}
              {t("headingContinuation")}
            </Typography>
          </Grid>

          {/* Soldaki Grid (Mobilde Altta) */}
          <Grid size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Typography variant="body1" sx={styles.desc}>
              {t("desc")}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};

export default FeatureSection;
