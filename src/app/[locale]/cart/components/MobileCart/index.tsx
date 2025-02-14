"use client";

import {
  List,
  Typography,
  Box,
  Button,
  Checkbox,
  Stack,
  Card,
  Modal,
} from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import OrderSuccessFeedback from "@/app/components/OrderSuccessFeedback";
import ModalForm from "@/app/components/Form";
import { useHandleFormSubmit } from "@/utils/handleFormSubmit";
import styles from "./styles";
import Icon from "@/app/components/Icon";
import { useLocale, useTranslations } from "next-intl";
import { truncateText } from "@/utils/truncateText";

const MobileCart = () => {
  const { cartItems, clearCart, setCartItems } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { handleFormSubmit, isSubmitting } = useHandleFormSubmit(
    selectedItems,
    setSuccessOpen
  );
  const t = useTranslations("CartPage");
  const locale = useLocale(); // Locale bilgisini al
  const extraServicesMap = t.raw("extraServicesList") as Record<string, string>;
  const materialsMap = t.raw("materialsList") as Record<string, string>;

  const handleCloseModal = () => setModalOpen(false);

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
    try {
      const selectedCartItems = selectedItems.map((index) => cartItems[index]);

      const lineItems = selectedCartItems.map((item) => ({
        title: item.fileName,
        quantity: item.quantity,
        price: isNaN(Number(item.priceTL))
          ? "0.00"
          : Number(item.priceUSD).toFixed(2),
        properties: [
          { name: "Material", value: item.material },
          { name: "Thickness", value: `${item.thickness} mm` },
          ...(item.extraServices && item.extraServices.length > 0
            ? item.extraServices.map((service) => ({
                name: "Extra Service",
                value: service,
              }))
            : []),
        ],
      }));

      console.log("🟡 Gönderilecek lineItems:", lineItems);

      const response = await fetch("/api/shopify/createDraftOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineItems }),
      });

      const data = await response.json();

      console.log("🟢 Shopify API Frontend Yanıtı:", data);

      if (data.checkoutUrl) {
        console.log("✅ Yönlendiriliyor:", data.checkoutUrl);
        window.location.href = data.checkoutUrl;
      } else {
        console.error("🔴 Ödeme URL alınamadı. Shopify API Yanıtı:", data);
      }
    } catch (error) {
      console.error("🔴 Sipariş oluştururken beklenmedik hata oluştu:", error);
    }
  };

  return (
    <Stack sx={styles.cartContainer}>
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
              <Card key={index} sx={styles.cartCard}>
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
                  {item.svg && (
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
                          <Typography >
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
                    <Typography fontSize={14} color="textSecondary">
                      {t("coating")} : {item.coating}
                    </Typography>
                  )}
                </Box>

                {/* Ürün Fiyatı - Sağ Alt */}
                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Box>
                  <Typography variant="h3">
                          {t("itemPrice")}:
                          {locale === "en"
                            ? item.priceUSD === "pending" ||
                              item.priceUSD ===
                                "Fiyat bilgisi siparişten sonra verilecek"
                              ? t("pricePending")
                              : `$${
                                  Number(item.priceUSD) &&
                                  !isNaN(Number(item.priceUSD))
                                    ? (
                                        Number(item.priceUSD) * item.quantity
                                      ).toFixed(2)
                                    : "0.00"
                                } USD`
                            : item.priceTL === "pending" ||
                              item.priceTL ===
                                "Fiyat bilgisi siparişten sonra verilecek"
                            ? t("pricePending")
                            : `${
                                Number(item.priceTL) &&
                                !isNaN(Number(item.priceTL))
                                  ? (
                                      Number(item.priceTL) * item.quantity
                                    ).toFixed(2)
                                  : "0.00"
                              } TL`}
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
<Typography variant="h6" fontWeight="bold">
  {t("totalAmount")}:
  {selectedItems.length > 0
    ? selectedItems.some(
        (index) =>
          cartItems[index]?.priceUSD === "pending" ||
          cartItems[index]?.priceUSD === "Fiyat bilgisi siparişten sonra verilecek"
      )
      ? t("pricePending")
      : locale === "en"
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

</Box>
)}

{cartItems.length > 0 && (
<Stack direction="column" spacing={2} sx={{ mt: 4 }}>
  <Button variant="contained" color="secondary" onClick={clearCart}>
    {t("clearCart")}
  </Button>
  <Button
    variant="contained"
    color="primary"
    onClick={handleCheckout}
    disabled={selectedItems.length === 0}
  >
    {t("placeOrder")}
  </Button>
</Stack>
)}


      {/* Modal ve Başarı Bildirimi */}
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

export default MobileCart;
