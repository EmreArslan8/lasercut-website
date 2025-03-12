import CheckoutFooter from '@/components/Footer/CheckoutFooter';
import CheckoutHeader from '@/components/Header/checkout';
import Box from '@mui/material/Box';


export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <CheckoutHeader />

      {/* Sayfa İçeriği (Flex büyüyerek boşluğu dolduracak) */}
      <Box sx={{ flex: 1 }}>{children}</Box>

      {/* Footer (Her zaman en altta olacak) */}
      <CheckoutFooter />
    </Box>
  );
}
