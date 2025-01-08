"use client";

import { useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, Select, FormControl } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";
// Kendi useScreen hook'unuzu buradan import edin.

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const locale = pathname.split("/")[1];
  const { isMobile } = useScreen(); // useScreen hook'unu çağırıyoruz
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLocaleChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPathname);
    setAnchorEl(null); // Menü kapansın
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
        maxWidth: "1536px",
        margin: "0 auto",
        gap: "16px",
      }}
    >
      {/* Logo */}
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
          alt={t('logoAlt')}
          width={120}
          height={60}
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            height: 'auto',
            width: 'auto',
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
          color="secondary"
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
