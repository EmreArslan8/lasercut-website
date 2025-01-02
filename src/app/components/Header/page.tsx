'use client';

import { Box, Button, IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`, // Tema tabanlı renk
        maxWidth: '1536px',
        margin: '0 auto',
      }}
    >
      {/* Logo (Buton Haline Dönüştü) */}
      <IconButton
        onClick={() => router.push('/')} // Ana sayfaya yönlendirme
        sx={{
          padding: 0, // Varsayılan buton padding'ini kaldırır
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Image
          src="/static/images/logo.png"
          alt="Logo"
          width={120}
          height={60}
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </IconButton>

      {/* Sağ Bölüm */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        {/* Teklif Butonu */}
        <Button
          variant="contained"
          color="primary" // Temadaki primary rengi kullanır
          sx={{
            fontSize: '0.9rem',
            textTransform: 'none', // Temadaki typography'den gelir
          }}
          onClick={() => router.push('/teklif')} // Yönlendirme
        >
          Online Teklif Oluştur
        </Button>

        {/* Admin Panel Butonu */}
        <Button
          variant="outlined"
          color="secondary" // Temadaki secondary rengi kullanır
          onClick={() => router.push('/admin')} // Admin sayfasına yönlendirme
          sx={{
            fontSize: '0.9rem',
            textTransform: 'none', // Temadaki typography'den gelir
          }}
        >
          Admin Paneline Git
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
