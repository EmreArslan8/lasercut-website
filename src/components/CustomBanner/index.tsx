"use client";

import { useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  Grid2,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";
import theme from "@/theme/theme";
import styles from "./styles";
import useGsapAnimation from "@/lib/hooks/useGsapAnimation";
import Icon from "../common/Icon";

const images = [
  { id: 1, src: "/static/images/cnc1.jpg", alt: "Laser Cut Example 1" },
  { id: 2, src: "/static/images/cnc2.jpg", alt: "Laser Cut Example 2" },
  { id: 3, src: "/static/images/cnc3.jpg", alt: "Laser Cut Example 3" },
  { id: 4, src: "/static/images/cnc4.jpg", alt: "Laser Cut Example 4" },
];

const BannerSlider = ({
  setDrawerOpen,
}: {
  setDrawerOpen: (open: boolean) => void;
}) => {
  const { isMobile } = useScreen();
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const t = useTranslations("Banner");
  const [videoOpen, setVideoOpen] = useState(false);

  useGsapAnimation(titleRef, { animation: "slideRight", delay: 0.3 });
  useGsapAnimation(textRef, { animation: "slideLeft", delay: 0.4 });
  useGsapAnimation(buttonRef, { animation: "slideUp", delay: 0.6 });
  useGsapAnimation(imageRef, { animation: "zoomIn", duration: 2 });
  useGsapAnimation(counterRef, {
    animation: "counter",
    counterEndValue: 98,
    duration: 2,
    delay: 0.5,
    suffix: "%",
    ease: "power1.out",
  });

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
            <Box ref={imageRef} key={image.id} sx={styles.slide}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
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
              <Typography ref={titleRef} variant="h1" sx={styles.title}>
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
                ref={buttonRef}
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
            <Typography ref={textRef} variant="h6" sx={{ mb: 3 }}>
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
                <Typography ref={counterRef} sx={styles.counter}>
                  0%
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
