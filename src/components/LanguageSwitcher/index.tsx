
import { Locale } from '@/i18n';
import useLocale from '@/lib/hooks/useLocale';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import styles from './styles';

const flagCodes = { uz: 'UZ', ru: 'RU', he: 'IL', en: '', tr: 'TR' };

const LanguageSwitcher = () => {
  const t = useTranslations('common');
  const { locale, changeLanguage } = useLocale();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (locale: Locale) => {
    changeLanguage(locale);
    handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleOpen} sx={styles.button}>
        <div style={{ fontSize: 14 }}>
         
        </div>
        {t('label')}
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
       
      </Menu>
    </>
  );
};

export default LanguageSwitcher;
