'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Hata mesajı için state
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Hata mesajını temizle
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin'); // Başarılı girişte admin sayfasına yönlendir
    } catch (error: any) {
      setError('Giriş başarısız: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          width: '100%',
          textAlign: 'center',
          borderRadius: '16px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            color: 'linear-gradient(to right, #1976d2, #42a5f5)',
            background: 'linear-gradient(to right, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Giriş Yap
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: '1rem' }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            marginBottom: '1rem',
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <TextField
          label="Şifre"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            marginBottom: '1.5rem',
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            padding: '0.8rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: '12px',
            background: 'linear-gradient(to right, #1976d2, #42a5f5)',
            '&:hover': {
              background: 'linear-gradient(to right, #1565c0, #1e88e5)',
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
        </Button>
        <Typography
          variant="body2"
          sx={{ marginTop: '1rem', color: '#666' }}
        >
          Henüz bir hesabınız yok mu?{' '}
          <a
            href="/register"
            style={{
              color: '#1976d2',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Kayıt Ol
          </a>
        </Typography>
      </Paper>
    </Container>
  );
};

export default LoginPage;
