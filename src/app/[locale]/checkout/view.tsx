"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useShop } from "@/context/ShopContext"; // ✅ ShopContext'ten veriyi al
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Paper,
  Typography,
  Divider,
  Stack,
  Modal,
} from "@mui/material";

const CheckoutPageView = () => {
  const t = useTranslations("CheckoutPage");
  const { checkoutItems, clearCheckout } = useShop(); // ✅ Checkout ürünlerini çek


  // Müşteri bilgileri için state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Eğer checkoutItems boşsa, kullanıcıyı sepete yönlendir
 

  const isFormValid = customerName && customerEmail && address && city && postalCode;

  const handleCheckout = () => {
    if (!isFormValid) return;

    if (paymentMethod === "bank_transfer") {
      setOrderPlaced(true);
      setModalOpen(true);
    }

    // ✅ Sipariş tamamlandığında checkout temizleniyor
    clearCheckout();
  };

  return (
    <Stack sx={{ py: 5, px: { xs: 2, md: 6 }, maxWidth: "1000px", margin: "auto" }}>
      <Grid container spacing={3}>
        {/* Sol Taraf - Müşteri Bilgileri & Ödeme */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>{t("contact")}</Typography>
            <TextField
              fullWidth
              label={t("emailOrPhone")}
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              sx={{ mt: 1 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>{t("payment")}</Typography>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <FormControlLabel value="credit_card" control={<Radio />} label={t("creditCard")} />
              <FormControlLabel value="bank_transfer" control={<Radio />} label={t("bankTransfer")} />
            </RadioGroup>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>{t("billingAddress")}</Typography>
            <TextField
              fullWidth
              label={t("fullName")}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              sx={{ mt: 1 }}
            />
            <TextField
              fullWidth
              label={t("address")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ mt: 1 }}
            />
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={t("city")}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label={t("postalCode")}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Sağ Taraf - Sipariş Özeti */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6" gutterBottom>{t("orderSummary")}</Typography>
            {checkoutItems.map((item, index) => (
              <Stack key={index} direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography>{item.material} - {item.thickness}mm - {item.quantity} {t("quantity")}</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  {parseFloat(item.priceUSD || "0").toFixed(2)} USD
                </Typography>
              </Stack>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ textAlign: "right", fontWeight: "bold" }}>
              {`${t("total")}: ${checkoutItems.reduce((sum, item) => sum + parseFloat(item.priceUSD || "0") * item.quantity, 0).toFixed(2)} USD`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleCheckout}
              disabled={!isFormValid}
            >
              {t("completeOrder")}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* ✅ EFT Sipariş Onay Modalı */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            {t("orderReceived")}
          </Typography>
          <Typography variant="body1">{t("orderConfirmationMessage")}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={() => setModalOpen(false)}>
            {t("close")}
          </Button>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default CheckoutPageView;
