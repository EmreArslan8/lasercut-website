import { Box, Grid, Typography, Stack, Grid2, Container } from "@mui/material";

import Image from "next/image";
import Icon from "../common/Icon";
import styles from "./styles";
import { useTranslations } from "next-intl";

const services = [
  {
    title: "Laser Cutting Service",
    description: "High-precision laser cutting with fast turnaround times.",
    icon: <Icon name="laser" />,
    image: "https://images.unsplash.com/photo-1625464733746-f884014c73bc?q=80&w=2804&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "CNC Machining Service",
    description: "Accurate CNC machining for complex parts.",
    icon: <Icon name="laser" />,
    image: "https://images.unsplash.com/photo-1602223114290-ba6de2938acc?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Custom Metal Fabrication",
    description: "Tailored metal fabrication to meet your needs.",
    icon:  <Icon name="laser" />,
    image: "https://images.unsplash.com/photo-1615286922420-c6b348ffbd62?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ServiceCards = () => {
  const t = useTranslations("")
  return (
    <Stack sx={{ bgcolor: "white" }}>
    <Box sx={styles.sliderContainer}>
      <Typography variant="h6" sx={styles.sectionTitle}>
      What We Do
      </Typography>
      <Typography sx={styles.sectionHeading}>
      We Do Best Engineering Services For You
      </Typography>
      <Typography variant="body1" sx={styles.sectionDescription}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
      </Typography>

      <Grid2 container spacing={3}>
        {services.map((service, index) => (
          <Grid2 size={{xs: 12, sm: 4}} key={index}>
            <Box
              sx={{
                position: "relative",
                borderRadius: 4,
                overflow: "hidden", 
                height: 400,
              }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  bgcolor: "white",
                  p: 1.5,
                  borderRadius: 2,
                }}
              >
                {service.icon}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 16,
                  left: 16,
                  right: 16,
                  color: "white",
                  textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {service.title}
                </Typography>
                <Typography variant="body2">{service.description}</Typography>
              </Box>
            </Box>
          </Grid2>
        ))}
      </Grid2>
      </Box>
  </Stack>
  );
};

export default ServiceCards;
