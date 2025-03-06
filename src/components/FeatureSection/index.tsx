"use client";

import { useRef } from "react";
import { Box, Container, Typography, Paper, Stack, Grid2 } from "@mui/material";
import { CheckCircle } from "lucide-react";
import useGsapAnimation from "@/lib/hooks/useGsapAnimation";
import styles from "./styles";
import { useTranslations } from "next-intl";

const FeatureSection = () => {
  const descRef = useRef<HTMLDivElement>(null);
  const servicesDescRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("FeatureSection");

  useGsapAnimation(".title-animation", { animation: "slideUp", delay: 0.2 });
  useGsapAnimation(descRef, { animation: "fadeIn", delay: 0.3 });
  useGsapAnimation(servicesDescRef, { animation: "fadeIn", delay: 0.5 });
  useGsapAnimation(serviceItemsRef, { animation: "slideUp", delay: 0.7 });
  useGsapAnimation(imageRef, { animation: "slideUp", delay: 0.4 });

  return (
    <Box>
      {/* ✅ ÜST BÖLÜM */}
      <Box bgcolor= "white"  sx={styles.topSection}>
      <Container>
      <Box className="title-animation" sx={styles.badge}>
        {t("badge")}
      </Box>
  <Grid2 container spacing={4} alignItems="center" textAlign="start">
    
    {/* Sağdaki grid mobilde üstte olsun */}
    <Grid2
     size= {{ xs: 12, md: 6 }}
      order={{ xs: 1, md: 2 }}
    >
      <Typography
        className="title-animation"
        variant="h3"
        sx={styles.heading}
      >
        {t("heading")}
        <Box component="span" sx={styles.highlight}>
          {t("highlight")}
        </Box>{" "}
        {t("headingContinuation")}
      </Typography>
    </Grid2>

    {/* Soldaki grid mobilde altta olsun */}
    <Grid2
       size= {{ xs: 12, md: 6 }}
      order={{ xs: 2, md: 1 }}
    >
      <Typography ref={descRef} variant="body1" sx={styles.desc}>
        {t("desc")}
      </Typography>
    </Grid2>

  </Grid2>
</Container>

      </Box>

    
    </Box>
  );
};

export default FeatureSection;
