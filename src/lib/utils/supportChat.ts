import { Locale } from '@/i18n';

export const getSupportUrl = (locale: Locale) => {
  switch (locale) {
    case 'tr':
      return 'https://api.whatsapp.com/send/?phone=972526983430&text&type=phone_number&app_absent=0';
    case 'en':
      return 'https://t.me/2dtocut_uz_bot';
    default:
      return null;
  }
};
