'use client';

import { useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, Select, FormControl, Badge } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";
import Icon from "./Icon";
import { useCart } from "../context/CartContext";
import theme from "@/theme/theme";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const locale = pathname.split("/")[1];
  const { isMobile, isTablet } = useScreen();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { cartItems } = useCart(); 


  const logoWidth = isMobile ? 100 : isTablet ? 140 : 250; // Ekran boyutlarına göre genişlik
  const logoHeight = isMobile ? 50 : isTablet ? 70 : 90; //

  const handleLocaleChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        maxWidth: "xl",
        margin: "0 auto",
        gap: "16px",
        pr: 1
      }}
    >
      <IconButton
        onClick={() => router.push(`/${locale}`)}
        sx={{
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
  <Image
      src="/static/images/logo.png"
      alt="Company Logo"
      width={logoWidth} // Dinamik genişlik
      height={logoHeight} // Dinamik yükseklik
      style={{
        objectFit: "contain",
        maxWidth: "100%",
        height: "auto",
      }}
    />
      </IconButton>

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
        
          sx={{
            "& .MuiBadge-badge": {
              fontSize: "14px",
              fontWeight: "bold",
              color: theme.palette.primary.dark
            },
          }}
        >
        <Icon name= "shopping_bag"  onClick={() => router.push(`/${locale}/cart`)} fontSize={32}/>
        </Badge>

        {/* Dil Değiştirme */}
        {isMobile ? (
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              backgroundColor: "grey.100",
              "&:hover": {
                backgroundColor: "grey.300",
              },
            }}
          >
            <LanguageIcon />
          </IconButton>
        ) : (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              labelId="locale-select-label"
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
            >
              <MenuItem value="tr">Türkçe</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
        )}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ marginTop: "8px" }}
        >
          <MenuItem
            onClick={() => handleLocaleChange("tr")}
            selected={locale === "tr"}
          >
            Türkçe
          </MenuItem>
          <MenuItem
            onClick={() => handleLocaleChange("en")}
            selected={locale === "en"}
          >
            English
          </MenuItem>
        </Menu>

        {/* Admin Paneli Butonu */}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => router.push(`/login`)}
          sx={{
            fontSize: "13px",
            textTransform: "none",
            padding: "6px 12px",
          }}
        >
          {t("adminPanelButton")}
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
