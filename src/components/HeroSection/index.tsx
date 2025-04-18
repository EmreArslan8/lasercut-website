import Image from "next/image";
import { Box, Button, Typography, Stack, Grid } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./styles";
import useScreen from "@/lib/hooks/useScreen";
import { CloudUpload  } from "lucide-react";
import { useDrawer } from "@/contexts/DrawerContext";

const HeroSection = () => {
  const t = useTranslations("HeroSection");
  const { setDrawerOpen } = useDrawer();
  const { smDown, mdDown } = useScreen();

  return (
    <Stack sx={styles.wrapper}>
      <Box sx={styles.badgeTitleContainer}>
        <Typography variant="h6" sx={styles.badge}>
          {t("badge")}
        </Typography>
        <Typography variant="h2" fontWeight="bold">
          {t("title")}
        </Typography>
      </Box>
      <Box sx={styles.container}>
        <Box sx={styles.imageWrapper}>
          <Image
            src={"/static/images/hero-section-2.jpg"}
            alt="technical parts"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        <Box sx={styles.contentWrapper}>
          {mdDown ? (
            <Grid container sx={styles.gridContainer}>
              <Grid item xs={12} sm={6} sx={styles.textContainer}>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={styles.ctaTitle}>
                    {t("ctaTitle")}
                  </Typography>
                  <Typography variant="body1" sx={styles.slogan}>
                    {t("slogan")}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} sx={styles.buttonContainer}>
                <Button
                  variant="contained"
                  size={smDown ? "medium" : "large"}
                  onClick={() => setDrawerOpen(true)}
                  sx={styles.button}
                >
                  {t("button")}
                  <CloudUpload style={{ marginLeft: "8px" }}/>
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Stack spacing={1}>
              <Typography variant="body" sx={styles.badge}>
                {t("badge")}
              </Typography>
              <Typography variant="h2" sx={styles.title}>
                {t("title")}
              </Typography>
              <Typography variant="body2">{t("description")}</Typography>
              <Typography variant="body1" sx={styles.ctaTitle}>
                {t("ctaTitle")}
              </Typography>
              <Typography variant="body2">{t("slogan")}</Typography>

              <Box sx={styles.buttonWrapper}>
                <Button
                  variant="contained"
                  onClick={() => setDrawerOpen(true)}
                  sx={styles.button}
                >
                  {t("button")}
                  <CloudUpload style={{ marginLeft: "8px" }}/>
                </Button>
              </Box>
            </Stack>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default HeroSection;
