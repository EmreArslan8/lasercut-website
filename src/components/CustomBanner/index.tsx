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
import { motion } from "framer-motion";
import { useFramerAnimations } from "@/lib/hooks/useFramerAnimation";

const images = [
  { id: 1, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/cnc1.webp?v=1741792760", alt: "Laser Cut Example 1" },
  { id: 2, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/cnc2.webp?v=1741792766", alt: "Laser Cut Example 2" },
  { id: 3, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/cnc3.webp?v=1741792770", alt: "Laser Cut Example 3" },
  { id: 4, src: "https://cdn.shopify.com/s/files/1/0653/1602/8497/files/cnc4.webp?v=1741792773", alt: "Laser Cut Example 4" },
];

const BannerSlider = ({}: {}) => {
  const { isMobile } = useScreen();

  const t = useTranslations("Banner");
  const [videoOpen, setVideoOpen] = useState(false);
  const { setDrawerOpen } = useDrawer();
  const { count } = useFramerAnimations("counter", 98);
  const titleAnimation = useFramerAnimations("slideRight");
  const buttonAnimation = useFramerAnimations("hoverTap");
  const descAnimation = useFramerAnimations("slideLeft");

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

  const handleVideoOpen = () => {
    setVideoOpen(true);
  };

  const handleVideoClose = () => {
    setVideoOpen(false);
  };

  return (
    <Stack sx={styles.wrapper}>
      <Box sx={styles.sliderBox}>
        <Slider {...settings}>
          {images.map((image) => (
            <Box key={image.id} sx={styles.slide}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                style={{
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>

      <Box sx={styles.contentBox(isMobile)}>
        <Grid2
          container
          spacing={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Box textAlign={{ xs: "center", md: "left" }}>
              <Typography
                component={motion.h1}
                {...titleAnimation.animation}
                sx={styles.title}
              >
                {t("titleStart")} <br />
                <Box
                  component="span"
                  sx={{ color: theme.palette.primary.main }}
                >
                  {t("titleHighlight")}
                </Box>{" "}
                {t("titleEnd")}
              </Typography>
              <Button
                component={motion.button} // ✅ Framer Motion ile entegre
                {...buttonAnimation.animation} // ✅ Hook'tan gelen animasyon
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
            <Typography
              component={motion.h6}
              {...descAnimation.animation}
              sx={{ mb: 3 }}
            >
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
                      width="30" // Üçgen boyutu
                      height="30"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#2979FF" // Üçgen rengi (mavi)
                      style={{
                        position: "absolute", // Konumlandırma
                      }}
                    >
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </Box>
                </Button>
                <Modal open={videoOpen} onClose={handleVideoClose}>
                  <Box sx={styles.modal}>
                    <Icon
                      name="close"
                      onClick={handleVideoClose}
                      sx={styles.closeIcon}
                    />
                    <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/3lLfXX9Xu-0?si=9UGG5xE4u3IAyHsQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      ></iframe>
                    </Box>
                  </Box>
                </Modal>
                <Typography component={motion.span} sx={styles.counter}>
                  {count}%
                </Typography>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ whiteSpace: "nowrap" }}
                  >
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
  );
};

export default BannerSlider;
