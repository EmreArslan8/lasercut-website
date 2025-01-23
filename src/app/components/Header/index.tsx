"use client";

import {
  Box,
  IconButton,
  Badge,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import LanguageSwitcher from "../LanguageSwitcher";
import Icon from "../Icon";
import { Link } from "@/i18n/routing"; // i18n routing'den Link bileşeni
import useScreen from "@/lib/hooks/useScreen";
import theme from "@/theme/theme";
import { fontSize } from "@mui/system";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const { cartItems } = useCart();
  const locale = useLocale(); // Locale bilgisi
  const [menuOpen, setMenuOpen] = useState(false); // Menü durumunu kontrol etmek için
  const { mdDown, isMobile } = useScreen();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const logoWidth = isMobile ? 100 : 140;
  const logoHeight = isMobile ? 50 : 70;

  return (
    <Box sx={{ position: "relative", zIndex: 1000, backgroundColor: "#fff" }}>
      {/* Header Üst Bölüm */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid #ddd",
          height: "70px",
        }}
      >
        {/* Logo */}
        <IconButton onClick={() => router.push("/")}>
          <Image
            src="/static/images/logo.png"
            alt="Company Logo"
            width={logoWidth}
            height={logoHeight}
            style={{
              objectFit: "contain",
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </IconButton>

        {/* Menü, Cart ve Dil Değiştirici */}
        {mdDown ? (
          // Mobilde Menü: Hamburger
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Sepet */}
            <Badge badgeContent={cartItems.length} sx={{ cursor: "pointer" }}>
              <Link
                href="/cart"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.grey[700],
                }}
              >
                <Icon
                  name="shopping_bag"
                  sx={{
                    fontSize: mdDown ? "24px" : "36px", // Mobilde 24px, masaüstünde 36px
                  }}
                />
              </Link>
            </Badge>

            {/* Dil Değiştirici */}
            <LanguageSwitcher />

            {/* Hamburger Menü */}
            <IconButton onClick={toggleMenu}>
              <Icon name="menu" />
            </IconButton>
          </Box>
        ) : (
          // Masaüstünde Menü Ortada
          <>
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)", // Ortalamak için
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {["examples", "about-us", "faq", "contact"].map((key, index) => (
                <Link
                  key={index}
                  href={`/${key}`}
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "black",
                    textDecoration: "none",
                    position: "relative",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderBottom = "2px solid blue")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderBottom = "none")
                  }
                >
                  {t(key)} {/* Çeviri */}
                </Link>
              ))}
            </Box>

            {/* Sağ Bölüm: Sepet ve Dil Değiştirici */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginLeft: "auto", // Sağ tarafa hizalamak için
              }}
            >
              {/* Sepet */}
              <Badge badgeContent={cartItems.length} sx={{ cursor: "pointer" }}>
                <Icon
                  name="shopping_bag"
                  onClick={() => router.push(`/${locale}/cart`)}
                />
              </Badge>

              {/* Dil Değiştirici */}
              <LanguageSwitcher />
            </Box>
          </>
        )}
      </Box>

      {/* Açılır Menü (Mobil İçin) */}
      {mdDown && (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <List
            sx={{
              backgroundColor: "#f9f9f9",
              padding: "16px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {["examples", "about-us", "faq", "contact"].map((key, index) => (
              <Link
                key={index}
                href={`/${key}`} // i18n routing link
                style={{
                  textDecoration: "none",
                  display: "block",
                  color: "#000", // Metin rengini siyah (#000) yapar
                }}
                onClick={() => setMenuOpen(false)} // Menü kapansın
              >
                <ListItemButton
                  sx={{
                    padding: "12px 16px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <ListItemText
                    primary={t(key)}
                    sx={{ color: "#333", fontSize: "16px" }} // Burada metin rengi özelleştirildi
                  />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

export default Header;
