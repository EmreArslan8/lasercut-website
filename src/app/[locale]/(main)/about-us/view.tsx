"use client";

import { Box, Grid2, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./styles";

const AboutUs = () => {
  const t = useTranslations("aboutUsPage");

  return (
    <Box sx={styles.wrapper}>
      {/* Sayfa Başlığı */}
      <Typography variant="h1" sx={styles.heading}>
        {t("title")}
      </Typography>

      {/* Hakkımızda Bölümü */}
      <Grid2 container spacing={6}>
        <Grid2 size={{xs: 12}}>
          <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
            {t("aboutUsTitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: t("aboutUsText1") }}
          />
          <Typography
            variant="body1"
            sx={styles.paragraphSpacing}
            dangerouslySetInnerHTML={{ __html: t("aboutUsText2") }}
          />
        </Grid2>
      </Grid2>

      {/* Yaklaşımımız Bölümü */}
      <Grid2 container spacing={6} sx={styles.section}>
      <Grid2 size={{xs: 12}}>
          <Typography variant="h4" gutterBottom sx={styles.sectionTitle}>
            {t("approachTitle")}
          </Typography>
          <Typography variant="body1" sx={styles.paragraph}>
            {t("approachText1")}
          </Typography>
          <Typography variant="body1" sx={styles.paragraphSpacing}>
            {t("approachText2")}
          </Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AboutUs;
