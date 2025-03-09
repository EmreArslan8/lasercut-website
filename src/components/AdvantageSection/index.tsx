import { Box, Typography, Grid, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Gauge,
  Layers3,
  Boxes,
  CheckCircle2,
  FileCheck2,
  History,
} from "lucide-react";
import styles from "./styles";

// **İkonlar**
const icons = {
  highSpeed: <History size={32} />,
  highPrecision: <Gauge size={32} />,
  advancedSurface: <Layers3 size={32} />,
  materialSelection: <Boxes size={32} />,
  qualityControl: <CheckCircle2 size={32} />,
  certificatesReports: <FileCheck2 size={32} />,
};

// **Daha Yumuşak Animasyon Ayarları**
const animations = {
  fadeInUp: {
    initial: { opacity: 0.2, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }, // Daha doğal bir giriş
  },
  scaleUp: {
    initial: { scale: 0.85, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  slideLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  container: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.3 }, // Kartlar daha yavaş sırayla çıksın
  },
};

const AdvantagesSection = () => {
  const t = useTranslations("Advantages");

  const items = [
    { key: "highSpeed" },
    { key: "highPrecision" },
    { key: "advancedSurface" },
    { key: "materialSelection" },
    { key: "qualityControl" },
    { key: "certificatesReports" },
  ];

  return (
    <Box sx={styles.wrapper}>
      {/* Başlıklar (Daha Yumuşak Geçiş) */}
      <motion.div {...animations.fadeInUp}>
        <Typography variant="h5" sx={styles.title}>
          {t("whyChooseUs")}
        </Typography>
        <Typography variant="h2" sx={styles.subTitle}>
          {t("subtitle")}
        </Typography>
      </motion.div>

      {/* Kartlar İçin Stagger Animasyonu */}
      <motion.div {...animations.container}>
        <Grid container spacing={4} justifyContent="center">
          {items.map(({ key }, index) => (
            <Grid key={key} item xs={12} sm={6} md={4}>
              <motion.div {...animations.slideLeft} transition={{ delay: index * 0.2 }}>
                <Stack direction={{ xs: "row", sm: "column" }} sx={styles.gridContainer}>
                  
                  {/* İkonlar (Daha Yumuşak Geçiş) */}
                  <motion.div {...animations.scaleUp}>
                    <Box sx={styles.iconWrapper}>{icons[key as keyof typeof icons]}</Box>
                  </motion.div>

                  {/* Açıklamalar */}
                  <Stack spacing={1}>
                    <Typography variant="h6" fontWeight="bold">
                      {t(`${key}.title`)}
                    </Typography>
                    <Typography variant="body2">{t(`${key}.description`)}</Typography>
                  </Stack>
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default AdvantagesSection;
