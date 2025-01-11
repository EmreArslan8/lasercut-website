'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Görseller
const exampleData = [
  { id: 1, title: 'çalışma 1', image: '/static/images/çalışma1.jpeg' },
  { id: 2, title: 'çalışma 2', image: '/static/images/çalışma2.jpeg' },
  { id: 3, title: 'çalışma 3', image: '/static/images/çalışma3.jpeg' },
  { id: 4, title: 'çalışma 4', image: '/static/images/çalışma4.jpeg' },
  { id: 5, title: 'çalışma 5', image: '/static/images/çalışma5.jpeg' },
  { id: 6, title: 'çalışma 6', image: '/static/images/çalışma6.jpeg' },
  { id: 7, title: 'çalışma 2', image: '/static/images/çalışma7.jpeg' },
  { id: 8, title: 'çalışma 3', image: '/static/images/çalışma10.jpeg' },
  { id: 9, title: 'çalışma 4', image: '/static/images/çalışma9.jpeg' },
  { id: 10, title: 'çalışma 5', image: '/static/images/çalışma8.jpeg' },
  { id: 11, title: 'çalışma 6', image: '/static/images/çalışma11.jpeg' },
];

// Sol ve Sağ ok bileşenleri
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '-40px',
        transform: 'translateY(-50%)',
        zIndex: 10,
        backgroundColor: 'transparent', // Arka plan transparan
        ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }, // Hover için şeffaf koyu
      }}
    >
      <ArrowBackIosIcon sx={{ color: '#000' }} /> {/* Ok rengi */}
    </IconButton>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: '50%',
        right: '-40px',
        transform: 'translateY(-50%)',
        zIndex: 10,
        backgroundColor: 'transparent', // Arka plan transparan
        ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)' }, // Hover için şeffaf koyu
      }}
    >
      <ArrowForwardIosIcon sx={{ color: '#000' }} /> {/* Ok rengi */}
    </IconButton>
  );
}

// Slider bileşeni
const ExampleSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Aynı anda 2 resim göster
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        mt: 4,
       
        backgroundColor: 'transparent', // Ana kutunun arka planı şeffaf
        '& .slick-track': {
          display: 'flex',
          gap: '10px', // Resimler arasında boşluk
        },
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Çalışmalar
      </Typography>
      <Slider {...settings}>
        {exampleData.map((item) => (
          <Box key={item.id} sx={{ position: 'relative', height: 300 }}>
          
              <Image
                src={item.image}
                alt={item.title}
                layout="fill"
                objectFit="contain" // Kesilmemesi için contain
              />

           
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ExampleSlider;
