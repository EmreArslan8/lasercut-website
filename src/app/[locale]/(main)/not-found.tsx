"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import Link from "@/components/common/Link";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        px: { xs: 3, md: 12 },
        py: { xs: 8, md: 12 },
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "72px", md: "140px" },
            fontWeight: "bold",
            mb: 2,
            lineHeight: 1,
            color: "primary.main",
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 600,
          }}
        >
          Something Went{" "}
          <Box component="span" sx={{ color: "warning.main" }}>
            Wrong
          </Box>{" "}
          – Page{" "}
          <Box component="span" sx={{ color: "warning.main" }}>
            Not Found
          </Box>
        </Typography>
        <Typography sx={{ maxWidth: 500, mb: 4, color: "text.secondary" }}>
          Sorry, the page you are looking for doesn&apos;t exist, has been moved, or
          is temporarily unavailable. Please return to the homepage.
        </Typography>
        <Link href="/">
          <Button variant="outlined" size="large">
            Back to Home
          </Button>
        </Link>
      </Container>
    </Box>
  );
}
