'use client';

import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/teklif');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '3rem 2rem',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        gap: '2rem',
      }}
    >
      {/* Left Section */}
      <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '3rem' },
            color: '#333',
            marginBottom: '1.5rem',
          }}
        >
          Lazer Kesim Hizmeti
        </Typography>
        <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
          {[
            '7 Günde Yüksek Hızda Üretim',
            'Online Lazer Kesim Hizmeti',
            'Alüminyum, Çelik, HRP, Paslanmaz Çelik ve daha fazlası',
            'Sertifikalar ve Ölçüm Raporları',
          ].map((item, index) => (
            <li
              key={index}
              style={{ marginBottom: '0.8rem', fontSize: '1.1rem', color: '#555' }}
            >
              • {item}
            </li>
          ))}
        </ul>
        <Box sx={{ marginTop: '2rem', display: { xs: 'block', md: 'none' } }}>
          <Button
            variant="contained"
            onClick={handleClick}
            color="primary"
            sx={{
              textTransform: 'none',
              width: '100%',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
            }}
          >
            Anında Teklif Al
          </Button>
        </Box>
      </Box>

      {/* Right Section */}
          {/* Right Section */}
          <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' }, // Mobilde gizlenir, masaüstünde görünür
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          borderRadius: '16px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          {[1, 2, 3].map((num) => (
            <Image
              key={num}
              src={`/static/images/metalmodel${num}.webp`}
              alt={`Görsel ${num}`}
              width={80}
              height={80}
              style={{ borderRadius: '8px' }}
            />
          ))}
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#333',
            marginBottom: '1rem',
          }}
        >
          Lazer Kesim ile Üretime Başla
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            marginBottom: '1.5rem',
            fontSize: '1rem',
          }}
        >
          STEP | STP | SLDPRT | STL | IPT | 3DXML | CATPART | PTC | PRT | SAT
        </Typography>
        <Button
          variant="contained"
          onClick={handleClick}
          color="primary"
          sx={{
            textTransform: 'none',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
          }}
        >
          Anında Teklif Al
        </Button>
        <Typography
          variant="body2"
          sx={{
            marginTop: '1rem',
            color: '#888',
            fontSize: '0.9rem',
          }}
        >
          Yüklenen tüm modeller korumamız altındadır.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;