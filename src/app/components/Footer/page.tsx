'use client';

import { Box, Typography, Grid, Link, Divider, Container } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GavelIcon from '@mui/icons-material/Gavel';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0a2940',
        color: '#ffffff',
        padding: '3rem 1rem',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo ve Telif */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#ffffff',
              }}
            >
              Xometry
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
              Müşteri Bölgesi
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0bec5' }}>
              &copy; 2017-2024, Xometry TR Teknoloji A.Ş.
            </Typography>
          </Grid>

          {/* Hükümler ve Koşullar */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ffffff', // Yeni ikon rengi
              }}
            >
              <GavelIcon fontSize="small" />
              Hükümler
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="#" underline="none" color="#b0bec5">
                Veri Koruma
              </Link>
              <Link href="#" underline="none" color="#b0bec5">
                İletişim
              </Link>
              <Link href="#" underline="none" color="#b0bec5">
                Gizlilik Ayarları
              </Link>
            </Box>
          </Grid>

          {/* İletişim */}
          <Grid item xs={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#ffffff', // Yeni ikon rengi
              }}
            >
              <PhoneIcon fontSize="small" />
              İletişim
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
              +90 (212) 221 06 35
            </Typography>
            <Link
              href="mailto:help@xometry.com.tr"
              underline="none"
              sx={{ color: '#b0bec5' }}
            >
              help@xometry.com.tr
            </Link>
          </Grid>

          {/* Adres */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '1rem',
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
          </Grid>
        </Grid>

        <Divider sx={{ backgroundColor: '#ffffff', margin: '2rem 0' }} />

        {/* Ödeme Yöntemleri */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
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
