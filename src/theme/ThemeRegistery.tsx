'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import theme from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </>
  );
}