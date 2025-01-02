'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip,
  FormHelperText,
  Box,
  Stack,
  Link,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

// Bayraklı telefon girişi için paket
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

// reCAPTCHA (isteğe bağlı)
// import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  email: string;
  phone: string;
  termsAccepted: boolean;
  marketingAccepted: boolean;
}

interface TeklifFormDialogProps {
  open: boolean;                                 // Dialog açık/kapalı
  onClose: () => void;                           // Dialog'u kapatma fonksiyonu
  formData: FormData;                            // Form verileri
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;  // Form verilerini değiştirme fonksiyonu
  onSubmit: () => void;                          // Form "Teklif Al" butonuna basınca
}


const TeklifFormDialog: React.FC<TeklifFormDialogProps> = ({
  open,
  onClose,
  formData,
  setFormData,
  onSubmit,
}) => {
  // (İsteğe bağlı) reCAPTCHA kontrol state'i
  // const [captchaValue, setCaptchaValue] = React.useState<string | null>(null);
  // const handleCaptchaChange = (value: string | null) => {
  //   setCaptchaValue(value);
  // };

  // 1) Hata mesajları için eklediğimiz state
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // 2) Doğrulama fonksiyonu: Boş veya geçersiz alanları tespit edip errors state’ine kaydeder
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    // Tam Ad kontrolü
    if (!formData.name) {
      newErrors.name = 'Bu alan boş bırakılamaz.';
    }

    // E-posta kontrolü
    if (!formData.email) {
      newErrors.email = 'E-posta adresi zorunludur.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz.';
    }

    // Telefon kontrolü
    if (!formData.phone) {
      newErrors.phone = 'Telefon numarası boş bırakılamaz.';
    }

    // (Opsiyonel) termsAccepted vs. formData’da var ama checkbox yok; isterseniz ekleyebilirsiniz

    setErrors(newErrors);

    // newErrors boşsa her alan geçerlidir
    return Object.keys(newErrors).length === 0;
  };

  // 3) onSubmit yerine, önce validateForm yapıp sonra onSubmit çağırıyoruz
  const handleSubmitWithValidation = () => {
    if (validateForm()) {
      // Eğer doğrulama başarılıysa orijinal onSubmit fonksiyonunu çağır
      onSubmit();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      // Dar ve uzun görünüme ayarlamak için sx ile özel stiller
      sx={{
        '& .MuiDialog-paper': {
          width: '400px',     // Daraltılmış genişlik
          maxWidth: '90vw',   // Mobilde taşmasın
          minHeight: '600px', // Uzun görünüm
          padding: 1
        },
      }}
    >
      <DialogContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Teklif almak için iletişim bilgilerini doldurun
        </Typography>

        <Typography variant="body2" sx={{ color: '#666', marginBottom: '1rem' }}>
          Tüm alanlar zorunludur <b>*</b>
        </Typography>

        {/* FORM ALANLARI */}
        <Stack spacing={3}>
          {/* Tam Ad */}
          <Box>
            <TextField
              label="Tam Ad"
              placeholder="Adınız ve soyadınız"
              fullWidth
              required
              // Orijinal value ve onChange silinmiyor, sadece error + helperText eklendi
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              // Hata durumunda TextField kırmızı çerçeve
              error={!!errors.name}
              // Hata mesajını veya varsayılan helperText'i göster
              helperText={errors.name || 'Boş bırakmayınız'}
            />
          </Box>

          {/* Kurumsal e-mail */}
          <Box>
            <TextField
              label="E-mail"
              placeholder="isim.soyisim@sirketiniz.com"
              fullWidth
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              // Hata durumunda TextField kırmızı çerçeve
              error={!!errors.email}
              // Hata mesajını veya varsayılan helperText'i göster
              helperText={errors.email || 'Lütfen e-posta adresinizi giriniz.'}
            />
          </Box>

          {/* İletişim numarası (bayraklı) */}
          <Box>
            <Typography sx={{ fontWeight: 'bold', mb: 1 }}>
              İletişim numarası <span style={{ color: 'red' }}>*</span>
            </Typography>
            <PhoneInput
              country={'tr'} // Varsayılan ülke bayrağı
              onlyCountries={['tr', 'us', 'de', 'fr', 'gb']}
              // Yukarıdaki diziye istediğiniz ülkeleri ekleyebilirsiniz
              value={formData.phone}
              onChange={(phone: string) => setFormData({ ...formData, phone })}
              inputStyle={{
                width: '100%',
                height: '56px',
                fontSize: '16px',
                // Hata durumunda kırmızı kenarlık
                borderColor: errors.phone ? 'red' : undefined,
              }}
              buttonStyle={{
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
              }}
              placeholder="5xx xxx xx xx"
            />
            {/* Telefon alanı hata mesajı */}
            {errors.phone ? (
              <FormHelperText error>{errors.phone}</FormHelperText>
            ) : (
              <FormHelperText>Geçerli bir numara formatı giriniz.</FormHelperText>
            )}
          </Box>

          {/* Hizmet ve ürün güncellemeleri */}
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.marketingAccepted}
                  onChange={(e) =>
                    setFormData({ ...formData, marketingAccepted: e.target.checked })
                  }
                />
              }
              label="Hizmet ve ürün güncellemelerini, özel teklifleri, indirimleri almak istiyorum."
            />
          </Box>

          {/* (İsteğe bağlı) reCAPTCHA */}
          {/* 
          <Box>
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleCaptchaChange}
            />
          </Box>
          */}
        </Stack>
      </DialogContent>

      {/* DİALOG BUTONLARI */}
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="secondary">
          İptal Et
        </Button>
        <Button
          // 4) onSubmit yerine önce validateForm + orijinal onSubmit
          onClick={handleSubmitWithValidation}
          variant="contained"
          color="primary"
        >
          Teklif Al
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeklifFormDialog;
