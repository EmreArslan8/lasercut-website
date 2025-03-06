import useGsapAnimation from "@/lib/hooks/useGsapAnimation";
import { Box, Container, Typography, Grid } from "@mui/material";
import { useRef } from "react";


const achievements = [
  { value: 25, suffix: "Y", title: "Experience" },
  { value: 250, suffix: "+", title: "Our Worker" },
  { value: 15, suffix: "+", title: "Company Partner" },
  { value: 500, suffix: "+", title: "Happy Clients" },
];

const Archivements = () => {
  const refs = achievements.map(() => useRef<HTMLDivElement>(null));

  // Counter animasyonlarını tetikle
  refs.forEach((ref, index) => {
    useGsapAnimation(ref, {
      animation: "counter",
      counterEndValue: achievements[index].value,
      suffix: achievements[index].suffix,
      duration: 2,
      ease: "power1.out",
      start: "top 90%",
    });
  });

  return (
    <Box sx={{ py: 10,   bgcolor: "white" }}>
      <Container>
        <Typography
          variant="subtitle2"
          color="error"
          textAlign="center"
          fontWeight={700}
        >
          ARCHIVEMENTS
        </Typography>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={800}
          mb={4}
        >
          OUR BUSINESS ARCHIVEMENTS
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          maxWidth={600}
          mx="auto"
          mb={6}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {achievements.map((item, index) => (
            <Grid key={item.title} item xs={6} md={3} textAlign="center">
              <Typography
                ref={refs[index]}
                variant="h4"
                fontWeight={800}
                color="error"
              >
                0{item.suffix}
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {item.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Archivements;
