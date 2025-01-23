"use client"

import { useState } from "react";
import { Box, IconButton, Badge, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";
import styles from "./styles"; // Stiller buradan alındı
import { useCart } from "@/app/context/CartContext";
import LanguageSwitcher from "../LanguageSwitcher";
import Icon from "../Icon";
import { Link } from "@/i18n/routing"; // Link bileşeni

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header"); // Çeviri fonksiyonu
  const locale = pathname.split("/")[1];
  const { mdDown } = useScreen(); // Ekran genişliği kontrolü
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartItems } = useCart();

  const logoWidth = mdDown ? 100 : 140; // Ekran boyutlarına göre genişlik
  const logoHeight = mdDown ? 50 : 70; // Ekran boyutlarına göre yükseklik

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={styles.header}>
      {/* Logo Section */}
      <IconButton
        onClick={() => router.push(`/${locale}`)}
        sx={styles.logoButton}
      >
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

      {/* Menü */}
      {mdDown ? (
        <>
          <IconButton
            onClick={() => toggleDrawer(true)}
            sx={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
            sx={{ "& .MuiDrawer-paper": styles.drawerPaper }}
          >
            <List>
              {["examples", "about", "faq", "contact"].map((key, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => {
                    toggleDrawer(false);
                    router.push(`/${locale}/${key}`);
                  }}
                >
                  <ListItemText primary={t(key)} /> {/* Çeviri */}
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        /* Desktop Menü */
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
                position: "relative",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderBottom = "2px solid blue")}
              onMouseLeave={(e) => (e.currentTarget.style.borderBottom = "none")}
            >
              {t(key)} {/* Çeviri */}
            </Link>
          ))}
        </Box>
      )}

      {/* Sağ Bölüm */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Sepet */}
        <Badge
          badgeContent={cartItems.length}
          sx={styles.cartBadge}
        >
          <Icon name="shopping_bag" onClick={() => router.push(`/${locale}/cart`)} />
        </Badge>

        {/* Dil Değiştirme */}
        <LanguageSwitcher />
      </Box>
    </Box>
  );
};

export default Header;
