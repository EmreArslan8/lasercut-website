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
} from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import styles from "./styles";
import theme from "@/theme/theme";
import { useLocale, useTranslations } from "next-intl";
import { supabase } from "@/lib/api/supabaseClient";
import { calculateTotalPrice } from "@/utils/calculatePrice";
import { generateOrderEmail } from "@/utils/emailTemplates";
import Icon from "@/components/common/Icon";
import { useRouter } from "next/navigation";
import TermsModal from "@/components/TermsModal";
import { useShop } from "@/context/ShopContext";
import { ShoppingCart } from "lucide-react";

const DesktopCart = () => {
  const {
    cartItems,
    setCartItems,
    selectedItems,
    toggleSelectItem,
    toggleSelectAll,
    getSelectedItems,
    proceedToCheckout,
  } = useShop();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
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

  const handleCloseModal = () => setModalOpen(false);

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    try {
      if (!customerName.trim()) {
        setNameError(true);
        return;
      }
      if (!customerEmail.trim()) {
        setEmailError(true);
        return;
      }

      const selectedCartItems = getSelectedItems();
      if (selectedCartItems.length === 0) {
        console.error("❌ Hiç ürün seçilmedi!");
        return;
      }

      console.log("🟢 Sipariş işlemi başladı...");
      console.log("📩 Müşteri Adı:", customerName);
      console.log("📩 Müşteri E-Posta:", customerEmail);
      console.log("🟢 Seçilen Ürünler:", selectedCartItems);

      // Seçili ürünleri checkout için kaydet
      proceedToCheckout();

      // 🟡 Dosya yükleme işlemi
      const uploadedFileUrls = await Promise.all(
        selectedCartItems.map(async (item) => {
          if (!item.file) return null; // ✅ Eğer file yoksa direkt null dön

          // ✅ `file` varsa, güvenli şekilde `file.name` kullan
          const fileName = item.file?.name
            ? item.file.name.replace(/\s+/g, "_").toLowerCase()
            : `file_${Date.now()}`;

          const filePath = `orders/${Date.now()}_${fileName}`;
          const { error } = await supabase.storage
            .from("uploaded-files")
            .upload(filePath, item.file);

          if (error) {
            console.error("❌ Dosya yükleme hatası:", error.message);
            throw new Error(error.message);
          }

          const { data } = supabase.storage
            .from("uploaded-files")
            .getPublicUrl(filePath);
          console.log(`🟢 Dosya yüklendi: ${data.publicUrl}`);

          return data.publicUrl;
        })
      );

      console.log("🟢 Yüklenen Dosyalar:", uploadedFileUrls);

  
      const productDetails = {
        name: customerName,
        email: customerEmail,
        items: selectedCartItems.map((item, index) => ({
          material: item.material,
          thickness: item.thickness,
          quantity: item.quantity,
          price:
            locale === "en" ? `${item.priceUSD} USD` : `${item.priceTL} TL`,
          fileUrl: uploadedFileUrls[index] || "Dosya Yok",
        })),
      };

      console.log("🟢 Ürün Detayları:", productDetails);

      // **1️⃣ Slack'e Bildirim Gönder**
      console.log("🟡 Slack'e gönderiliyor...");
      await fetch("/api/send-slack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productDetails),
      })
        .then((res) => res.json())
        .then((data) => console.log("🟢 Slack yanıtı:", data))
        .catch((error) => console.error("❌ Slack gönderme hatası:", error));

      /*
  
      const emailContent = generateOrderEmail({
        customerName,
        customerEmail,
        items: selectedCartItems.map((item, index) => ({
          fileName: item.fileName,
          material: item.material,
          thickness: Number(item.thickness),
          quantity: item.quantity,
          price: locale === "en" ? `$${item.priceUSD} USD` : `${item.priceTL} TL`,
          fileUrl: uploadedFileUrls[index] || undefined,
        })),
      });
  
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailContent),
      });
  */
      console.log("🟢 Kullanıcı Checkout sayfasına yönlendiriliyor...");
      router.push(`/${locale}/checkout`);
    } catch (error) {
      console.error("❌ Hata oluştu:", error);
    }
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
          {/*  drawer açma butonu
         <Button variant="contained" color="primary" onClick={openDrawer} size="medium">
              Add Parts
            </Button>
             */}
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
                        checked={selectedItems.includes(index)} // ✅ Yalnızca bu ürün seçili mi?
                        onChange={() => toggleSelectItem(index)} // ✅ Seçme fonksiyonunu çağır
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
                          {item.fileName.length > 25
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
                            {/* Replace "none" with the appropriate translation key */}
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
                              <Icon name="info" fontSize={16} color="gray" />
                            </Box>
                          </Tooltip>
                        </Typography>
                      </Box>
                      <Icon
                        name="delete"
                        onClick={() => handleRemoveItem(index)}
                        sx={styles.deleteIcon}
                      />
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
                    setNameError(false); // Kullanıcı giriş yaptığında hata sıfırlanır
                  }}
                  error={nameError} // Eğer boşsa kırmızı border
                  helperText={nameError ? "Full Name is required" : ""} // Uyarı mesajı
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  value={customerEmail}
                  onChange={(e) => {
                    setCustomerEmail(e.target.value);
                    setEmailError(false);
                  }}
                  error={emailError}
                  helperText={emailError ? "Email Address is required" : ""}
                  sx={{ mb: 2 }}
                />
                {/* Total Price */}
                <Typography sx={styles.totalPrice}>
                  {t("totalAmount")}:{" "}
                  {calculateTotalPrice(selectedItems, cartItems, locale)}
                </Typography>
                {/* Terms & Conditions */}
                <Stack direction="row" alignItems="center" sx={styles.terms}>
                  <Checkbox color="primary" />

                  <Typography
                    variant="bodySmall"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => setTermsOpen(true)} // ✅ Tıklandığında modal aç
                  >
                    {t("policyText")}
                  </Typography>

                  <TermsModal
                    open={isTermsOpen}
                    onClose={() => setTermsOpen(false)}
                  />
                </Stack>
                {/* Place Order Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                  disabled={
                    selectedItems.length === 0 ||
                    !customerName.trim() ||
                    !customerEmail.trim()
                  }
                >
                  {t("placeOrder")}
                </Button>
                ;
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
