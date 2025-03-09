"use client";

import { useEffect, useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        bgcolor: "rgba(0, 0, 0, 0.9)",
        color: "#fff",
        p: 2,
        zIndex: 2000,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Typography variant="body2">
          We use cookies to improve your experience. By using our site, you
          agree to our use of cookies.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={acceptCookies}>
            Accept
          </Button>
          <Button variant="outlined" onClick={rejectCookies} sx={{ color: "#fff", borderColor: "#fff" }}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CookieConsent;
