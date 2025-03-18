"use client";

import { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Box, Stack, Typography, Button, Modal, Grid2 } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";
import theme from "@/theme/theme";
import styles from "./styles";
import Icon from "../common/Icon";
import { useDrawer } from "@/context/DrawerContext";
import Counter from "../common/Counter";

const images = [
  { id: 1, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/banner-desktop-1.webp?v=1742229467", alt: "Laser Cut Desktop 1" },
  { id: 2, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/banner-desktop-2.webp?v=1742229466", alt: "Laser Cut Desktop 2" },
  { id: 3, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/banner-desktop-3.webp?v=1742229468", alt: "Laser Cut Desktop 3" },
  { id: 4, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/banner-desktop-4.webp?v=1742229467", alt: "Laser Cut Desktop 4" },
];


const BannerSlider = () => {
  const { isMobile } = useScreen();
  const t = useTranslations("Banner");
  const [videoOpen, setVideoOpen] = useState(false);
  const { setDrawerOpen } = useDrawer();

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false,
    arrows: false,
  };

  const handleVideoOpen = () => setVideoOpen(true);
  const handleVideoClose = () => setVideoOpen(false);

  return (
    <>
      <Stack sx={styles.wrapper}>
        <Box sx={styles.sliderBox}>
          <Slider {...settings}>
            {images.map((image, index) => (
              <Box key={image.id} sx={styles.slide}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 600px) 100vw, 2000px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Diğer slider içerikleri */}
        <Box sx={styles.contentBox(isMobile)}>
          <Grid2 container spacing={5} alignItems="center" justifyContent="space-between">
            <Grid2 size={{ xs: 12, md: 7 }}>
              <Box textAlign={{ xs: "center", md: "left" }}>
                <Typography component="p" sx={styles.title}>
                  {t("titleStart")} <br />
                  <Box component="span" sx={{ color: theme.palette.primary.main }}>
                    {t("titleHighlight")}
                  </Box>{" "}
                  {t("titleEnd")}
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setDrawerOpen(true)}
                  sx={styles.button}
                >
                  {t("quickQuote")}
                </Button>
              </Box>
            </Grid2>
            <Box flex={1} sx={styles.rightGrid}>
              <Typography component="p" variant="h6" sx={styles.description}>
                {t("description")}
              </Typography>
              <Grid2 size={{ xs: 12, md: 5 }}>
                <Stack direction="row" sx={styles.rightStack}>
                  <Button onClick={handleVideoOpen}>
                    <Box sx={styles.playButtonWrapper}>
                      <Box sx={styles.ripple1} />
                      <Box sx={styles.ripple2} />
                      <svg
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#2979FF"
                      >
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    </Box>
                  </Button>
                  <Modal open={videoOpen} onClose={handleVideoClose}>
                    <Box sx={styles.modal}>
                      <Icon name="close" onClick={handleVideoClose} sx={styles.closeIcon} />
                      <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                        <iframe
                          width="100%"
                          height="100%"
                          loading="lazy"
                          src="https://www.youtube.com/embed/3lLfXX9Xu-0?si=9UGG5xE4u3IAyHsQ"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                        ></iframe>
                      </Box>
                    </Box>
                  </Modal>
                  <Counter start={5} end={98} duration={3000} fontSize={42} suffix="%" />
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ whiteSpace: "nowrap" }}>
                      {t("counterTitle")}
                    </Typography>
                    <Typography variant="body" sx={{ whiteSpace: "nowrap" }}>
                      {t("counterSubtitle")}
                    </Typography>
                  </Box>
                </Stack>
              </Grid2>
            </Box>
          </Grid2>
        </Box>
      </Stack>
    </>
  );
};

export default BannerSlider;
