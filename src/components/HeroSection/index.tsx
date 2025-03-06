import Image from "next/image";
import { Box, Button, Typography, Stack } from "@mui/material";
import { palette } from "@/theme/theme";

const FeatureSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
     py: 8,
      bgcolor: "#f5f5f5"
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: "lg",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 3,
        }}
      >
        {/* Görsel */}
        <Box
          sx={{
            flex: 1,
            my: 4,
            ml:4,
            pr: 14,
            position: "relative",
            minHeight: { xs: 250, md: 400 },
          }}
        >
          <Image
            src="/static/images/section.webp"
            alt="technical parts"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        {/* İçerik */}
        <Box
          sx={{
            flex: 1,
            bgcolor: palette.customPrimary[600],
            color: "white",
            p: { xs: 4, md: 6 },
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Typography variant="caption" fontWeight="bold">
              for engineers
            </Typography>
            <Typography variant="h2" fontWeight="bold">
              Create technical parts
            </Typography>
            <Typography variant="body">
              Create custom mounting plates, mechanisms, housings, gaskets,
              jigs, molds, inlays, spacers, etc. Start with a prototype and
              scale up to your liking
            </Typography>
            <Typography variant="body1" fontWeight={800}>
          get an online offer now
            </Typography>
            <Typography variant="body2">
              You design it, 2dtocut makes it.
            </Typography>

            <Button
              variant="contained"
              sx={{
                mt: 10,
                bgcolor: "white",
                color: "black",
                fontWeight: "bold",
                px: 3,
                py: 1.5,
                borderRadius: 20,
                textTransform: "none",
                width: "fit-content",
                "&:hover": {
                  bgcolor: "#f0f0f0",
                },
              }}
            >
            uplaod file
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default FeatureSection;
