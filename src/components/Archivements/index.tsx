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
             
                {/* Açıklamalar */}
               
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Archivements;
