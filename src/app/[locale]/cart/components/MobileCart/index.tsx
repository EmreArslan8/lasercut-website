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

import { useState } from "react";
import styles from "./styles";
import Icon from "@/components/common/Icon";
import { useLocale, useTranslations } from "next-intl";
import { truncateText } from "@/utils/truncateText";
import { calculateTotalPrice } from "@/utils/calculatePrice";
import { supabase } from "@/lib/api/supabaseClient";
import { generateOrderEmail } from "@/utils/emailTemplates";
import { useCart } from "@/context/CartContext";
import { Link } from "@/i18n/routing";

const MobileCart = () => {
  const { cartItems, clearCart, setCartItems } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("CartPage");
  const locale = useLocale();
  const extraServicesMap = t.raw("extraServicesList") as Record<string, string>;
  const materialsMap = t.raw("materialsList") as Record<string, string>;

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

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

    const checkoutData = {
      customerName,
      customerEmail,
      items: selectedCartItems.map((item, index) => ({
        material: item.material,
        thickness: item.thickness,
        quantity: item.quantity,
        price: locale === "en" ? `${item.priceUSD} USD` : `${item.priceTL} TL`,
        fileUrl: uploadedFileUrls[index] || "Dosya Yok",
      })),
    };
  
    console.log("🟢 Checkout’a Gidecek Veriler:", checkoutData);

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
      console.log("🟢 Kullanıcı Checkout sayfasına yönlendirilecek...");

  // ✅ Checkout’a yönlendir
  localStorage.setItem("checkoutData", JSON.stringify(checkoutData)); // Checkout sayfasına veri taşımak için

      
/*
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
      */
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
          <Icon name="add_shopping_cart" fontSize={120} />
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
                border: selectedItems.includes(index)
                  ? "2px solid blue"
                  : "1px solid #ddd",
              }}
            >
            
                <Box sx={styles.itemHeader}>
                  <Typography variant="body1" fontWeight="bold">
                    {truncateText(item.fileName)}
                  </Typography>
                  <Checkbox
                    checked={selectedItems.includes(index)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems((prev) => [...prev, index]);
                      } else {
                        setSelectedItems((prev) =>
                          prev.filter((itemIndex) => itemIndex !== index)
                        );
                      }
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
                  ): (
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
                      <Icon name="image"  />
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
                      onClick={() => handleRemoveItem(index)}
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

                {/* Ürün Fiyatı - Sağ Alt */}
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
        </List>
      )}
      {/* Toplam Sepet Bedeli (Her Zaman Gösterilecek) */}
      {cartItems.length > 0 && (
        <Box sx={{ mt: 3, textAlign: "right" }}>
          <Typography sx={styles.totalPrice}>
            {t("totalAmount")}:{" "}
            {calculateTotalPrice(selectedItems, cartItems, locale)}
          </Typography>
        </Box>
      )}

      {cartItems.length > 0 && (
        <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" color="secondary" onClick={clearCart}>
            {t("clearCart")}
          </Button>
          <Link href= "/checkout">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                  fullWidth

                  disabled={selectedItems.length === 0}
                >
                  {t("placeOrder")}
                </Button>
                </Link>
          <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={styles.modal} >
              <Typography variant="buttonExtraBold"sx={{ display: "block", mb: 1 }} >
                {t("customerDetails")}
              </Typography>
              <Typography variant="bodySmall" sx={{ display: "block", mb: 2, color: "text.secondary" }} >
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

              {/* Buttons to Proceed */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    setModalOpen(false);
                    handleCheckout(); // Proceed without details
                  }}
                >
                  {t("skipAndCheckout")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => {
                    setModalOpen(false);
                    handleCheckout(); // Proceed with details
                  }}
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
