"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./styles";
import useScreen from "@/lib/hooks/useScreen";
import Image from "next/image";
import { useDrawer } from "@/context/DrawerContext";
import { Link } from "@/i18n";


const Arcade = () => {
  const [selectedFrame, setSelectedFrame] = useState<
    "integration" | "management"
  >("integration");
  const t = useTranslations("Arcade");
  const { mdUp } = useScreen();
  const { setDrawerOpen } = useDrawer();


  return (
    <Stack sx={styles.wrapper}>
      <Container maxWidth="xl" sx={styles.container}>
        <Typography variant="h6" sx={styles.sectionTitle}>
         {t("section")}
        </Typography>
        <Typography variant="h2" sx={styles.title}>
          {t("title")}
        </Typography>
        <Typography variant="subtitle1" sx={styles.description}>
          {t("description")}
        </Typography>


        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ mb: { xs: 1, md: 6 } }}
        >
          <Button
            variant={selectedFrame === "integration" ? "contained" : "outlined"}
            color="primary"
            size= "medium"
            onClick={() => setSelectedFrame("integration")}
          >
            {t("button1")}
          </Button>

          <Button
            variant={selectedFrame === "management" ? "contained" : "outlined"}
               size= "medium"
            color="primary"
            onClick={() => setSelectedFrame("management")}
          >
            {t("button2")}
          </Button>
        </Stack>

        {/* Arcade Frame */}
        <Box sx={styles.frameWrapper}>
          {selectedFrame === "integration" && (
              <iframe
              src="https://demo.arcade.software/cprLdNTLy15i72nFanYS?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true"
              title="2dcut.com"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="clipboard-write"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
            />
      
          )}

          {selectedFrame === "management" && (
            <iframe
              src="https://demo.arcade.software/03BAKVkURRqW995ny5B5?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="clipboard-write"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                colorScheme: "light",
              }}
            />
          )}
        </Box>
        {mdUp && (
  <Stack sx={styles.paperWrapper}>
    <Paper elevation={3} sx={styles.paper}>
      <Grid container spacing={2} alignItems="center">
        {/* 📌 Sol Taraf (Başlık + Açıklama + Butonlar) */}
        <Grid item xs={12} md={8} sx={styles.content}>
          <Typography variant="h5" sx={styles.title2}>
            {t("paperTitle")}
          </Typography>

          {/* 📌 Butonlar */}
          <Stack sx={styles.buttonGroup}>
            <Button
              variant="contained"
              onClick={() => setDrawerOpen(true)}
              color="primary"
            >
              {t("offerButton")}
            </Button>
            <Link href="/contact">
              <Button variant="outlined" color="primary">
                {t("supportButton")}
              </Button>
            </Link>
          </Stack>

          {/* 📌 Açıklama */}
          <Typography variant="body2" sx={styles.description2}>
            {t("info")}
          </Typography>
        </Grid>

        {/* 📌 Sağ Taraf (Resim - Hep Sağda) */}
        <Grid item xs={12} md={4} sx={styles.paperImage}>
          <Image
            src="/static/images/upload.svg"
            alt=""
            width={300}
            height={200}
          />
        </Grid>
      </Grid>
    </Paper>
  </Stack>
)}







      </Container>
    </Stack>
  );
};

export default Arcade;
