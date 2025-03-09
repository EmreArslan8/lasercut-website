"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Typography, Modal, Stack, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";
import styles from "./styles";
import Icon from "../common/Icon";
import theme from "@/theme/theme";
import CustomSlider from "../common/CustomSlider";
import { Link } from "@/i18n";

const exampleData = [
  { id: 1, title: "example 1", image: "/static/images/example1.jpeg" },
  { id: 2, title: "example 2", image: "/static/images/example2.jpeg" },
  { id: 3, title: "example 3", image: "/static/images/example3.jpeg" },
  { id: 4, title: "example 4", image: "/static/images/example4.jpeg" },
  { id: 5, title: "example 5", image: "/static/images/example5.jpeg" },
  { id: 6, title: "example 6", image: "/static/images/example6.jpeg" },
  { id: 7, title: "example 7", image: "/static/images/example7.jpeg" },
  { id: 8, title: "example 8", image: "/static/images/example8.jpeg" },
  { id: 9, title: "example 9", image: "/static/images/example9.jpeg" },
  { id: 10, title: "example 10", image: "/static/images/example10.jpeg" },
  { id: 11, title: "example 11", image: "/static/images/example11.jpeg" },
  { id: 12, title: "example 12", image: "/static/images/example12.jpg" },
];

const ExampleSlider = () => {
  const { isMobile, isTablet } = useScreen();
  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 4;
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const t = useTranslations("ExampleWorks");

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
    setOpenModal(false);
  };

  return (
    <Stack sx={{ bgcolor: "white" }}>
      <Box sx={styles.sliderContainer}>
        <Typography variant="h6" sx={styles.sectionTitle}>
          {t("ourWork")}
        </Typography>
        <Typography sx={styles.sectionHeading}>
          {t("workingGallery")}
        </Typography>
        <Typography variant="body1" sx={styles.sectionDescription}>
          {t("workingGalleryDesc")}
        </Typography>

        {/* ✅ CustomSlider kullanımı */}
        <CustomSlider slidesToShow={slidesToShow}>
          {exampleData.map((item, index) => (
            <Box
              key={item.id}
              onClick={() => handleImageClick(index)}
              sx={styles.slideBox}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: "cover", borderRadius: "12px" }}
              />
            </Box>
          ))}
        </CustomSlider>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={styles.modalContainer}>
            <Icon
              name="close"
              onClick={handleCloseModal}
              sx={styles.closeButton}
            />
            <Icon
              name="arrow_back_ios"
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev! > 0 ? prev! - 1 : exampleData.length - 1
                )
              }
              sx={styles.arrowButton(true)}
            />
            <Icon
              name="arrow_forward_ios"
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev! < exampleData.length - 1 ? prev! + 1 : 0
                )
              }
              sx={styles.arrowButton(false)}
            />
            {selectedIndex !== null && (
              <Box sx={styles.modalImageBox}>
                <Image
                  src={exampleData[selectedIndex].image}
                  alt={exampleData[selectedIndex].title}
                  fill
                  objectFit="contain"
                />
              </Box>
            )}
          </Box>
        </Modal>

        <Box sx={{ textAlign: "center" }}>
          <Link href="/examples">
            <Button
              variant="contained"
              size="medium"
              sx={styles.galleryButton}
            >
              {t("goToGallery")}
            </Button>
          </Link>
        </Box>
      </Box>
    </Stack>
  );
};

export default ExampleSlider;
