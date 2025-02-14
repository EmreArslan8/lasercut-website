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
} from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import OrderSuccessFeedback from "@/app/components/OrderSuccessFeedback";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import Icon from "@/app/components/Icon";
import { useHandleFormSubmit } from "@/utils/handleFormSubmit";
import ModalForm from "@/app/components/Form";
import styles from "./styles";
import theme from "@/theme/theme";
import { useLocale, useTranslations } from "next-intl";

const DesktopCart = () => {
  const { cartItems, setCartItems } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const t = useTranslations("CartPage");
  const locale = useLocale();
  const extraServicesMap = t.raw("extraServicesList") as Record<string, string>;
  const materialsMap = t.raw("materialsList") as Record<string, string>;

  const { handleFormSubmit, isSubmitting } = useHandleFormSubmit(
    selectedItems,
    setSuccessOpen
  );

  const handleCloseModal = () => setModalOpen(false);

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const [loading, ] = useState(false);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/shopify/createDraftOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: '1737042130779_CORPO_QUADRADO',
          quantity: 1,
          price: 1.29,
          customDetails: {
            Material: 'Aluminum',
            Thickness: '1.5 mm',
            'Extra Services': 'None',
          },
        }),
      });
  
      const data = await response.json();
      console.log('Frontend - API Response:', data);
  
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Frontend - Ödeme URL alınamadı:', data);
      }
    } catch (error) {
      console.error('Frontend - Sipariş oluştururken hata oluştu:', error);
    }
  };
  

  return (
    <Stack sx={styles.cartContainer}>
      {cartItems.length === 0 ? (
        <Stack spacing={5} sx={styles.emptyCart}>
          <AddShoppingCart sx={styles.emptyIcon} />
          <Typography variant="h5">{t("cartInfo")}</Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" color="primary" href="/" size="medium">
              {t("button")}
            </Button>

            {/*  drawer açma butonu
         <Button variant="contained" color="primary" onClick={openDrawer} size="medium">
              Add Parts
            </Button>
             */}
          </Stack>
        </Stack>
      ) : (
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 8 }} sx={styles.cartItemsSection}>
            <Typography variant="h5" fontWeight="bold" sx={{ ml: 7 }}>
              {t("cartTitle1")}
            </Typography>
            <Box sx={{ overflowX: "auto", width: "100%" }}>
              <List sx={{ mt: 2, border: "none", p: 0 }}>
                {cartItems.map((item, index) => (
                  <Box key={index}>
                    <ListItem sx={styles.cartItem}>
                      {/* Checkbox */}
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

                      {/* Ürün Bilgileri */}
                      <Box sx={styles.itemDetails}>
                        <Typography variant="h6" fontWeight="bold">
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
                            {item.extraServices
                              .map(
                                (serviceKey) =>
                                  extraServicesMap[serviceKey] || serviceKey
                              ) // Çeviri varsa al, yoksa orijinal key göster
                              .join(", ")}
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

                        <Typography variant="h6">
                          {t("itemPrice")}:
                          {locale === "en"
                            ? typeof item.priceUSD === "string" &&
                              isNaN(Number(item.priceUSD))
                              ? item.priceUSD
                              : `$${(
                                  Number(item.priceUSD) * item.quantity
                                ).toFixed(2)} USD`
                            : typeof item.priceTL === "string" &&
                              isNaN(Number(item.priceTL))
                            ? item.priceTL
                            : `${(Number(item.priceTL) * item.quantity).toFixed(
                                2
                              )} TL`}
                        </Typography>
                      </Box>

                      {/* Silme Butonu */}
                      <Icon
                        name="delete"
                        onClick={() => handleRemoveItem(index)}
                        sx={styles.deleteIcon}
                      />
                    </ListItem>

                    {/* Ürünler arası çizgi */}
                    {index < cartItems.length - 1 && (
                      <Divider sx={styles.divider} />
                    )}
                  </Box>
                ))}
              </List>

              <Divider sx={styles.divider} />
            </Box>
          </Grid2>

         {/* Sipariş Özeti (Her Zaman Gösterilecek) */}
{cartItems.length > 0 && (
  <Grid2 size={{ xs: 12, md: 4 }} sx={{ bgcolor: theme.palette.grey[100] }}>
    <Box sx={styles.summaryBox}>
      <Typography sx={styles.summaryText}>
        {t("total")}: {cartItems.length} {t("cartTitle2")}
      </Typography>

      {/* ✅ Toplam Fiyat Hesaplama (Sadece Seçili Ürünler) */}
      <Typography sx={styles.totalPrice}>
      {t("totalAmount")}:
        {selectedItems.length > 0
          ? locale === "en"
            ? `$${selectedItems
                .reduce(
                  (sum, index) =>
                    sum +
                    (Number(cartItems[index]?.priceUSD) || 0) *
                      cartItems[index]?.quantity,
                  0
                )
                .toFixed(2)} USD`
            : `${selectedItems
                .reduce(
                  (sum, index) =>
                    sum +
                    (Number(cartItems[index]?.priceTL) || 0) *
                      cartItems[index]?.quantity,
                  0
                )
                .toFixed(2)} TL`
          : ""}
      </Typography>

      <Stack direction="row" alignItems="center" sx={styles.terms}>
        <Checkbox color="primary" />
        <Typography sx={styles.termsText}>{t("policyText")}</Typography>
      </Stack>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        fullWidth
        sx={styles.checkoutButton}
        disabled={selectedItems.length === 0}
      >
        {t("placeOrder")} {loading ? 'Yükleniyor...' : 'Sepete Ekle & Ödeme Yap'}
      </Button>
    </Box>
  </Grid2>
)}

        </Grid2>
      )}

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
    </Stack>
  );
};

export default DesktopCart;
