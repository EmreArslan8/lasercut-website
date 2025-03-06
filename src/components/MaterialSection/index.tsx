import { Box, Button, Grid, Grid2, Stack, Typography } from "@mui/material";
import { CheckCircle } from "lucide-react";

const materials = ["Mild Steel", "Aluminum", "Stainless Steel"];

export default function LaserCuttingSection() {
  return (
    <Box
      maxWidth="lg"
      mx="auto"
      py={{ xs: 6, md: 10 }}
      px={{ xs: 2, md: 4 }}
    >
      <Grid2 container spacing={4} alignItems="center">
        
        {/* Video */}
        <Grid2 size={{xs: 12,  md: 6}}>
          <Box
            component="video"
            src="https://cdn.shopify.com/videos/c/o/v/658e2511bd5447d993fe3505c670fa24.mp4"
            autoPlay
            loop
            muted
            playsInline
            sx={{
              width: "100%",
              height: { xs: 300, md: 400 },
              objectFit: "cover",
            }}
          />
        </Grid2>

        {/* Text Content */}
        <Grid2 size={{xs: 12,  md: 6}}>
        <Stack spacing={3} pl={{ md: 4 }} pt={{ xs: 4, md: 0 }}>
            
            <Typography variant="h3" color="primary.main" fontWeight={700}>
              LASER CUTTING
            </Typography>

            <Typography variant="h2" fontWeight={800}>
              What materials can we cut with laser cutting?
            </Typography>

            <Typography color="text.secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </Typography>

            <Grid container spacing={2}>
              {materials.map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckCircle size={20} color="#F97316" />
                    <Typography variant="body2">{item}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              sx={{
                bgcolor: "primary",
                width: "fit-content",
                px: 4,
                borderRadius: 0
               
              }}
            >
              Contact Us
            </Button>

          </Stack>
        </Grid2>

      </Grid2>
    </Box>
  );
}
