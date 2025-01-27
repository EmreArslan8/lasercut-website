"use client";

import { Box, Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("aboutUsPage");

  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", px: 3, py: 8 }}>
      {/* Sayfa Başlığı */}
      <Typography
        variant="h2"
        textAlign="center"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 6 }}
      >
        {t("title")}
      </Typography>

      {/* Hakkımızda Bölümü */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: { xs: "center", sm: "left" }, mb: 4 }}
          >
            {t("aboutUsTitle")}
          </Typography>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.8}
            sx={{ textAlign: { xs: "justify", sm: "left" } }}
            dangerouslySetInnerHTML={{ __html: t("aboutUsText1") }}
          />
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.8}
            sx={{ mt: 2, textAlign: { xs: "justify", sm: "left" } }}
            dangerouslySetInnerHTML={{ __html: t("aboutUsText2") }}
          />
        </Grid>
      </Grid>

      {/* Yaklaşımımız Bölümü */}
      <Grid container spacing={6} sx={{ mt: 8 }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ textAlign: { xs: "center", sm: "left" }, mb: 4 }}
          >
            {t("approachTitle")}
          </Typography>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.8}
            sx={{ textAlign: { xs: "justify", sm: "left" } }}
          >
            {t("approachText1")}
          </Typography>
          <Typography
            variant="body1"
            fontSize={18}
            lineHeight={1.8}
            sx={{ mt: 2, textAlign: { xs: "justify", sm: "left" } }}
          >
            {t("approachText2")}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
