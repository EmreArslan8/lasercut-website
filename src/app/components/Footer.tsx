'use client';

import { Box, Typography, Grid2, Link, Divider, Container } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0a2940',
        color: '#ffffff',
        padding: '3rem 16px',
      }}
    >
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          {/* Logo ve Telif */}
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
                color: '#ffffff',
              }}
            >
              Marka
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0bec5' }}>
              &copy; 2017-2024, Marka TR Teknoloji A.Ş.
            </Typography>
          </Grid2>

          {/* İletişim */}
          <Grid2 size={{ xs: 6, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ffffff', // Yeni ikon rengi
              }}
            >
              <PhoneIcon fontSize="small" />
              İletişim
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '0.5rem' ,  color: '#b0bec5' }}>
              +90 (212) 221 06 35
            </Typography>
            <Link
              href="mailto:help@xometry.com.tr"
              underline="none"
              sx={{ color: '#b0bec5' }}
            >
              help@xometry.com.tr
            </Link>
          </Grid2>

          {/* Adres */}
          <Grid2 size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ffffff', // Yeni ikon rengi
              }}
            >
              <LocationOnIcon fontSize="small" />
              Adres
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0bec5' }}>
              Yeşilbağlar, Pendik Pera Residence, D100 A Blok No: 20B,
              34893 Pendik/İstanbul
            </Typography>
          </Grid2>
        </Grid2>

        <Divider sx={{ backgroundColor: '#ffffff', margin: '32px 0' }} />

        {/* Ödeme Yöntemleri */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <Typography variant="body2" sx={{ color: '#b0bec5' }}>
            Invoice
          </Typography>
          <Typography variant="body2" sx={{ color: '#b0bec5' }}>
            iyzico ile Öde
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
