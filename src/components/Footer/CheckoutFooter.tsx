import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CheckoutFooter = () => {
  return (
    <Box
      sx={{
        borderTop: '1px solid #ddd',
        py: 3,
        mt: 'auto', // ✅ Footer'ı sayfanın altına iter
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body1" color="textSecondary">
            © {new Date().getFullYear()} 2dtocut. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography color="textSecondary">Privacy Policy</Typography>
            <Typography color="textSecondary">Terms of Service</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CheckoutFooter;
