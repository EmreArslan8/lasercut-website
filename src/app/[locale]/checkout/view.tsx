"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
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
  Skeleton,
} from "@mui/material";

interface CheckoutItem {
  material: string;
  thickness: number;
  quantity: number;
  price: string | number;
}

interface CheckoutData {
  customerName: string;
  customerEmail: string;
  items: CheckoutItem[];
}

const CheckoutPageView = () => {
  const t = useTranslations("CheckoutPage");
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = localStorage.getItem("checkoutData");
      if (data) {
        const parsedData = JSON.parse(data);
        setCheckoutData(parsedData);
        setCustomerName(parsedData.customerName || "");
        setCustomerEmail(parsedData.customerEmail || "");
      }
      setLoading(false);
    }, 6000);
  }, []);

  const isFormValid = customerName && customerEmail && address && city && postalCode;

  const handleCheckout = () => {
    if (!isFormValid) return;

    if (paymentMethod === "bank_transfer") {
      setOrderPlaced(true);
      setModalOpen(true);
    }
  };

  return (
    <Stack sx={{ py: 20, px: { xs: 2, md: 6 }, maxWidth: "1000px", margin: "auto" }}>
      <Grid container spacing={3}>
        {/* Sol Taraf - Müşteri Bilgileri & Ödeme */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>{t("contact")}</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
            ) : (
              <TextField fullWidth label={t("emailOrPhone")} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} sx={{ mt: 1 }} />
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>{t("payment")}</Typography>
            {loading ? (
              <Skeleton variant="rectangular" height={80} sx={{ mb: 2 }} />
            ) : (
              <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <FormControlLabel value="credit_card" control={<Radio />} label={t("creditCard")} />
                <FormControlLabel value="bank_transfer" control={<Radio />} label={t("bankTransfer")} />
              </RadioGroup>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>{t("billingAddress")}</Typography>
            {loading ? (
              <>
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />
              </>
            ) : (
              <>
                <TextField fullWidth label={t("fullName")} value={customerName} onChange={(e) => setCustomerName(e.target.value)} sx={{ mt: 1 }} />
                <TextField fullWidth label={t("address")} value={address} onChange={(e) => setAddress(e.target.value)} sx={{ mt: 1 }} />
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <TextField fullWidth label={t("city")} value={city} onChange={(e) => setCity(e.target.value)} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label={t("postalCode")} value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Grid>

        {/* Sağ Taraf - Sipariş Özeti */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3, backgroundColor: "#f9f9f9" }}>
            <Typography variant="h6" gutterBottom>{t("orderSummary")}</Typography>
            {loading ? (
              <>
                <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" height={30} sx={{ mb: 1 }} />
              </>
            ) : (
              checkoutData?.items.map((item, index) => (
                <Stack key={index} direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Typography>{item.material} - {item.thickness}mm - {item.quantity}    {t("quantity")}</Typography>
                  <Typography sx={{ fontWeight: "bold" }}>{parseFloat(item.price as string).toFixed(2)} USD</Typography>
                </Stack>
              ))
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ textAlign: "right", fontWeight: "bold" }}>
              {loading ? <Skeleton variant="text" height={30} width="50%" /> : `${t("total")}: ${checkoutData?.items.reduce((sum, item) => sum + parseFloat(item.price as string) * item.quantity, 0).toFixed(2)} USD`}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              onClick={handleCheckout}
              disabled={!isFormValid || loading}
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
