"use client";

import {
  Box,
  IconButton,
  Badge,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import LanguageSwitcher from "../LanguageSwitcher";
import Icon from "../Icon";
import { Link } from "@/i18n/routing"; 
import useScreen from "@/lib/hooks/useScreen";
import styles from "./styles"; 

const Header = () => {
  const t = useTranslations("Header");
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false); 
  const { mdDown, isMobile } = useScreen();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const logoWidth = isMobile ? 100 : 140;
  const logoHeight = isMobile ? 50 : 70;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerTop}>
        <Link href="/">
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
        </Link>
        {mdDown ? (
          <Box sx={styles.mobileActions}>
            <Badge badgeContent={cartItems.length} sx={{ cursor: "pointer" }}>
              <Link
                href="/cart"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="shopping_bag"
                  sx={{
                    fontSize: mdDown ? "24px" : "36px",
                  }}
                />
              </Link>
            </Badge>
            <LanguageSwitcher />
            <IconButton onClick={toggleMenu}>
              <Icon name="menu" />
            </IconButton>
          </Box>
        ) : (
          // Masaüstünde Menü Ortada
          <>
            <Box sx={styles.desktopMenu}>
              {["examples", "about-us", "faq", "contact"].map((key, index) => (
                <Link
                  key={index}
                  href={`/${key}`}
                  style={{
                    fontSize: "18px",
                    fontWeight: 500,
                    color: "black",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderBottom = "2px solid blue")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderBottom = "none")
                  }
                >
                  {t(key)}
                </Link>
              ))}
            </Box>
            <Box sx={styles.desktopActions}>
              {/* Sepet */}
              <Badge badgeContent={cartItems.length} sx={{ cursor: "pointer" }}>
                <Link href="/cart" style={{color: "black"}}>
                <Icon
                  name="shopping_bag"
                  sx={{
                    fontSize: mdDown ? "24px" : "36px", 
                  }}
                />
                </Link>
              </Badge>
        
              <LanguageSwitcher />
            </Box>
          </>
        )}
      </Box>

      {/* Açılır Menü (Mobil İçin) */}
      {mdDown && (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <List sx={styles.mobileMenu}>
            {["examples", "about-us", "faq", "contact"].map((key, index) => (
              <Link
                key={index}
                href={`/${key}`}
                style={{
                  textDecoration: "none",
                  display: "block",
                  color: "#000",
                }}
                onClick={() => setMenuOpen(false)}
              >
                <ListItemButton sx={styles.listItem}>
                  <ListItemText primary={t(key)} sx={styles.listItemText} />
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
