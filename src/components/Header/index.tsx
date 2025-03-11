"use client";

import { useState } from "react";
import {
  Stack,
  Badge,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";

import Image from "next/image";
import useScreen from "@/lib/hooks/useScreen";
import { palette } from "@/theme/theme";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslations } from "next-intl";
import Icon from "../common/Icon";
import { usePathname } from "next/navigation";
import { useDrawer } from "@/context/DrawerContext";
import Link from "../common/Link";
import styles from "./styles";
import { useShop } from "@/context/ShopContext";

const navLinks = ["examples", "about-us", "faq", "contact"];

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
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/tr";
  const headerBgColor = isHome ? "transparent" : palette.gradient.g5;
  const isGradient = headerBgColor.includes("gradient");

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
        <Image src="/static/images/logo7.png" alt="Company Logo" {...logoSize} style={styles.logo} />
        </Link>

        {mdDown ? (
          <Stack direction="row" alignItems="center" spacing={1}>
            <Badge badgeContent={cartItems?.length ?? 0} sx={styles.badge}>
            <Link href="/cart" style={{ display: "flex", alignItems: "center" }}>
                <Icon name="shopping_bag" color="white" sx={styles.menuIcon} />
              </Link>
            </Badge>
            <LanguageSwitcher />
            <Icon name="menu" color="white" onClick={() => setMenuOpen(!menuOpen)} />
          </Stack>
        ) : (
          <Stack direction="row" alignItems="center" spacing={4}>
            <Stack direction="row" spacing={3}>
              {navLinks.map((key) => (
                <Link key={key} href={`/${key}`}>
                  <Button sx={styles.button}>{t(key)}</Button>
                </Link>
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Badge badgeContent={cartItems.length} sx={{ cursor: "pointer" }}>
                <Link href="/cart">
                <Icon name="shopping_bag" color="white" sx={{ fontSize: 36 }} />
                </Link>
              </Badge>
              <LanguageSwitcher />
            </Stack>
          </Stack>
        )}
      </Stack>

      {mdDown && (
        <Collapse in={menuOpen} timeout="auto" unmountOnExit>
          <List sx={styles.menuList}>
            {navLinks.map((key) => (
              <Link key={key} href={`/${key}`} passHref style={styles.link} onClick={() => setMenuOpen(false)} >
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
