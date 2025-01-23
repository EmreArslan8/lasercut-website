'use client';

import theme from '@/theme/theme';
import { Box, Typography, TextField, Button, Grid2 } from '@mui/material';

const ContactSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.contrastText,
    
        py: 6,
        px: { xs: 2, md: 6 },
        borderRadius: '8px',
        textAlign: 'center',
        width: '100%',
        mx: 'auto',
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Şimdi formu doldurun, sizi arayalım!
      </Typography>
     

      <Grid2 container spacing={3} sx={{ maxWidth: '900px', mx: 'auto' }}>
        <Grid2 size= {{xs: 12, sm: 6}}>
          <TextField fullWidth label="Adınız" variant="outlined" required />
        </Grid2>
        <Grid2 size= {{xs: 12, sm: 6}}>
          <TextField fullWidth label="Soyadınız" variant="outlined" required />
        </Grid2>
        <Grid2 size= {{xs: 12, sm: 6}}>
          <TextField fullWidth label="Telefon Numaranız" variant="outlined" required />
        </Grid2>
        <Grid2 size= {{xs: 12, sm: 6}}>
          <TextField fullWidth label="E-posta Adresiniz" variant="outlined" required />
        </Grid2>
       
        <Grid2 size={{xs:12}}>
          <TextField
            fullWidth
            label="Mesajınız"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Belirlemek veya sormak istediğiniz bir şey varsa, buraya yazabilirsiniz."
          />
        </Grid2>
      
        <Grid2 size= {{xs:12}}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              width: '100%',
              py: 1.5,
            }}
          >
            Gönder
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ContactSection;
