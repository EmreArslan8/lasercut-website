import { Box, Button, Grid, Grid2, Stack, Typography } from "@mui/material";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./styles";
import Link from "../common/Link";
import useScreen from "@/lib/hooks/useScreen";

const MaterialSection = () => {
  const t = useTranslations("MaterialSection");
  const isMobile = useScreen();
  // ✅ Diziyi döngüyle alarak bir array oluşturuyoruz
  const materials = Object.keys(t.raw("materials")).map((key) =>
    t(`materials.${key}`)
  );

  return (
    <Box sx={styles.wrapper}>
      <Grid2 container spacing={isMobile ? 0 : 4}  alignItems="center">
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Box
            component="video"
            src="https://cdn.shopify.com/videos/c/o/v/658e2511bd5447d993fe3505c670fa24.mp4"
            autoPlay
            loop
            muted
            playsInline
            sx={styles.video}
          />
        </Grid2>

        {/* Text Content */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Stack spacing={3} sx={styles.textContent}>
            <Typography variant="h3" sx={styles.title}>
              {" "}
              {t("title")}{" "}
            </Typography>
            <Typography variant="h2">{t("subtitle")} </Typography>
            <Typography sx={styles.description}>{t("description")}</Typography>
            {materials.length > 0 ? (
              <Grid container spacing={2}>
                {materials.map((item, index) => (
                  <Grid item xs={6} key={index}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CheckCircle size={30} color="#006FBF" />
                      <Typography variant="body2">{item}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="error">Materials data is missing!</Typography>
            )}
            <Link href="/contact">
            <Button variant="contained" sx={styles.button}>
              {t("button")}
            </Button>
            </Link>
          </Stack>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default MaterialSection;
