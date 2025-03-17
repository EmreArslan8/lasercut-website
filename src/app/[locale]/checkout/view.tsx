"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
import { useShop } from "@/context/ShopContext";

const CheckoutPageView = () => {
  const t = useTranslations("CheckoutPage");
  const router = useRouter();
  const locale = useLocale();
  const { getSelectedItems, setCartItems, fetchCartFromAPI } = useShop();

  // İlk render için, context'teki seçili ürünleri optimistik UI olarak kullanıyoruz.
  const [checkoutData, setCheckoutData] = useState<any[]>(getSelectedItems());
  const [checkoutId, setCheckoutId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // İlk olarak context'ten veriyi kullanıyoruz (optimistik UI)
    const contextItems = getSelectedItems();
    if (contextItems && contextItems.length > 0) {
      setCheckoutData(contextItems);
    } else {
      // Eğer context boşsa, localStorage'den veriyi oku
      const storedItems = localStorage.getItem("selectedCartItems");
      if (storedItems) {
        setCheckoutData(JSON.parse(storedItems));
      }
    }

    // Checkout ID'yi localStorage'den alıyoruz.
    const storedCheckoutId = localStorage.getItem("checkoutId");
    if (!storedCheckoutId) {
      console.error("Checkout ID bulunamadı, sepete yönlendiriliyor...");
      router.push("/cart");
      setLoading(false);
      return;
    }
    setCheckoutId(storedCheckoutId);

    // API'den güncel veriyi çekmek için context'teki fetchCartFromAPI fonksiyonunu çağırıyoruz.
    // Bu fonksiyon, verileri API'den çekip context'i ve localStorage'i güncelliyor.
    const cartSessId = localStorage.getItem("cart_sess_id");
    if (cartSessId) {
      fetchCartFromAPI(cartSessId)
        .then(() => {
          // API çağrısından sonra context'teki güncel verileri tekrar alıyoruz.
          const updatedItems = getSelectedItems();
          setCheckoutData(updatedItems);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API hatası:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [getSelectedItems, fetchCartFromAPI, setCartItems, router]);

  // Basit kullanıcı bilgileri validasyonu
  const isFormValid = customerName && customerEmail && address && city && postalCode;

  const handleCheckout = () => {
    if (!isFormValid) return;
    if (paymentMethod === "bank_transfer") {
      setModalOpen(true);
      return;
    }
    console.log("Sipariş tamamlandı.");
    localStorage.removeItem("checkoutId");
    router.push(`/${locale}/payment`);
  };

  if (loading) {
    return <p>{t("loadingMessage")}</p>;
  }


  return (
    <Stack sx={{ py: 5, px: { xs: 2, md: 6 }, maxWidth: "1000px", margin: "auto" }}>
      <Grid container spacing={3}>
        {/* Sol Taraf - Müşteri Bilgileri & Ödeme */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h6">{t("contact")}</Typography>
            <TextField
              fullWidth
              label={t("emailOrPhone")}
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              sx={{ mt: 1 }}
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">{t("payment")}</Typography>
            <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <FormControlLabel value="credit_card" control={<Radio />} label={t("creditCard")} />
              <FormControlLabel value="bank_transfer" control={<Radio />} label={t("bankTransfer")} />
            </RadioGroup>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">{t("billingAddress")}</Typography>
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
            <Typography variant="h6">{t("orderSummary")}</Typography>
            {checkoutData.length === 0 ? (
              <Typography color="error">{t("emptyCart")}</Typography>
            ) : (
              checkoutData.map((item, index) => (
                <Stack key={index} direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Typography>
                    {item.material} - {item.thickness}mm - {item.quantity} {t("quantity")}
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                  {parseFloat(item.priceUSD || "0").toFixed(2)} USD
                  </Typography>
                </Stack>
              ))
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ textAlign: "right", fontWeight: "bold" }}>
            {`${t("total")}: ${checkoutData.reduce((sum, item) => sum + parseFloat(item.priceUSD || "0") * item.quantity, 0).toFixed(2)} USD`}
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
