"use client";

import { useState } from "react";
import {
  List,
  ListItem,
  Typography,
  Box,
  Button,
  Modal,
  Checkbox,
  Stack,
  Divider,
  Grid2,
  TextField,
  IconButton,
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
import { useCart } from "@/context/CartContext";

const DesktopCart = () => {
  const { cartItems, setCartItems } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const t = useTranslations("CartPage");
  const locale = useLocale();
  const extraServicesMap = t.raw("extraServicesList") as Record<string, string>;
  const materialsMap = t.raw("materialsList") as Record<string, string>;


  const handleCloseModal = () => setModalOpen(false);

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems: any[]) => prevItems.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {

    console.log("🟢 Sipariş işlemi başladı...");
    console.log("📩 Müşteri Adı:", customerName);
    console.log("📩 Müşteri E-Posta:", customerEmail);

    const selectedCartItems = selectedItems.map((index) => cartItems[index]);

    console.log("🟢 Seçilen Ürünler:", selectedCartItems);

    const uploadedFileUrls = await Promise.all(
      selectedCartItems.map(async (item) => {
        if (!item.file) return null;
        const filePath = `orders/${Date.now()}_${item.file.name
          .replace(/\s+/g, "_")
          .toLowerCase()}`;
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

    const lineItems = selectedCartItems.map((item) => ({
      title: item.fileName || "Unnamed Product",
      quantity: item.quantity,
      price: item.priceUSD || "0.00",
      properties: [
        { name: "Material", value: item.material },
        { name: "Thickness", value: item.thickness },
      ],
    }));

    const productDetails = {
      name: customerName,
      email: customerEmail,
      items: selectedCartItems.map((item, index) => ({
        material: item.material,
        thickness: item.thickness,
        quantity: item.quantity,
        price: locale === "en" ? `${item.priceUSD} USD` : `${item.priceTL} TL`,
        fileUrl: uploadedFileUrls[index] || "Dosya Yok", // Dosya URL'sini ekledik
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
      .then((data) => {
        console.log("🟢 Slack yanıtı:", data);
      })
      .catch((error) => {
        console.error("❌ Slack gönderme hatası:", error);
      });

      const emailContent = generateOrderEmail({
        customerName,
        customerEmail,
        items: selectedCartItems.map((item, index) => ({
          fileName: item.fileName,
          material: item.material,
          thickness: Number(item.thickness), // ✅ Burada sayı formatına çevirdik
          quantity: item.quantity,
          price:
            locale === "en"
              ? `$${item.priceUSD} USD`
              : `${item.priceTL} TL`,
          fileUrl: uploadedFileUrls[index] || undefined, // null yerine undefined verelim
        })),
      });
      
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailContent),
      });
      

    console.log("🟡 Shopify sipariş taslağı oluşturuluyor...");
    const response = await fetch("/api/shopify/createDraftOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lineItems,
        userData: {
          name: customerName,
          email: customerEmail,
          fileUrl: uploadedFileUrls[0] || "",
          productDetails: JSON.stringify(productDetails),
        },
      }),
    });

    if (!response.ok) {
      console.error("❌ Shopify sipariş hatası:", await response.text());
    } else {
      const data = await response.json();
      console.log("🟢 Shopify siparişi başarıyla oluşturuldu.");
      window.location.href = data.draft_order.invoice_url;
    }
  };

  return (
    <Stack sx={styles.cartContainer}>
      {cartItems.length === 0 ? (
        <Stack spacing={5} sx={styles.emptyCart}>
          <AddShoppingCart sx={styles.emptyIcon} />
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
                        checked={selectedItems.includes(index)}
                        onChange={(e) => {
                          setSelectedItems((prev) =>
                            e.target.checked
                              ? [...prev, index]
                              : prev.filter((i) => i !== index)
                          );
                        }}
                        sx={styles.checkbox}
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
                  onChange={(e) => setCustomerName(e.target.value)}
                  sx={{ mb: 2 }}
                />

                {/* Email Input */}
                <TextField
                  fullWidth
                  label="Email Address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
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
                  <Typography variant="bodySmall">{t("policyText")}</Typography>
                </Stack>

                {/* Place Order Button */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                  fullWidth
                  sx={styles.checkoutButton}
                  disabled={selectedItems.length === 0}
                >
                  {t("placeOrder")}
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
