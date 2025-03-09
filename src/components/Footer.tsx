"use client";

import { Link } from "@/i18n/routing";
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, YouTube, Pinterest, WhatsApp, X } from "@mui/icons-material";
import Image from "next/image";
import { palette } from "@/theme/theme";

const Footer = () => {
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
          <Grid item xs={12} md={3}>
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
            <Typography variant="body2">design@2dtocut.com</Typography>
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
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Quick Links
            </Typography>
            {[
              { label: "Homepage", href: "/" },
              { label: "About Us", href: "/about-us" },
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
          <Grid item xs={6} md={3}>
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
          <Grid item xs={12} md={3}>
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
