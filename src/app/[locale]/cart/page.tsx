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
  Card,
  Tooltip,
} from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import ModalForm from "@/app/components/Form";
import { supabase } from "@/lib/api/supabaseClient";
import { Stack } from "@mui/system";
import { useTranslations } from "next-intl";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import OrderSuccessFeedback from "@/app/components/OrderSuccessFeedback";
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import theme from "@/theme/theme";

const Cart = () => {
  const { cartItems, clearCart, addToCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const t = useTranslations("CartPage");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFormSubmit = async (formData: { name: string; email: string; phone: string }) => {
    setIsSubmitting(true);

    try {
      // Sipariş oluştur
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          status: "Sipariş Alındı",
        })
        .select("id")
        .single();

      if (orderError) {
        console.error("Order Error:", orderError);
        throw new Error(orderError.message);
      }

      const orderId = orderData.id;

      // Seçilen ürünleri al
      const selectedCartItems = selectedItems.map((index) => cartItems[index]);

      // Her bir dosyayı Supabase Storage'a yükle ve URL al
      const cartItemsWithUrls = await Promise.all(
        selectedCartItems.map(async (item) => {
          if (item.file) {
            const filePath = `orders/${Date.now()}_${item.file.name}`;
            const { error: uploadError } = await supabase.storage
              .from("uploaded-files")
              .upload(filePath, item.file);

            if (uploadError) throw new Error(uploadError.message);

            const { data: publicUrlData } = supabase.storage
              .from("uploaded-files")
              .getPublicUrl(filePath);

            return {
              ...item,
              fileUrl: publicUrlData?.publicUrl || "",
            };
          }
          return item;
        })
      );

      // Sepet öğelerini (URL ile) Supabase'e kaydet
      const itemsToSave = cartItemsWithUrls.map((item) => ({
        order_id: orderId,
        material: item.material,
        thickness: item.thickness,
        quantity: item.quantity,
        coating: item.coating,
        note: item.note,
        file_url: "fileUrl" in item ? item.fileUrl : null,
      }));
 


      const { error: cartError } = await supabase.from("cart_items").insert(itemsToSave);
      if (cartError) throw new Error(cartError.message);

      // Seçilen ürünleri sepetten çıkar
      const remainingItems = cartItems.filter((_, index) => !selectedItems.includes(index));
      clearCart(); // Sepeti temizle
      remainingItems.forEach(addToCart); // Kalan ürünleri yeniden ekle
      setSelectedItems([]); // Seçimleri sıfırla

      setSuccessOpen(true); // Başarı mesajı göster
    } catch (error) {
      console.error("Sipariş oluşturulamadı:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }

    setIsSubmitting(false);
    setModalOpen(false);
  };


 

  return (
    <Stack sx={{ p: 6, pt: 2.5 }}>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
        {t("cartTitle1")} ({cartItems.length} {t("cartTitle2")})
        </Typography>
        {cartItems.length > 1 && (
          <Typography variant="body" >
         {t("selectProducts")}
          </Typography>
        )}
        {cartItems.length === 0 ? (
          <Stack
            spacing={5}
            alignItems="center"
            justifyContent="center"
            sx={{
              p: 4,
              borderRadius: "8px",
              textAlign: "center",
              mt: 5,
            }}
          >
            {/* İkon ve Açıklama Metni */}
            <AddShoppingCart color="action" sx={{ fontSize: 150 }} />
            <Typography variant="h6">
              {t("cartInfo")}
            </Typography>

            {/* Geri Dön Butonu */}
            <Button
              variant="contained"
              color="primary"
              href="/"
              size="medium"
            >
              {t("button")}
            </Button>
          </Stack>

        ) : (
          <Stack >
            <List sx={{ mt: 4 }}>
              {cartItems.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    pr: 3,
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    maxWidth: "sm",
                    border: "1px solid", // Belirgin bir border için 2px genişlikte bir çizgi
                    borderColor: selectedItems.includes(index)
                      ? theme.palette.customPrimary[700] // Checkbox seçiliyken
                      : "grey.300", // Checkbox seçili değilken
                  }}
                >
                  <ListItem sx={{ pl: 0, py: 2 }}>
                    <Checkbox
                      checked={selectedItems.includes(index)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems((prev) => [...prev, index]); // Seçilen ürünü ekle
                        } else {
                          setSelectedItems((prev) =>
                            prev.filter((itemIndex) => itemIndex !== index)
                          );
                        }
                      }}
                      sx={{ color: theme.palette.customPrimary[700] }}
                    />
                    <Box sx={{ width: "100%", ml: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        <FileOpenIcon /> {item.fileName}
                      </Typography>
                      <Typography>{t("material")}: {item.material}</Typography>
                      <Typography>{t("thickness")}: {item.thickness} mm</Typography>
                      <Typography>{t("quantity")}: {item.quantity}</Typography>
                    {/*  <Typography>{t("coating")}: {item.coating}</Typography> */}
                      {item.note && (
                        <Tooltip title={item.note} arrow>
                          <Typography>
                          {t("note")}: {item.note.length > 50 ? `${item.note.substring(0, 50)}...` : item.note}
                          </Typography>
                        </Tooltip>
                      )}
                    </Box>
                  </ListItem>
                </Card>
              ))}
            </List>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleOpenModal}
                disabled={selectedItems.length === 0} 
              >
               {t("placeOrder")}
              </Button>

            </Box>
          </Stack>
        )}

        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ModalForm
              onClose={handleCloseModal}
              onSubmit={handleFormSubmit}
              disabled={isSubmitting}
              loading={isSubmitting}
            />
          </Modal>
        )}
        {isSuccessOpen && (
          <OrderSuccessFeedback open={isSuccessOpen} onClose={() => setSuccessOpen(false)} />
        )}
      </Box>
    </Stack>
  );
};

export default Cart;
