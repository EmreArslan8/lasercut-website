'use client';

import Icon from '@/components/Icon';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';
import { Divider, Stack } from '@mui/material';
import RegionSwitcher from '../common/RegionSwitcher';
import useStyles from './styles';

const LocaleSwitcher = () => {
  const styles = useStyles();

  return (
    <Stack component="ul" sx={styles.container}>
      <Icon name="language" fontSize={16} />
      <LanguageSwitcher />
      <Divider flexItem orientation="vertical" sx={styles.divider} />
    </Stack>
  );
};

export default LocaleSwitcher;
