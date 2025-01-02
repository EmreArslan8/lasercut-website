'use client';

import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import FactoryIcon from '@mui/icons-material/Factory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const ProcessSteps = () => {
  return (
    <Box
      sx={{
        padding: '3rem 2rem',
        background: '#f9fafc',
        textAlign: 'center',
        borderRadius: '16px',
      }}
    >
      {/* Başlık */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          marginBottom: '2rem',
          color: '#1976d2',
        }}
      >
        Anlık Fiyat Motoru Süreci
      </Typography>

      {/* Süreç Kartları */}
      <Grid
        container
        spacing={4}
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {[
          {
            icon: <ComputerIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
            title: 'Anlık teklif alın',
            description:
              'Anlık teklif almak için: 3D modelinizi yükledikten sonra üretim teknolojisi ve malzemeyi seçmeniz yeterlidir.',
          },
          {
            icon: <FactoryIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
            title: 'Sipariş ver',
            description:
              'Siparişinizi verdikten sonra üretim süreci başlar. Düzenli geri bildirimler alırsınız.',
          },
          {
            icon: <LocalShippingIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
            title: 'Parçaları teslim alın',
            description:
              'Kalite güvencesi, kalite kontrol raporları ve teslimat takibi sağlıyoruz.',
          },
        ].map((step, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              {step.icon}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: '0.5rem',
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#555', lineHeight: '1.6' }}
              >
                {step.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Kesik Çizgi */}
      <Box
        sx={{
          marginTop: '2rem',
          width: '100%',
          height: '2px',
          background: 'repeating-linear-gradient(90deg, #1976d2 0, #1976d2 10px, transparent 10px, transparent 20px)',
        }}
      ></Box>

      {/* Video İzle Linki */}
      <Box sx={{ marginTop: '2rem' }}>
        <PlayCircleOutlineIcon sx={{ fontSize: 30, color: '#1976d2', marginRight: '0.5rem' }} />
        <Typography
          variant="body1"
          component="a"
          href="#"
          sx={{
            color: '#1976d2',
            textDecoration: 'none',
            fontWeight: 'bold',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Videoyu İzle
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: '#555', display: 'inline', marginLeft: '0.5rem' }}
        >
          Anlık Fiyat Motoru Nasıl Kullanılır?
        </Typography>
      </Box>
    </Box>
  );
};

export default ProcessSteps;
