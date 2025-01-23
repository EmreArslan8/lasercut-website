"use client";

import { useState } from "react";
import { Box, Menu, MenuItem, IconButton, Typography, ListItemIcon } from "@mui/material";
import { useRouter } from "next/navigation";
import Icon from "./Icon";
import Image from "next/image";

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const locale = typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "en"; // Mevcut dil
  const languages = [
    { code: "en", label: "English", flag: "https://flagcdn.com/w320/us.png" },
    { code: "tr", label: "Türkçe", flag: "https://flagcdn.com/w320/tr.png" },
  ];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLocaleChange = (newLocale: string) => {
    const currentPath = window.location.pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(currentPath); // Yeni dile yönlendirme
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        onClick={handleMenuOpen}
        sx={{
          borderRadius: "50px",
          padding: "8px 16px",
          backgroundColor: "grey.100",
          display: "flex",
          alignItems: "center",
          gap: 1,
          "&:hover": {
            backgroundColor: "grey.300",
          },
        }}
      >
      <Icon name="language" />
        <Typography sx={{ fontWeight: 500, fontSize: "14px" }}>
          {locale.toUpperCase()} {/* Dil kodu */}
        </Typography>
        <Icon name= "keyboard_arrow_down" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 1 }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLocaleChange(lang.code)}
            selected={locale === lang.code}
          >
            <ListItemIcon>
              <Image
                src={lang.flag}
                alt={lang.label}
                width={20} // Sabit genişlik
                height={15} // Sabit yükseklik
                style={{ objectFit: "cover" }}
              />
            </ListItemIcon>
            <Typography variant="body1">{lang.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
