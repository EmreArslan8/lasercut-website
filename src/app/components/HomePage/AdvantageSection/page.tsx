'use client';

import { Box, Typography, Grid, useTheme } from '@mui/material';

const advantages = [
  {
    icon: '🚀',
    title: 'Yüksek Hızda Üretim',
    description:
      'Son teknoloji lazer kesim makineleri kullanan Xometry, anında sac metal fiyat teklifi ve 7 iş gününden başlayan teslim süreleriyle tamamlanmış parçalar üretmenizi sağlar.',
  },
  {
    icon: '🎯',
    title: 'Yüksek Hassasiyet',
    description:
      'Xometry, ISO 2768 (standard, fine) standartları uyarınca çeşitli tolerans seçenekleri sunar.',
  },
  {
    icon: '✨',
    title: 'Gelişmiş Yüzey Opsiyonları',
    description:
      'Eloksal kaplama, elektrostatik toz boya ve boyama gibi gelişmiş yüzey opsiyonları ile üretim yapın.',
  },
  {
    icon: '🛠️',
    title: 'Malzeme Seçimi',
    description:
      'Yüksek mukavemet ve korozyon direncine, çeşitli iletkenlik ve ağırlıklara sahip metal malzemeler arasından seçim yapın.',
  },
  {
    icon: '✔️',
    title: 'Kalite Kontrol',
    description:
      'Kalite Kontrol departmanımız güçlü bir kalite güvencesi sağlar. Xometry ISO 9001 sertifikasına sahiptir.',
  },
  {
    icon: '📜',
    title: 'Sertifikalar ve Ölçüm Raporları',
    description:
      'Xometry, talebe özel parçalarınız için sertifikalar (örn. malzeme sertifikası) ve kalite kontrol raporları sağlayabilir (CMM, FAIR, vb.).',
  },
];

const AdvantageSection = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: '2rem 1rem',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
        borderRadius: '16px',
        boxShadow: theme.shadows[3],
        maxWidth: 1400,
        margin: '0 auto',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          color: theme.palette.text.primary,
        }}
      >
        Xometry Lazer Kesim Hizmetinin Avantajları
      </Typography>

      <Grid container spacing={4}>
        {advantages.map((adv, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
               
                color: theme.palette.primary.contrastText,
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
                marginBottom: '1rem',

              }}
            >
              <Typography sx={{ fontSize: '2rem' }}>{adv.icon}</Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: theme.palette.text.primary,
              }}
            >
              {adv.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.text.secondary }}
            >
              {adv.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdvantageSection;
