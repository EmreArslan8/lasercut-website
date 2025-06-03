"use client";

import { Link } from "@/i18n/routing";
import { palette } from "@/theme/theme";
import { Facebook, WhatsApp, X, YouTube } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/tr";
  const headerBgColor = isHome ? "transparent" : palette.gradient.g5;
  const isGradient = headerBgColor.includes("gradient");
  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  const isCart = last === "cart";
  const isCheckout = last === "checkout";
  const isCartOrCheckout = isCart || isCheckout;

  // Minimal footer: sadece logo ve copyright
  if (isCartOrCheckout) {
    return (
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          py: 3,
          mt: "auto", // ✅ Footer'ı sayfanın altına iter
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body1" color="textSecondary">
              © {new Date().getFullYear()} 2dtocut. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography color="textSecondary">Privacy Policy</Typography>
              <Typography color="textSecondary">Terms of Service</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }

  // Zengin footer: klasik hali
  return (
    <Box
      component="footer"
      sx={{
        backgroundImage: palette.gradient.g5,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Logo ve iletişim bilgileri */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Image
                src="/static/images/logo7.png"
                alt="Company Logo"
                width={200}
                height={50}
                style={{
                  objectFit: "contain",
                  width: "100%",
                  maxWidth: "200px",
                  height: "auto",
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Copyright® 2025.
            </Typography>
            <Typography variant="body2">design@drawtocut.com</Typography>
            <Typography variant="body2">+90 505 520 75 11</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "#fff" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <X />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <YouTube />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Links
            </Typography>
            {[
              { label: "Homepage", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Faq", href: "/faq" },
              { label: "Our Projects", href: "/examples" },
              { label: "Contact Us", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{
                  display: "block",
                  marginBottom: "8px",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            ))}
          </Grid>

          {/* Featured Services */}
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Featured Service
            </Typography>
            {[
              "Precision Laser Cutting",
              "CNC Machining",
              "Metal Fabrication",
              "Industrial Prototyping",
              "Custom Metal Works",
            ].map((item) => (
              <Typography key={item} variant="body2" sx={{ mb: 1 }}>
                {item}
              </Typography>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Subscribe Our Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Get Our Latest Update & New Offers Sales Discount
            </Typography>
            <Box sx={{ display: "flex", mb: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Email"
                size="small"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "20px",
                  flex: 1,
                  mr: 1,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#2979ff",
                  px: 3,
                  borderRadius: "20px",
                  textTransform: "none",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
