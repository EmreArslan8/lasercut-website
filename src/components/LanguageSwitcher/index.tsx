"use client";

import { useState } from "react";
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useScreen from "@/lib/hooks/useScreen";
import { useLocale } from "next-intl";
import styles from "./styles";
import { ChevronDown, Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { mdDown } = useScreen(); // Mobil kontrolü

  const locale = useLocale();

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
    const currentPath = window.location.pathname.replace(
      `/${locale}`,
      `/${newLocale}`
    );
    router.push(currentPath);
    setAnchorEl(null);
  };

  return (
    <Box>
      {/* 🔹 Mobilde yalnızca IconButton */}
      {mdDown ? (
        <IconButton onClick={handleMenuOpen} sx={styles.mobileButton}>
        <Globe color="white" />
        </IconButton>
      ) : (

        <Box onClick={handleMenuOpen} sx={styles.desktopButton}>
          <Globe color="black"/>
          <Typography sx={styles.languageText}>
            {locale.toUpperCase()}
          </Typography>
          <ChevronDown color="black" />
        </Box>
      )}

      {/* 🔽 Dil seçme menüsü (Mobil ve Masaüstü için aynı) */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ mt: 1 }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLocaleChange(lang.code)}
          >
            <ListItemIcon>
              <Image
                src={lang.flag}
                alt={lang.label}
                width={20}
                height={15}
                style={{ objectFit: "cover", borderRadius: "2px" }} 
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
