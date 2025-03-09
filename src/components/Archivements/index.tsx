import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./styles";
import { useFramerAnimations } from "@/lib/hooks/useFramerAnimation";

const achievements = [
  { value: 3, suffix: "Y+", key: "experience" },
  { value: 25, suffix: "+", key: "ourWorker" },
  { value: 5, suffix: "+", key: "companyPartner" },
  { value: 100, suffix: "+", key: "happyClients" },
];

const Archivements = () => {
  const t = useTranslations("Archivements");

  return (
    <Box sx={styles.wrapper}>
      <Container>
        <Typography variant="h6" sx={styles.title}>{t("title")}</Typography>
        <Typography variant="h2" sx={styles.subTitle}>{t("subTitle")}</Typography>
        <Typography variant="h6" sx={styles.description}>{t("description")}</Typography>
        <Grid container spacing={4} justifyContent="center">
          {achievements.map((item, index) => {
            const { count } = useFramerAnimations("counter", item.value);

            return (
              <Grid key={index} item xs={6} md={3} textAlign="center">
                {/* Sayı Animasyonu */}
                <motion.span
                  {...useFramerAnimations("slideUp").animation}
                  style={{ fontSize: "2rem", fontWeight: "bold", color: "#1976D2" }}
                >
                  {`${count}${item.suffix}`}
                </motion.span>

                {/* Açıklamalar */}
                <motion.div {...useFramerAnimations("slideLeft").animation}>
                  <Typography sx={{ fontSize: "1rem", color: "#333" }}>
                    {t(item.key)}
                  </Typography>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Archivements;
