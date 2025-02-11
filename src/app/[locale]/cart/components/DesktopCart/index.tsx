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
import { useTranslations } from "next-intl";

const DesktopCart = () => {
  const { cartItems, setCartItems } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const t = useTranslations("CartPage");

  const { handleFormSubmit, isSubmitting } = useHandleFormSubmit(
    selectedItems,
    setSuccessOpen
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
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
                          {item.material}
                        </Typography>
                        {item.coating && (
                          <Typography sx={styles.textSecondary}>
                            {t("coating")}: {item.coating}
                          </Typography>
                        )}
                        <Typography sx={styles.textSecondary}>
                          {t("thickness")}: {item.thickness} mm
                        </Typography>
                        {item.extraServices && (
                          <Typography sx={styles.textSecondary}>
                            {t("extraServices")}: {item.extraServices}
                          </Typography>
                        )}
                        <Typography sx={styles.textSecondary}>
                          {t("quantity")}: {item.quantity}
                        </Typography>

                        <Typography variant="h6">
                          {t("itemPrice")}:{" "}
                          {item.price
                            ? `${item.price} TL`
                            : "Calculating..."}
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

          {/* Sipariş Özeti */}
          {cartItems.length > 0 && (
            <Grid2
              size={{ xs: 12, md: 4 }}
              sx={{ bgcolor: theme.palette.grey[100] }}
            >
              <Box sx={styles.summaryBox}>
                <Typography sx={styles.summaryText}>
                  {t("total")}: {cartItems.length} {t("cartTitle2")}
                </Typography>
                <Typography sx={styles.totalPrice}>85,70 EUR</Typography>

                <Stack direction="row" alignItems="center" sx={styles.terms}>
                  <Checkbox color="primary" />
                  <Typography sx={styles.termsText}>
                    {t("policyText")}
                  </Typography>
                </Stack>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenModal}
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
