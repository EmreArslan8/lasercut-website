'use client';

import { Stack, Typography } from '@mui/material';
import SupportButton from '../SupportButton';
import useStyles from './styles';
import { useTranslations } from 'next-intl';
import useLocale from '@/lib/hooks/useLocale';

const SupportFab = () => {
  const t = useTranslations('common');
  const { locale } = useLocale();
  const styles = useStyles();

  return (
    <Stack sx={styles.container}>
      <SupportButton
        size="small"
        customText={
          <Stack sx={styles.text}>
            <Typography fontSize={12} fontWeight={600} lineHeight="normal">
              {t('contactUs')}
            </Typography>
          </Stack>
        }
      />
    </Stack>
  );
};

export default SupportFab;
