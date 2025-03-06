import { Box, Grid, Stack, Typography } from "@mui/material";
import { Wrench, Target, Settings } from "lucide-react";

const cardData = [
  {
    title: "High-Speed Manufacturing",
    description:
      "Produce finished parts with instant sheet metal pricing and fast delivery.",
    icon: <Wrench size={28} />, 
    image: "/images/high-speed.jpg",
  },
  {
    title: "High Precision",
    description: "Tolerance options according to ISO 2768 (standard, fine).",
    icon: <Target size={28} />, 
    image: "/images/high-precision.jpg",
  },
  {
    title: "Advanced Surface Options",
    description:
      "Manufacture with anodizing, powder coating, and painting options.",
    icon: <Settings size={28} />, 
    image: "/images/surface-options.jpg",
  },
];

export default function HoverCardSection() {
  return (
    <Grid container spacing={3} justifyContent="center">
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box
            sx={{
              position: "relative",
              p: 4,
              bgcolor: "#f5f5f5",
              borderRadius: 4,
              height: 320,
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              '&:hover': {
                bgcolor: "transparent",
                '& .hoverImage': { opacity: 1, transform: "scale(1.05)" },
              },
            }}
          >
            <Stack spacing={2} zIndex={2} position="relative">
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </Box>
              <Typography variant="h6" fontWeight={600}>
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </Stack>

            <Box
              className="hoverImage"
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0,
                transition: "all 0.4s ease",
                zIndex: 1,
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
