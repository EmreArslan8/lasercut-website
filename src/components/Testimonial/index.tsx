import React from "react";
import Slider from "react-slick";
import { Box, Typography, Avatar, Stack, Container, Grid, Grid2 } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles";

const testimonials = [
  {
    name: "Jane Doe",
    designation: "Product Manager",
    text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit...",
    avatar: "/static/avatars/woman.png", // Kadın avatar
    rating: 5,
  },
  {
    name: "John Smith",
    designation: "Software Engineer",
    text: "Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt...",
    avatar: "/static/avatars/man.png", // Erkek avatar
    rating: 4,
  },
  {
    name: "Emily Johnson",
    designation: "UI/UX Designer",
    text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit...",
    avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Grid2 container spacing={4} alignItems="center">
        {/* Sol taraf: Başlıklar */}
        <Grid2 size= {{xs: 12, md: 5}} sx={styles.textSection}>
          <Typography variant="h6" sx={styles.sectionBadge}>
            TESTIMONIAL
          </Typography>
          <Typography variant="h3" sx={styles.sectionTitle}>
            WHAT OUR CLIENT SAYS
          </Typography>
          <Typography sx={styles.sectionDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </Typography>
        </Grid2>

        {/* Sağ taraf: Slider */}
        <Grid2 size={{xs:12, md: 7}}>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={styles.testimonialCard}>
                {/* Yıldızlar */}
                <Box sx={styles.stars}>
                  {"★".repeat(testimonial.rating)}{" "}
                  {"☆".repeat(5 - testimonial.rating)}
                </Box>

                {/* Yorum Metni */}
                <Typography sx={styles.testimonialText}>
                  {testimonial.text}
                </Typography>

                {/* Kullanıcı Bilgileri */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={testimonial.avatar} sx={styles.avatar} />
                  <Box>
                    <Typography sx={styles.name}>
                      {testimonial.name}
                    </Typography>
                    <Typography sx={styles.designation}>
                      {testimonial.designation}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Slider>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default TestimonialSlider;
