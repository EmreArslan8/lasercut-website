"use client";

import { Box, Container, Typography, Stack, Grid2 } from "@mui/material";
import styles from "./styles";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useFramerAnimations } from "@/lib/hooks/useFramerAnimation"; // ✅ Hook'u ekledik

const FeatureSection = () => {
  const t = useTranslations("FeatureSection");

  // ✅ Hook'u kullanarak animasyonları al
  const slideUpAnimation = useFramerAnimations("slideUp");
  const fadeInAnimation = useFramerAnimations("fadeIn");

  return (
    <Stack sx={styles.topSection}>
      <Container>
        {/* Badge Animasyonu */}
        <Box component={motion.div} {...slideUpAnimation.animation} sx={styles.badge}>
          {t("badge")}
        </Box>

        <Grid2 container spacing={4} alignItems="center" textAlign="start">
          {/* Sağdaki Grid (Mobilde Üstte) */}
          <Grid2 size={{ xs: 12, md: 6 }} order={{ xs: 1, md: 2 }}>
            <Typography component={motion.h3} {...slideUpAnimation.animation} sx={styles.heading}>
              {t("heading")}
              <Box component="span" sx={styles.highlight}>
                {t("highlight")}
              </Box>{" "}
              {t("headingContinuation")}
            </Typography>
          </Grid2>

          {/* Soldaki Grid (Mobilde Altta) */}
          <Grid2 size={{ xs: 12, md: 6 }} order={{ xs: 2, md: 1 }}>
            <Typography component={motion.p} {...fadeInAnimation.animation} variant="body1" sx={styles.desc}>
              {t("desc")}
            </Typography>
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
};

export default FeatureSection;
