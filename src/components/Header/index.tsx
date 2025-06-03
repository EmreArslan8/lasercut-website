"use client";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import { useDrawer } from "@/context/DrawerContext";
import { useShop } from "@/context/ShopContext";
import useScreen from "@/hooks/useScreen";
import { palette } from "@/theme/theme";
import {
  Badge,
  Button,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { Menu, ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "../common/Link";
import styles from "./styles";

const navLinks = ["examples", "about", "faq", "contact"];

const Header = ({ isTransparent = false }: { isTransparent?: boolean }) => {
  const { mdDown, isMobile } = useScreen();
  const { cartItems } = useShop();
  const t = useTranslations("Header");
  const [menuOpen, setMenuOpen] = useState(false);
  const { setDrawerOpen } = useDrawer();

  const logoSize = {
    width: isMobile ? 120 : 200,
    height: isMobile ? 50 : 100,
  };

  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/tr";
  const headerBgColor = isHome ? "transparent" : palette.gradient.g5;
  const isGradient = headerBgColor.includes("gradient");
  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1];
  const isCart = last === "cart";
  const isCheckout = last === "checkout";
  const isCartOrCheckout = isCart || isCheckout;

  // 🟡 CART VE CHECKOUT SAYFALARINDA FARKLI HEADER
  if (isCartOrCheckout) {
    return (
      <Stack
        component="header"
        sx={{
          ...styles.header,
          backgroundColor: "#fff",
          boxShadow: 1,
          minHeight: 80,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={styles.headerContainer}
        >
          <Link href="/" passHref>
            <Image
              src="/static/images/logo5.png"
              alt="Company Logo"
              {...logoSize}
              priority
              loading="eager"
              style={styles.logo}
            />
          </Link>
          <span style={{ fontWeight: 500, color: "#444", fontSize: 20 }}>
            {isCart
              ? t("cartPageTitle") || "Sepetim"
              : t("checkoutPageTitle") || "Güvenli Ödeme"}
          </span>
        </Stack>
      </Stack>
    );
  }
  return (
    <Stack
      component="header"
      sx={{
        ...styles.header,
        ...(isGradient
          ? { backgroundImage: headerBgColor }
          : { backgroundColor: headerBgColor }),
      }}
    >
      <Stack direction="row" sx={styles.headerContainer}>
        <Link href="/" passHref onClick={() => setDrawerOpen(false)}>
          <Image
            src="/static/images/logo7.png"
            alt="Company Logo"
            {...logoSize}
            priority
            loading="eager"
            style={styles.logo}
          />
        </Link>

        {mdDown ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Badge
              badgeContent={cartItems?.length ?? 0}
              color="primary"
              sx={styles.badge}
            >
              <Link
                href="cart"
                style={{ display: "flex", alignItems: "center" }}
              >
                <ShoppingBag color="white" size={24} />
              </Link>
            </Badge>
            <LocaleSwitcher />
            <IconButton
              size="small"
              sx={{ padding: 0, minWidth: "auto" }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu color="white" size={24} />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={4}>
            <Stack direction="row" spacing={3}>
              {navLinks.map((key) => (
                <Link key={key} href={`${key}`}>
                  <Button sx={styles.button}>{t(key)}</Button>
                </Link>
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Badge
                badgeContent={cartItems.length}
                color="primary"
                sx={{
                  cursor: "pointer",
                }}
              >
                <Link href="cart">
                  <ShoppingBag color="white" size={36} />
                </Link>
              </Badge>
              <LocaleSwitcher />
            </Stack>
          </Stack>
        )}
      </Stack>

      {mdDown && (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <List sx={styles.menuList}>
            {navLinks.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                passHref
                style={styles.link}
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
