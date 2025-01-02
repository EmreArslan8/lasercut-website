'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid2 } from '@mui/material';
import Image from 'next/image';

const steps = [
  {
    id: 1,
    image: '/static/images/step1.webp',
    title: 'Modelinizi Yükleyin',
    description: 'Anlık Fiyat Motoruna modellerinizi yükledikten kısa bir süre sonra ekranda ayrıntılı bir maliyet tahmini ve üretilebilirlik analizi belirir.',
  },
  {
    id: 2,
    image: '/static/images/step2.webp',
    title: 'Sipariş Detaylarını Girin',
    description: 'İhtiyacınız olan üretim teknolojisini seçin. Geniş metal malzeme yelpazesi, gelişmiş yüzey işlemleri ve dilediğiniz tolerans aralıklarıyla üretime başlayın.',
  },
  {
    id: 3,
    image: '/static/images/step3.webp',
    title: 'Parça Siparişinizi Oluşturun',
    description: 'Üretim için gerekli tüm detayları belirtin ve ödeme yöntemini seçerek siparişi onaylayın.  Tasarımınız, Xometry mühendisleri tarafından incelenerek doğru üreticiyle eşleştirilir.',
  },
  {
    id: 4,
    image: '/static/images/step4.webp',
    title: 'Parçalarınızı Teslim Alın',
    description: 'Kısa bir süre içerisinde parçalarınız kalite kontrolden geçerek adresinize gönderilir. Sipariş panelinden kargo süreçlerini takip edin.',
  },
];

const InteractiveSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Zamanla görsel değişimi için otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep + 1) % steps.length);
    }, 5000);
    return () => clearInterval(interval); // Temizleme
  }, []);

  return (
    <Box sx={{ padding: '2rem 1rem', margin: '0 auto' }}>
      {/* Başlık */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#4A4A4A',
        }}
      >
        Online Parça Üretim Süreci
      </Typography>

      <Grid2 container spacing={4} alignItems="stretch">
        {/* Sol: Büyük Resim Döngüsü */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f3f4f6, #ffffff)',
            }}
          >
            <Image
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Grid2>

        {/* Sağ: Metin Kartları */}
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              height: '100%',
            }}
          >
            {steps.map((step, index) => (
              <Paper
                key={step.id}
                elevation={activeStep === index ? 10 : 3}
                sx={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  background: activeStep === index
                    ? 'linear-gradient(135deg, #a1c4fd, #c2e9fb)' // Modern degrade arka plan
                    : '#ffffff',
                  color: activeStep === index ? '#ffffff' : '#333',
                  transition: 'all 0.3s ease',
                  borderRadius: '15px',
                  boxShadow:
                    activeStep === index
                      ? '0 6px 15px rgba(0, 0, 0, 0.2)'
                      : '0 3px 10px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                  },
                  flex: '1',
                }}
                onClick={() => setActiveStep(index)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#000', // Yazı rengi siyah yapıldı
                  }}
                >
                  {index + 1}. {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.6,
                    color: '#000', // Gövde yazısı için siyah renk
                  }}
                >
                  {step.description}
                </Typography>

              </Paper>
            ))}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default InteractiveSteps;
