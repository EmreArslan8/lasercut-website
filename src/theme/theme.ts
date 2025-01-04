import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Ana renk (mavi)
      light: '#63a4ff', // Açık ton
      dark: '#004ba0', // Koyu ton
    },
    secondary: {
      main: '#9c27b0', // İkincil renk (mor)
      light: '#d05ce3',
      dark: '#6a0080',
    },
    success: {
      main: '#2e7d32', // Başarı rengi (yeşil)
    },
    error: {
      main: '#d32f2f', // Hata rengi (kırmızı)
    },
    warning: {
      main: '#ed6c02', // Uyarı rengi (turuncu)
    },
    info: {
      main: '#0288d1', // Bilgi rengi (mavi)
    },
    background: {
      default: '#fafafa', // Genel arka plan
      paper: '#ffffff',   // Kartların arka planı
    },
    text: {
      primary: '#333333', // Ana yazı rengi
      secondary: '#555555', // İkincil yazı rengi
      disabled: '#999999', // Devre dışı yazılar
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.6,
      color: '#333333',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#555555',
    },
    button: {
      textTransform: 'none', // Buton metni küçük harf olur
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Daha modern bir görünüm için
          padding: '0.5rem 1.5rem',
          textTransform: 'none', // Buton metni büyük harf olmaz
        },
        containedPrimary: {
          backgroundColor: '#1976d2',
          color: '#ffffff', // Metin rengi beyaz
          '&:hover': {
            backgroundColor: '#004ba0',
          },
        },
        outlinedPrimary: {
          borderColor: '#1976d2',
          color: '#1976d2',
          '&:hover': {
            backgroundColor: '#f0f7ff',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#333333', // Varsayılan yazı rengi
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px', // Kartlar için yuvarlatılmış köşeler
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default theme;