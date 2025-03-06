'use client';

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useScreen from '@/lib/hooks/useScreen';
import { useTranslations } from 'next-intl';

const images = [
    {
        id: 1,
        src: '/static/images/banner1.webp',
        alt: 'Laser Cut Example 1',
    },
    {
        id: 2,
        src: '/static/images/banner2.jpg',
        alt: 'Laser Cut Example 2',
    },
    {
        id: 3,
        src: '/static/images/banner3.webp',
        alt: 'Laser Cut Example 3',
    },
];

const BannerSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    const { isMobile } = useScreen();
    const t = useTranslations('Banner');

    return (
        <Stack
        sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 'xl', // Genişliği sınırlamak için eklendi
            mx: 'auto', // Ortalamak için
            overflow: 'hidden',
            mb: 4,
        }}
    >
        <Slider {...settings}>
            {images.map((image) => (
                <Box
                    key={image.id}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: isMobile ? '300px' : '500px', 
                    }}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                </Box>
            ))}
        </Slider>
    
        {/* Başlık ve Alt Başlık */}
        <Box
            sx={{
                position: 'absolute',
                top: isMobile ? '40px' : '60px',
                left: '2%', // Sola yaslama
                textAlign: isMobile ? 'center' : 'left', // Responsive hizalama
                color: '#fff',
                zIndex: 10,
            }}
        >
            <Typography
                variant={isMobile ? 'h4' : 'h1'}
                sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    lineHeight: 1.2,
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
                }}
            >
                {t("title")}
            </Typography>
            <Typography
                variant={isMobile ? 'body1' : 'h6'}
                sx={{
                    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                    maxWidth: isMobile ? '90%' : '50%', // Alt başlık genişliği
                }}
            >
                {t("subtitle")}
            </Typography>
        </Box>
    </Stack>
    
    );
};

export default BannerSlider;
