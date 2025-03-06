"use client";

import { Box, Grid, Typography, Stack, Card } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Image from "next/image";
import theme from "@/theme/theme";

const features = [
  {
    title: "Industry-Leading Accuracy",
    description: "High-precision laser cutting for optimal results.",
  },
  {
    title: "Fast Turnaround Time",
    description: "We deliver projects quickly without compromising quality.",
  },
  {
    title: "Custom Solutions",
    description: "Tailored cutting services to meet your specific needs.",
  },
  {
    title: "Eco-Friendly Processes",
    description: "Sustainable solutions that minimize waste.",
  },
];

const BenefitSection = () => {
  return (
    <Box sx={{ width: "100%", py: 10, position: "relative" }}>
      {/* Başlık */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mb: 5,
        }}
      >
        We Give Precision{" "}
        <Box component="span" sx={{ color: theme.palette.primary.main }}>
          Efficiency And Excellence
        </Box>{" "}
        For Services.
      </Typography>

      {/* Arka Planda Fotoğraf ve Önde Kart */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          position: "relative",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Fotoğraf */}
        <Box
          sx={{
            position: "relative",
            height: { xs: "250px", md: "450px" },
            width: { xs: "250px", md: "700px" },
            overflow: "hidden",
            borderRadius: "12px",
          }}
        >
          <Image
            src="/static/images/benefits.jpg" // Güncel resim ile değiştir
            alt="Industry Workers"
            layout="fill"
            objectFit="cover"
          />
        </Box>

        {/* Üstte Metin Kartı */}
        <Card
          sx={{
            position: "absolute",
            bottom: "-20px",
            left: "80%",
            transform: "translateX(-50%)",
            width: { xs: "90%", md: "50%" },
            p: 4,
            background: theme.palette.grey[900],
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CheckCircleIcon sx={{ color: theme.palette.primary.light, fontSize: "30px" }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};

export default BenefitSection;
