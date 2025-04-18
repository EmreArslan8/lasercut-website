'use client';

import useLocale from '@/lib/hooks/useLocale';
import { getSupportUrl } from '@/lib/utils/supportChat';
import { useTranslations } from 'next-intl';
import Icon from '../Icon';
import Button from '../common/Button';

const SupportButton = (props: any) => {
  const t = useTranslations('common');
  const { locale } = useLocale();
  return (
    <Button
      variant="outlined"
      startIcon={<Icon name="support_agent" />}
      href={getSupportUrl(locale)}
      target="_blank"
      {...props}
    >
      {t('contactSupport')}
    </Button>
  );
};

export default SupportButton;
