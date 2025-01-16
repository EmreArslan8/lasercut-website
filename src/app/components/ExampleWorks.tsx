'use client';

import  { useState } from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import Image from 'next/image';
import { Box, Typography, IconButton, Modal } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useScreen from '@/lib/hooks/useScreen';
import { useTranslations } from 'next-intl';

// Görseller
const exampleData = [
  { id: 1, title: 'example 1', image: '/static/images/example1.jpeg' },
  { id: 2, title: 'example 2', image: '/static/images/example2.jpeg' },
  { id: 3, title: 'example 3', image: '/static/images/example3.jpeg' },
  { id: 4, title: 'example 4', image: '/static/images/example4.jpeg' },
  { id: 5, title: 'example 5', image: '/static/images/example5.jpeg' },
  { id: 6, title: 'example 6', image: '/static/images/example6.jpeg' },
  { id: 7, title: 'example 7', image: '/static/images/example7.jpeg' },
  { id: 8, title: 'example 8', image: '/static/images/example8.jpeg' },
  { id: 9, title: 'example 9', image: '/static/images/example9.jpeg' },
  { id: 10, title: 'example 10', image: '/static/images/example10.jpeg' },
  { id: 11, title: 'example 11', image: '/static/images/example11.jpeg' },
  { id: 12, title: 'example 12', image: '/static/images/example12.jpg' },
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const t = useTranslations("ExampleWorks")

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
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
    <Box
      sx={{
        mt: 4,
        maxWidth: 'xl',
        backgroundColor: 'transparent',
        '& .slick-track': {
          display: 'flex',
          gap: '10px',
        },
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
     {t("title")}
      </Typography>
      <Slider {...settings}>
        {exampleData.map((item) => (
          <Box
            key={item.id}
            onClick={() => handleImageClick(item.image)} 
            sx={{
              position: 'relative',
              cursor: 'pointer',
              height: { xs: 400, sm: 400, md: 400 },
              '&:hover': { opacity: 0.8 },
            }}
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

      {/* Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        
        
            backgroundColor: '#fff',
            boxShadow: 24,
            p: 2,
            overflow: 'auto',
          }}
        >
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected Work"
              layout="responsive"
              width={700}
              height={500}
              objectFit="contain"
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ExampleSlider;
