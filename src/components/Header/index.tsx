"use client";

import { useState } from "react";
import {
  Stack,
  Badge,
  IconButton,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";

import Image from "next/image";
import useScreen from "@/lib/hooks/useScreen";
import  { palette } from "@/theme/theme";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";
import Icon from "../common/Icon";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";


const navLinks = ["examples", "about-us", "faq", "contact"];

const Header = ({ isTransparent = false }: { isTransparent?: boolean }) => {
  const { mdDown, isMobile } = useScreen();
  const { cartItems } = useCart();
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const { setDrawerOpen } = useDrawer();

  const logoSize = {
    width: isMobile ? 120 : 200,
    height: isMobile ? 50 : 100,
  };

  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/tr";
  const headerBgColor = isHome ? "transparent" : palette.gradient.g5;
const isGradient = headerBgColor.includes("gradient");



  return (
    <Stack
  component="header"
  sx={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    px: { xs: 2, md: 8 },
    py: 2,
    ...(isGradient
      ? { backgroundImage: headerBgColor }
      : { backgroundColor: headerBgColor }),
    color: "white",
    boxShadow: isHome ? "none" : "0 2px 10px rgba(0,0,0,0.1)",
  }}
>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        height="90px"
        sx={{
          width: "100%",
          maxWidth: "xl",
          margin: "0 auto",
        }}
      >
   <Link
  href="/"
  passHref
  onClick={() => {
    console.log("🏠 Logo'ya tıklandı ve drawer kapatılıyor!");
    setDrawerOpen(false); // 🔥 burada drawerı kapatıyoruz
  }}
>
  <Image
    src= "/static/images/logo7.png"
    alt="Company Logo"
    {...logoSize}
    style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
  />
</Link>


        {mdDown ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Badge badgeContent={cartItems.length} sx={{ cursor: "pointer" }}>
              <Link href="/cart" style={{ display: "flex", alignItems: "center" }}>
                <Icon name="shopping_bag" color= "white " sx={{ fontSize: 24 }} />
              </Link>
            </Badge>
            <LanguageSwitcher />
            <IconButton onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name="menu" color= "white" />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={4}>
            <Stack direction="row" spacing={3}>
              {navLinks.map((key) => (
                <Link key={key} href={`/${key}`}>
                  <Button
                    sx={{
                      color: "white",
                      textTransform: "none",
                      fontSize: { xs: 16, md: 20 },
                      fontWeight: 500,
                   
                    }}
                  >
                    {t(key)}
                  </Button>
                </Link>
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Badge badgeContent={cartItems.length} sx={{ cursor: "pointer" }}>
                <Link href="/cart">
                  <Icon name="shopping_bag" color= "white" sx={{ fontSize: 36 }} />
                </Link>
              </Badge>
              <LanguageSwitcher />
            </Stack>
          </Stack>
        )}
      </Stack>

      {mdDown && (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <List sx={{ backgroundColor: "#fff" }}>
            {navLinks.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                style={{ textDecoration: "none", display: "block", color: "#000" }}
                onClick={() => setMenuOpen(false)}
              >
                <ListItemButton>
                  <ListItemText primary={t(key)} />
                </ListItemButton>
              </Link>
            ))}
          </List>
        </Collapse>
      )}
    </Stack>
  );
};

export default Header;
