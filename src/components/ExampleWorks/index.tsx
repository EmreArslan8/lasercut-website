"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Modal,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";
import styles from "./styles";
import { Link } from "@/i18n";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import CustomSlider from "../CustomSlider";

const exampleData = [
  { id: 1, title: "example 1", image: "/static/images/example1.webp" },
  { id: 2, title: "example 2", image: "/static/images/example2.webp" },
  { id: 3, title: "example 3", image: "/static/images/example3.webp" },
  { id: 4, title: "example 4", image: "/static/images/example4.webp" },
  { id: 5, title: "example 5", image: "/static/images/example5.webp" },
  { id: 6, title: "example 6", image: "/static/images/example6.webp" },
  { id: 7, title: "example 7", image: "/static/images/example7.webp" },
  { id: 8, title: "example 8", image: "/static/images/example8.webp" },
  { id: 9, title: "example 9", image: "/static/images/example9.webp" },
  { id: 10, title: "example 10", image: "/static/images/example10.webp" },
  { id: 11, title: "example 11", image: "/static/images/example11.webp" },
  { id: 12, title: "example 12", image: "/static/images/example12.webp" },
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
        <Typography variant="h2" sx={styles.sectionHeading}>
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
                loading="lazy"
              />
            </Box>
          ))}
        </CustomSlider>

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={styles.modalContainer}>
            <IconButton onClick={handleCloseModal} sx={styles.closeButton}>
              <X />
            </IconButton>
            <IconButton
             
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev! > 0 ? prev! - 1 : exampleData.length - 1
                )
              }
              sx={styles.arrowButton(true)}
            >
              <ChevronLeft />
              </IconButton>
            <IconButton
      
              onClick={() =>
                setSelectedIndex((prev) =>
                  prev! < exampleData.length - 1 ? prev! + 1 : 0
                )
              }
              sx={styles.arrowButton(false)}
            >
            <ChevronRight />
            </IconButton>
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
            <Button variant="contained" size="medium" sx={styles.galleryButton}>
              {t("goToGallery")}
            </Button>
          </Link>
        </Box>
      </Box>
    </Stack>
  );
};

export default ExampleSlider;
