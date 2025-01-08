'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/api/supabaseClient';
import {
  Box,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();
    const isAdmin = userData?.user?.user_metadata?.is_admin;

    if (isAdmin) {
      document.cookie = 'is_admin=true; path=/; max-age=3600'; // 1 saatlik geçerli
      router.push('/admin');
    } else {
      setError('Yetkiniz yok! Lütfen ana sayfaya dönün.');
      await supabase.auth.signOut();
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '16px',
        position: 'relative',
      }}
    >
      {/* Başlık */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%', // Yukarı taşıma için top değeri
          textAlign: 'center',
          transform: 'translateY(-50%)', // Daha hassas yukarı taşıma
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Admin Paneline Hoş Geldiniz
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', marginTop: '8px' }}>
          Eğer yetkili değilseniz lütfen <b>ana sayfaya dönünüz</b>.
        </Typography>
      </Box>

      {/* Giriş Formu */}
      <Paper
        elevation={6}
        sx={{
          maxWidth: '400px',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#444',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Giriş Yap
        </Typography>
        {error && (
          <Alert severity="error" sx={{ marginBottom: '16px' }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          label="Şifre"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '24px' }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          disabled={loading}
          sx={{
            padding: '12px',
            fontWeight: 'bold',
            borderRadius: '8px',
            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
            '&:hover': {
              background: 'linear-gradient(90deg, #4b0fb4, #1f5fd9)',
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Giriş Yap'}
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push('/')}
          fullWidth
          sx={{
            marginTop: '16px',
            padding: '10px',
            fontWeight: 'bold',
            borderRadius: '8px',
            color: '#444',
            borderColor: '#bbb',
            '&:hover': {
              borderColor: '#999',
              background: '#f7f7f7',
            },
          }}
        >
          Ana Sayfaya Dön
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginPage;
