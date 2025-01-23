"use client";

import { useState } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import Image from "next/image";
import { Box, Typography, IconButton, Modal } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useScreen from "@/lib/hooks/useScreen";
import { useTranslations } from "next-intl";
import styles from "./styles";
import Icon from "../Icon";


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

function PrevArrow(props: CustomArrowProps) {
  const { isMobile } = useScreen();
  return (
    <IconButton
      onClick={props.onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: isMobile ? "5px" : "-10px",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        ":hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        color: "#fff",
        width: isMobile ? "20px" : "30px", // Boyut ayarlama
        height: isMobile ? "20px" : "30px", // Boyut ayarlama
      }}
    >
      <ArrowBackIosIcon sx={{ fontSize: isMobile ? "15px" : "24px" }} />
    </IconButton>
  );
}

function NextArrow(props: CustomArrowProps) {
  const { isMobile } = useScreen();
  return (
    <IconButton
      onClick={props.onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: isMobile ? "5px" : "-10px",
        transform: "translateY(-50%)",
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        ":hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        color: "#fff",
        width: isMobile ? "20px" : "30px", // Boyut ayarlama
        height: isMobile ? "20px" : "30px", // Boyut ayarlama
      }}
    >
      <ArrowForwardIosIcon sx={{ fontSize: isMobile ? "15px" : "24px" }} />
    </IconButton>
  );
}

// Slider bileşeni
const ExampleSlider = () => {
  const { isMobile, isTablet } = useScreen(); // useScreen hook'u
  const slidesToShow = isMobile ? 1 : isTablet ? 2 : 3;
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box sx={styles.sliderContainer}>
      <Typography variant="h4" sx={styles.sliderTitle}>
        {t("title")}
      </Typography>
      <Slider {...settings}>
        {exampleData.map((item, index) => (
          <Box
            key={item.id}
            onClick={() => handleImageClick(index)}
            sx={styles.slideBox}
          >
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        ))}
      </Slider>
    
      
  
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={styles.modalContainer}>
          {/* Kapatma Butonu */}
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
    </Box>
  );
};

export default ExampleSlider;
