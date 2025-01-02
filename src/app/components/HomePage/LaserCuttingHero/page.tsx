'use client';

import { Box, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';

const LaserCuttingHero = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        padding: '2rem',
        backgroundColor: '#f9fafb',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        position: 'relative',
      }}
    >
      {/* Sol Bölüm */}
      <Box
        sx={{
          flex: 1,
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '1rem',
            lineHeight: 1.4,
          }}
        >
          Güvenilir Lazer Kesim Hizmeti
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#555',
            marginBottom: '2rem',
            fontSize: '1rem',
          }}
        >
          Yüksek kaliteli üretim için tasarımlarınızı güvenle bize teslim edin. Her zaman yanınızdayız.
        </Typography>

        {/* İstatistikler */}
        <Box
          sx={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '0.5rem',
              }}
            >
              Müşteriler
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#1976d2',
                fontWeight: 'bold',
              }}
            >
              60.000+
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '0.5rem',
              }}
            >
              Üretilmiş Parçalar
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#1976d2',
                fontWeight: 'bold',
              }}
            >
              1.000.000+
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Sağ Bölüm */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <StarIcon sx={{ color: '#ffcc00' }} />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              fontSize: '0.9rem',
            }}
          >
            Trustpilot
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '0.8rem 1.5rem',
            fontSize: '1rem',
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#005bb5',
            },
          }}
          onClick={() => router.push('/teklif')}
        >
          Online Teklif Al
        </Button>
      </Box>
    </Box>
  );
};

export default LaserCuttingHero;
