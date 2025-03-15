"use client";

import {
  List,
  Typography,
  Box,
  Button,
  Checkbox,
  Stack,
  Card,
  Tooltip,
  Modal,
  TextField,
  CircularProgress,
} from "@mui/material";

import { useEffect, useState } from "react";
import styles from "./styles";
import Icon from "@/components/common/Icon";
import { useLocale, useTranslations } from "next-intl";
import { truncateText } from "@/utils/truncateText";
import { calculateTotalPrice } from "@/utils/calculatePrice";
import { generateOrderEmail } from "@/utils/emailTemplates";
import { CartItem, useShop } from "@/context/ShopContext";
import { useRouter } from "next/navigation";
import TermsModal from "@/components/TermsModal";
import { ShoppingCart } from "lucide-react";

const MobileCart = () => {
  const {
    cartItems,
    setCartItems,
    selectedItems,
    toggleSelectItem,
    getSelectedItems,
    proceedToCheckout,
    removeFromCart,
    fetchCartFromAPI,
  } = useShop();
  const [isModalOpen, setModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("CartPage");
  const locale = useLocale();
  const extraServicesMap = t.raw("extraServicesList") as Record<string, string>;
  const materialsMap = t.raw("materialsList") as Record<string, string>;
  const router = useRouter();
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const isProductsSelected = getSelectedItems().length > 0;

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsLoading(false);
    } else {
      // Eğer context boşsa, localStorage'den veriyi okuyabilirsiniz.
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }
  }, [cartItems, setCartItems]);

  useEffect(() => {
    const cartSessId = localStorage.getItem("cart_sess_id");
    if (cartSessId) {
      fetchCartFromAPI(cartSessId).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [fetchCartFromAPI]);


  const handleQuantityChange = (
    index: number,
    type: "increase" | "decrease"
  ) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    console.log("🟢 handleCheckout TETİKLENDİ");

    if (isLoading) return;
    setIsLoading(true);

    try {
      if (!validateCustomerInfo()) {
        setIsLoading(false);
        return;
      }

      const selectedCartItems = getSelectedItems();
      if (selectedCartItems.length === 0) {
        console.error("❌ Hiç ürün seçilmedi!");
        return;
      }

      console.log("🟢 Seçili ürünler LocalStorage'a kaydediliyor...");
      localStorage.setItem(
        "selectedCartItems",
        JSON.stringify(selectedCartItems)
      );

      console.log("🟢 Sipariş işlemi başladı...");
      const newCheckoutId = await proceedToCheckout();
      if (!newCheckoutId) {
        console.error("❌ Checkout ID alınamadı!");
        return;
      }

      // Yeni ID'yi sakla
      localStorage.setItem("checkoutId", newCheckoutId);

      await sendSlackNotification(selectedCartItems);
      await sendEmailNotification(selectedCartItems);
      console.log("🟢 Kullanıcı Checkout sayfasına yönlendiriliyor...");
      router.push(`/${locale}/checkout`);
    } catch (error) {
      console.error("❌ Hata oluştu:", error);
    }
  };

  const validateCustomerInfo = (): boolean => {
    let valid = true;
    console.log("Validating customer info...");
    if (!customerName.trim()) {
      setNameError(true);
      console.log("Validation failed: Customer Name is empty");
      valid = false;
    }
    if (!customerEmail.trim() || !validateEmailFormat(customerEmail)) {
      setEmailError(true);
      console.log("Validation failed: Customer Email is empty or invalid");
      valid = false;
    }
    if (!acceptedTerms) {
      console.log("Validation failed: Terms not accepted");
      valid = false;
    }
    console.log("Validation result:", valid);
    return valid;
  };

  const sendSlackNotification = async (selectedCartItems: CartItem[]) => {
    const productDetails = {
      name: customerName,
      email: customerEmail,
      items: selectedCartItems.map((item) => ({
        material: item.material,
        thickness: item.thickness,
        quantity: item.quantity,
        price: locale === "en" ? `${item.priceUSD} USD` : `${item.priceTL} TL`,
        fileUrl: item.fileUrl || "Dosya Yok", // ✅ `fileUrl` artık cartItems içinde var!
      })),
    };

    console.log("🟡 Slack'e gönderiliyor...");
    await fetch("/api/send-slack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productDetails),
    });
  };

  const sendEmailNotification = async (selectedCartItems: CartItem[]) => {
    const emailContent = generateOrderEmail({
      customerName,
      customerEmail,
      items: selectedCartItems.map((item) => ({
        fileName: item.fileName,
        material: item.material,
        thickness: Number(item.thickness),
        quantity: item.quantity,
        price: locale === "en" ? `$${item.priceUSD} USD` : `${item.priceTL} TL`,
        fileUrl: item.fileUrl || undefined, // ✅ `fileUrl` artık cartItems içinde var!
      })),
    });

    console.log("📧 E-Posta gönderiliyor...");
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailContent),
    });
  };

  return (
    <Stack sx={styles.cartContainer}>
      {isLoading && (
        <Box sx={styles.loading}>
          <CircularProgress size={60} color="primary" />
        </Box>
      )}

      <Typography variant="h2" gutterBottom>
        {t("cartTitle1")} ({cartItems.length} {t("cartTitle2")})
      </Typography>
      {cartItems.length > 1 && (
        <Typography variant="body">{t("selectProducts")}</Typography>
      )}
      {cartItems.length === 0 ? (
        <Stack sx={styles.emptyCart}>
          <ShoppingCart size={100} />
          <Typography variant="h6">{t("cartInfo")}</Typography>
          <Button variant="contained" color="primary" href="/" size="medium">
            {t("button")}
          </Button>
        </Stack>
      ) : (
        <List sx={{ mt: 2 }}>
          {cartItems.map((item, index) => {
            return (
              <Card
                key={index}
                sx={{
                  ...styles.cartCard,
                  border: selectedItems.includes(item.id)
                    ? "2px solid blue"
                    : "1px solid #ddd",
                }}
              >
                <Box sx={styles.itemHeader}>
                  <Typography variant="body1" fontWeight="bold">
                    {truncateText(item.fileName)}
                  </Typography>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => {
                      console.log("Tıklanan ID:", item.id);
                      toggleSelectItem(item.id);
                    }}
                  />
                </Box>

                <Box sx={styles.productLayout}>
                  {item.svg ? (
                    <Box
                      sx={{
                        width: "100%",
                        aspectRatio:
                          item.dimensions?.width && item.dimensions?.height
                            ? `${item.dimensions.width} / ${item.dimensions.height}`
                            : "1 / 1",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        minWidth: 100,
                        maxWidth: "80%",
                      }}
                    >
                      <Box
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                        sx={styles.svg}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100px",
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "8px",
                      }}
                    >
                      <Icon name="image" />
                    </Box>
                  )}

                  <Box sx={styles.quantityContainer}>
                    <Box sx={styles.quantityBox}>
                      <Icon
                        name="remove"
                        onClick={() => handleQuantityChange(index, "decrease")}
                      />
                      <Typography variant="h3">{item.quantity}</Typography>
                      <Icon
                        name="add"
                        onClick={() => handleQuantityChange(index, "increase")}
                      />
                    </Box>
                    <Box
                      sx={styles.deleteButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Icon
                        name="delete"
                        sx={{ color: "error", fontSize: 16 }}
                      />
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="error"
                      >
                        {t("removeButton")}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={styles.materialInfoBox}>
                  <Typography sx={styles.textSecondary}>
                    {t("material")}:{" "}
                    {materialsMap[item.material] || item.material}
                  </Typography>
                  <Typography sx={styles.textSecondary}>
                    {t("thickness")}: {item.thickness} mm
                  </Typography>

                  {item.extraServices && (
                    <Typography sx={styles.textSecondary}>
                      {t("extraServices")}:{" "}
                      {item.extraServices
                        .map(
                          (serviceKey) =>
                            extraServicesMap[serviceKey] || serviceKey
                        ) // Çeviri varsa al, yoksa orijinal key göster
                        .join(", ")}
                    </Typography>
                  )}
                  {item.coating && (
                    <Typography fontSize={14}>
                      {t("coating")} : {item.coating}
                    </Typography>
                  )}
                </Box>

                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Box>
                    <Typography variant="buttonExtraBold" sx={styles.itemPrice}>
                      {t("itemPrice")}:
                      {locale === "en"
                        ? `$${(
                            (Number(item.priceUSD) || 0) * item.quantity
                          ).toFixed(2)} USD`
                        : `${(
                            (Number(item.priceTL) || 0) * item.quantity
                          ).toFixed(2)} TL`}
                      <Tooltip title={t("itemPriceInfo")} arrow>
                        <Box sx={styles.itemPrice}>
                          <Icon name="info" fontSize={12} color="gray" />
                        </Box>
                      </Tooltip>
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            );
          })}
            <Stack spacing={1} sx={{ p: 1 }}>
                  <Stack direction="row" alignItems="center">
                    <Checkbox
                      color="primary"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      sx={{ ml: -2 }}
                    />
                    <Typography
                      variant="bodySmall"
                      sx={{ textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => setTermsOpen(true)}
                    >
                      {t("policyText")}
                    </Typography>
                    <TermsModal
                      open={isTermsOpen}
                      onClose={() => setTermsOpen(false)}
                    />
                  </Stack>
                  {!acceptedTerms && (
                    <Typography variant="caption" color="error">
                      {t("fillRequiredFields")}
                    </Typography>
                  )}
                </Stack>
        </List>
      )}
      {/* Toplam Sepet Bedeli (Her Zaman Gösterilecek) */}
      {cartItems.length > 0 && (
        <Box sx={{ mt: 3, textAlign: "left" }}>
          <Typography sx={styles.totalPrice}>
            {t("totalAmount")}:{" "}
            {calculateTotalPrice(selectedItems, cartItems, locale)}
          </Typography>
        </Box>
      )}

      {cartItems.length > 0 && (
        <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
          {/*  <Button variant="contained" color="secondary" onClick={clearCart}>
            {t("clearCart")}
          </Button> */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setModalOpen(true)}
            disabled={!isProductsSelected || !acceptedTerms}
          >
            {t("placeOrder")}
          </Button>

          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={styles.modal}>
              <Typography
                variant="buttonExtraBold"
                sx={{ display: "block", mb: 1 }}
              >
                {t("customerDetails")}
              </Typography>
              <Typography
                variant="bodySmall"
                sx={{ display: "block", mb: 2, color: "text.secondary" }}
              >
                {t("supportInfo")}
              </Typography>

              {/* İsim Alanı */}
              <TextField
                fullWidth
                label="Full Name"
                value={customerName}
                onChange={(e) => {
                  setCustomerName(e.target.value);
                  setNameError(false);
                }}
                onBlur={() => {
                  if (!customerName.trim()) {
                    setNameError(true);
                  }
                }}
                error={nameError}
                helperText={nameError ? t("fullNameError") : ""}
                sx={{ my: 2 }}
              />

              <TextField
                fullWidth
                label="Email Address"
                value={customerEmail}
                onChange={(e) => {
                  setCustomerEmail(e.target.value);
                  setEmailError(false);
                }}
                onBlur={() => {
                  if (!customerEmail.trim()) {
                    setEmailError(true);
                  }
                }}
                error={emailError}
                helperText={emailError ? t("emailError") : ""}
                sx={{ my: 2 }}
              />

              {/* Buttons to Proceed */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                {/*     <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  disabled={!customerName.trim() || !customerEmail.trim()}
                  onClick={() => {
                    setModalOpen(false);
                    handleCheckout(); // Proceed without details
                  }}
                >
                  {t("skipAndCheckout")}
                </Button>
                */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                >
                  {t("continueWithInfo")}
                </Button>
              </Stack>
            </Box>
          </Modal>
        </Stack>
      )}
    </Stack>
  );
};

export default MobileCart;
