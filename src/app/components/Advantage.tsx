"use client";

import { Box, Grid2, Typography, useTheme } from "@mui/material";


const advantages = [
  {
    icon: "🚀",
    title: "Yüksek Hızda Üretim",
    description:
      "Son teknoloji lazer kesim makineleri kullanan Xometry, anında sac metal fiyat teklifi ve 7 iş gününden başlayan teslim süreleriyle tamamlanmış parçalar üretmenizi sağlar.",
  },
  {
    icon: "🎯",
    title: "Yüksek Hassasiyet",
    description:
      "Xometry, ISO 2768 (standard, fine) standartları uyarınca çeşitli tolerans seçenekleri sunar.",
  },
  {
    icon: "✨",
    title: "Gelişmiş Yüzey Opsiyonları",
    description:
      "Eloksal kaplama, elektrostatik toz boya ve boyama gibi gelişmiş yüzey opsiyonları ile üretim yapın.",
  },
  {
    icon: "🛠️",
    title: "Malzeme Seçimi",
    description:
      "Yüksek mukavemet ve korozyon direncine, çeşitli iletkenlik ve ağırlıklara sahip metal malzemeler arasından seçim yapın.",
  },
  {
    icon: "✔️",
    title: "Kalite Kontrol",
    description:
      "Kalite Kontrol departmanımız güçlü bir kalite güvencesi sağlar. Xometry ISO 9001 sertifikasına sahiptir.",
  },
  {
    icon: "📜",
    title: "Sertifikalar ve Ölçüm Raporları",
    description:
      "Xometry, talebe özel parçalarınız için sertifikalar (örn. malzeme sertifikası) ve kalite kontrol raporları sağlayabilir (CMM, FAIR, vb.).",
  },
];

const AdvantageSection = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 2,
          color: theme.palette.text.primary,
        }}
      >
        Xometry Lazer Kesim Hizmetinin Avantajları
      </Typography>

      <Grid2 container spacing={4}>
        {advantages.map((adv, index) => (
          <Grid2
            size={{ xs: 12, sm: 6 }}
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                color: theme.palette.primary.contrastText,
                width: 80,
                height: 80,
                display: { xs: "none", sm: "flex" }, // Mobilde gizle
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 1,
              }}
            >
              <Typography sx={{ fontSize: "32px" }}>{adv.icon}</Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "8px",
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
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default AdvantageSection;
