'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TeklifFormDialog from '../components/OfferPage/Form.tsx/page';

const TeklifForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [openForm, setOpenForm] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    termsAccepted: false,
    marketingAccepted: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleSubmitForm = () => {
    if (!formData.termsAccepted) {
      alert('Hüküm ve Koşulları kabul etmeniz gerekmektedir.');
      return;
    }
    alert(`Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}`);
    setOpenForm(false);
  };

  return (
    <Box
      sx={{
        padding: isMobile ? '2rem' : '3rem',
        background: 'linear-gradient(to bottom, #f0f4f8, #ffffff)',
        minHeight: '100vh',
      }}
    >
      {/* Dosya Yükleme Bölümü */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: '100px',
                height: '100px',
                backgroundColor: '#e3f2fd',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto 1.5rem',
              }}
            >
              <PrecisionManufacturingIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
              Modelinizi Yükleyin
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: '2rem', color: '#666' }}>
              Parçalarınızı yükleyin, anında fiyat teklifi alın ve üretime başlayın.
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                textTransform: 'none',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                borderRadius: '8px',
                background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                '&:hover': { background: 'linear-gradient(to right, #1565c0, #1e88e5)' },
              }}
            >
              Dosyalarınızı Seçin
              <input type="file" multiple hidden onChange={handleFileChange} />
            </Button>
          </Box>
        </Grid>

        {/* Yüklenen Dosyalar */}
        {files.length > 0 && (
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: '1.5rem',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', marginBottom: '1rem', color: '#1976d2' }}
              >
                Yüklenen Dosyalar
              </Typography>
              {files.map((file, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <BuildCircleIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {file.name}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleRemoveFile(index)}>
                    <DeleteIcon sx={{ color: '#d32f2f' }} />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant="contained"
                sx={{
                  textTransform: 'none',
                  padding: '1rem',
                  width: '100%',
                  background: 'linear-gradient(to right, #1976d2, #42a5f5)',
                  '&:hover': { background: 'linear-gradient(to right, #1565c0, #1e88e5)' },
                }}
                onClick={handleOpenForm}
              >
                Teklif Almak İçin Devam Et
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      <TeklifFormDialog
        open={openForm}
        onClose={handleCloseForm}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmitForm}
      />
    </Box>
  );
};

export default TeklifForm;
