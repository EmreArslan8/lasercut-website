"use client";

import { useState } from "react";
import {
  List,
  ListItem,
  Typography,
  Box,
  Button,
  Checkbox,
  Stack,
  Divider,
  Grid2,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import styles from "./styles";
import theme from "@/theme/theme";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { Info, ShoppingCart, Trash2} from "lucide-react";
import { CartItem } from "@/lib/api/types";
import { generateOrderEmail } from "@/lib/utils/emailTemplates";
import TermsModal from "@/components/TermsModal";
import { calculateTotalPrice } from "@/lib/utils/calculatePrice";

const DesktopCart = () => {
  const {
    cartItems,
    selectedItems,
    toggleSelectItem,
    getSelectedItems,
    proceedToCheckout,
    removeFromCart,
  } = useShop();

  const [isLoading, setIsLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const t = useTranslations("CartPage");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const locale = useLocale();
  const extraServicesMap = t.raw("extraServicesList") as Record<string, string>;
  const materialsMap = t.raw("materialsList") as Record<string, string>;
  const router = useRouter();
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const isProductsSelected = getSelectedItems().length > 0;

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleCheckout = async () => {
    console.log("🟢 handleCheckout TETİKLENDİ");

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

      console.log("Seçili Ürünler:", selectedCartItems);

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

      localStorage.setItem("checkoutId", newCheckoutId);
      console.log("🔍 Seçili Ürünler:", selectedCartItems);
      console.log("🔍 Checkout ID:", newCheckoutId);

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

    console.log(selectedCartItems);

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

    console.log("📦 Cart Items:", cartItems);

    console.log("📧 E-Posta gönderiliyor...");
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailContent),
    });
  };

  return (
    <Stack sx={styles.cartContainer}>
      {cartItems.length === 0 ? (
        <Stack spacing={5} sx={styles.emptyCart}>
          <ShoppingCart size={200} />
          <Typography variant="h5">{t("cartInfo")}</Typography>
          <Button variant="outlined" color="primary" href="/" size="medium">
            {t("button")}
          </Button>
        </Stack>
      ) : (
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 8 }} sx={styles.cartItemsSection}>
            <Typography variant="h3" sx={styles.cartTitle}>
              {t("cartTitle1")}
            </Typography>
            <Box sx={styles.cartBox}>
              <List sx={styles.list}>
                {cartItems.map((item, index) => (
                  <Box key={index}>
                    <ListItem sx={styles.cartItem}>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onChange={() => {
                          console.log("seçili ürün:", item);
                          toggleSelectItem(item.id);
                        }}
                      />

                      {item.svg && (
                        <Box sx={styles.svgContainer}>
                          <Box
                            dangerouslySetInnerHTML={{ __html: item.svg }}
                            sx={styles.svg}
                          />
                        </Box>
                      )}

                      <Box sx={styles.itemDetails}>
                        <Typography variant="h4">
                          {item.fileName && item.fileName.length > 25
                            ? `${item.fileName.substring(0, 25)}...`
                            : item.fileName}
                        </Typography>

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
                            {item.extraServices && item.extraServices.length > 0
                              ? item.extraServices
                                  .map(
                                    (serviceKey) =>
                                      extraServicesMap[serviceKey] || serviceKey
                                  )
                                  .join(", ")
                              : t("none")}{" "}
                          </Typography>
                        )}
                        {item.coating && (
                          <Typography sx={styles.textSecondary}>
                            {t("coating")}: {item.coating}
                          </Typography>
                        )}
                        <Typography sx={styles.textSecondary}>
                          {t("quantity")}: {item.quantity}
                        </Typography>

                        <Typography
                          variant="buttonExtraBold"
                          sx={styles.itemPrice}
                        >
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
                            <Info size={16} color="gray" />
                            </Box>
                          </Tooltip>
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        sx={styles.deleteIcon}
                      >
                        <Trash2 />
                      </IconButton>
                    </ListItem>
                    {index < cartItems.length - 1 && (
                      <Divider sx={styles.divider} />
                    )}
                  </Box>
                ))}
              </List>
              <Divider sx={styles.divider} />
            </Box>
          </Grid2>
          {cartItems.length > 0 && (
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{ bgcolor: theme.palette.grey[100] }}
            >
              <Box sx={styles.summaryBox}>
                <Typography sx={styles.summaryText}>
                  {t("total")}: {cartItems.length} {t("cartTitle2")}
                </Typography>
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
                  sx={{ my: 1 }}
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
                  sx={{ my: 1 }}
                />

                {/* Total Price */}
                <Typography sx={styles.totalPrice}>
                  {t("totalAmount")}:{" "}
                  {calculateTotalPrice(selectedItems, cartItems, locale)}
                </Typography>
                {/* Terms & Conditions */}
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
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={!isProductsSelected || !acceptedTerms}
                >
                  {t("placeOrder")}
                </Button>

                <Typography align="center" sx={{ mt: 1, color: "gray" }}>
                  {t("backHomeText")}
                </Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={() => router.push("/")}
                >
                  {t("button")}
                </Button>
              </Box>
            </Grid2>
          )}
        </Grid2>
      )}

      {/* 
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <ModalForm
            onClose={handleCloseModal}
            onSubmit={handleFormSubmit}
            disabled={isSubmitting}
            loading={isSubmitting}
          />
        </Modal>
      )}
      {isSuccessOpen && (
        <OrderSuccessFeedback
          open={isSuccessOpen}
          onClose={() => setSuccessOpen(false)}
        />
      )}
         */}
    </Stack>
  );
};

export default DesktopCart;
