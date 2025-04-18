'use client';

import Icon from '@/components/Icon';
import Button from '@/components/common/Button';
import ModalCard from '@/components/common/ModalCard';
import { Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const ClearCartPageView = () => {
  const t = useTranslations('shop');
  const [modalOpen, setModalOpen] = useState(false);

  const clearCartData = () => {
    localStorage.setItem('cart', '[]');
    localStorage.setItem('unavailableItems', '[]');
    window.location.href = '/';
  };
  return (
    <Stack alignItems="center" justifyContent="center" gap={2}>
      <Icon name="warning" color="error" fontSize={80} />
      <Typography variant="h2" mb={2}>
        {t('cart.page.clearModal.body')}
      </Typography>
      <Button color="error" variant="tonal" onClick={() => setModalOpen(true)}>
        {t('cart.page.clearModal.confirm')}
      </Button>
      <ModalCard
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        showCloseIcon
        title={t('cart.page.clearModal.body')}
        iconName="warning"
        iconProps={{ color: 'error' }}
      >
        <Stack direction="row" gap={2} width="100%">
          <Button color="neutral" variant="tonal" onClick={() => setModalOpen(false)}>
            {t('cart.page.clearModal.cancel')}
          </Button>
          <Button color="error" variant="contained" onClick={clearCartData}>
            {t('cart.page.clearModal.confirm')}
          </Button>
        </Stack>
      </ModalCard>
    </Stack>
  );
};

export default ClearCartPageView;
