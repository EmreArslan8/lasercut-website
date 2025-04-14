"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useDrawer } from "@/context/DrawerContext";
import useScreen from "@/lib/hooks/useScreen";
import { Link } from "@/i18n/routing";

const CheckoutHeader = () => {
  const { setDrawerOpen } = useDrawer();
  const { isMobile } = useScreen();
  const logoSize = {
    width: isMobile ? 120 : 200,
    height: isMobile ? 50 : 100,
  };
  return (
    <Box sx={{ borderBottom: "1px solid #ddd", py: 2 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/" passHref onClick={() => setDrawerOpen(false)}>
            <Box sx={{ cursor: "pointer" }}>
              <Image
                src="/static/images/logo5.png"
                alt="Company Logo"
                {...logoSize}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Link>
          <Typography variant="subtitle1" color="textSecondary">
            Secure Payment
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutHeader;
