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
import { useTranslations } from "next-intl";
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

  const handleOpenModal = () => setModalOpen(true);
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
          <Icon name="add_shopping_cart" sx={{ fontSize: 150 }} />
          <Typography variant="h6">{t("cartInfo")}</Typography>
          <Button variant="contained" color="primary" href="/" size="medium">
            {t("button")}
          </Button>
        </Stack>
      ) : (
        <List sx={{ mt: 2 }}>
          {cartItems.map((item, index) => (
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
                    <Icon name="delete" sx={{ color: "error", fontSize: 16 }} />
                    <Typography variant="body2" fontWeight="bold" color="error">
                      {t("removeButton")}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={styles.materialInfoBox}>
                <Typography variant="body2" fontWeight="bold">
                  {item.material}
                </Typography>
                <Typography fontSize={14} color="textSecondary">
                  {item.thickness}
                </Typography>
                {item.extraServices && (
                  <Typography fontSize={14} color="textSecondary">
                    {t("extraServices")}: {item.extraServices}
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
                  <Typography variant="body1" fontWeight="bold">
                    {t("itemPrice")}:
                    {item.price
                      ? (Number(item.price) * item.quantity).toFixed(2)
                      : "0.00"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${item.price ? Number(item.price).toFixed(2) : "0.00"} / ea
                  </Typography>
                </Box>
              </Stack>
            </Card>
          ))}
        </List>
      )}

      {/* Sepeti Temizle ve Sipariş Tamamla Butonları */}
      <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="secondary" onClick={clearCart}>
          {t("clearCart")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          disabled={selectedItems.length === 0}
        >
          {t("placeOrder")}:
        </Button>
      </Stack>

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
