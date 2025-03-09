"use client";

import {
  Box,
  Grid,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Container,
} from "@mui/material";
import Image from "next/image";
import styles from "./styles";
import { useTranslations } from "next-intl";
import { defaultMaxWidth } from "@/theme/theme";

const services = [
  {
    key: "laserCutting",
    image:
      "https://images.unsplash.com/photo-1625464733746-f884014c73bc?q=80&w=2804&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "cncMachining",
    image:
      "https://images.unsplash.com/photo-1615286922420-c6b348ffbd62?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    key: "customFabrication",
    image:
      "https://images.unsplash.com/photo-1602223114290-ba6de2938acc?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ServiceCards = () => {
  const t = useTranslations("Services");
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack >
      <Container maxWidth="xl"  sx={styles.container}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          {t("title")}
        </Typography>
        <Typography sx={styles.sectionHeading}>{t("heading")}</Typography>
        <Typography variant="body1" sx={styles.sectionDescription}>
          {t("description")}
        </Typography>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={mdDown ? 12 : 4} key={index}>
              <Box sx={styles.card}>
                <Image
                  src={service.image}
                  alt={t(`${service.key}.title`)}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Box sx={styles.textOverlay}>
                  <Typography variant="h6" fontWeight="bold">
                    {t(`${service.key}.title`)}
                  </Typography>
                  <Typography variant="body2">
                    {t(`${service.key}.description`)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
};

export default ServiceCards;
