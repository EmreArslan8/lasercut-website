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
} from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import ModalForm from "@/app/components/Form";
import { supabase } from "@/lib/api/supabaseClient";
import { Stack } from "@mui/system";
import { useLocale, useTranslations } from "next-intl";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import OrderSuccessFeedback from "@/app/components/OrderSuccessFeedback";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import theme from "@/theme/theme";
import Icon from "@/app/components/Icon";
import { sendEmail } from "@/utils/sendEmail";
import useScreen from "@/lib/hooks/useScreen";

const Cart = () => {
  const { cartItems, clearCart, addToCart, setCartItems } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const t = useTranslations("CartPage");

  const materialMap: Record<string, string> = {
    "1050": "Aluminum 1050",
    "5754": "Aluminum 5754 / 3.3535 / AlMg3",
    GalvanizliSac: "Steel Galvanized Sheet",
    SiyahSac: "Steel Black Sheet",
    DC01: "Steel DC01 / 6112 / C (DKP)",
    ST37: "Steel ST37-K / S235JR / 1.0038",
    Paslanmaz304: "Stainless Steel 304 / 1.4301 / X5CrNi18.10 / V2A",
    Paslanmaz316L: "Stainless Steel 316L / 1.4404 / X2CrNiMo17-12-2 / V4A",
  };

  const { isMobile } = useScreen();
  const locale = useLocale();
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleRemoveItem = (index: number) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    phone: string;
  }) => {
    setIsSubmitting(true);
    console.time("Sipariş Kaydı Süresi");

    const selectedCartItems = selectedItems.map((index) => cartItems[index]);

    try {
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

      console.timeEnd("Sipariş Kaydı Süresi");

      if (orderError) {
        console.error("Order Error:", orderError);
        throw new Error(orderError.message);
      }

      const orderId = orderData.id;

      console.time("Dosya Yükleme Süresi");
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
      console.timeEnd("Dosya Yükleme Süresi");

      console.time("E-posta Gönderim Süresi");

      await Promise.all([
        // Kullanıcıya e-posta gönder
        sendEmail({
          from: `"LaserCut" <${process.env.EMAIL_USER}>`,
          to: formData.email,
          subject: "Sipariş Onayı",
          text: `Merhaba ${formData.name},

Siparişiniz başarıyla alındı. Detaylar aşağıdadır:

Sipariş Numarası: ${orderId}
Ürünler:
${cartItemsWithUrls
  .map(
    (item) =>
      `- Ürün: ${item.material}, Kalınlık: ${item.thickness} mm, Miktar: ${
        item.quantity
      }, 
Dosya: ${item.fileUrl || "Yok"}`
  )
  .join("\n")}


Teşekkür ederiz!
LaserCut Ekibi`,
          html: `
                  <h1>Merhaba ${formData.name},</h1>
                  <p>Siparişiniz başarıyla alındı. Detaylar aşağıdadır:</p>
                  <h2>Sipariş Numarası: ${orderId}</h2>
                  <ul>
                    ${cartItemsWithUrls
                      .map(
                        (item) =>
                          `<li><strong>Ürün:</strong> ${item.material}, 
                            <strong>Kalınlık:</strong> ${item.thickness} mm, 
                            <strong>Miktar:</strong> ${item.quantity}, 
                            <strong>Dosya:</strong> ${
                              item.fileUrl
                                ? `<a href="${item.fileUrl}">Dosyayı Gör</a>`
                                : "Yok"
                            }</li>`
                      )
                      .join("")}
                  </ul>
                  <p>Teşekkür ederiz!</p>
                  <p>Saygılarımızla,<br>LaserCut Ekibi</p>
                `,
        }),

        sendEmail({
          from: `"LaserCut" <${process.env.EMAIL_USER}>`,
          to: "drawwtocut@gmail.com",
          subject: "Yeni Sipariş Alındı",
          text: `Yeni bir sipariş alındı. Detaylar aşağıdadır:

Sipariş Numarası: ${orderId}
Kullanıcı Adı: ${formData.name}
Telefon: ${formData.phone}

Ürünler:
${cartItemsWithUrls
  .map(
    (item) =>
      `- Ürün: ${item.material}, Kalınlık: ${item.thickness} mm, Miktar: ${
        item.quantity
      }, 
Kaplama: ${item.coating || "Yok"}, Dosya: ${item.fileUrl || "Yok"}`
  )
  .join("\n")}

Lütfen siparişi kontrol edin.
LaserCut Ekibi`,
          html: `
                  <h1>Yeni Sipariş Alındı</h1>
                  <p>Detaylar aşağıdadır:</p>
                  <h2>Sipariş Numarası: ${orderId}</h2>
                  <p><strong>Kullanıcı Adı:</strong> ${formData.name}</p>
                  <p><strong>Telefon:</strong> ${formData.phone}</p>
                  <ul>
                    ${cartItemsWithUrls
                      .map(
                        (item) =>
                          `<li><strong>Ürün:</strong> ${item.material}, 
                            <strong>Kalınlık:</strong> ${item.thickness} mm, 
                            <strong>Miktar:</strong> ${item.quantity}, 
                            <strong>Kaplama:</strong> ${item.coating || "Yok"}, 
                            <strong>Dosya:</strong> ${
                              item.fileUrl
                                ? `<a href="${item.fileUrl}">Dosyayı Gör</a>`
                                : "Yok"
                            }</li>`
                      )
                      .join("")}
                  </ul>
                  <p>Lütfen siparişi kontrol edin.</p>
                  <p>Saygılarımızla,<br>LaserCut Ekibi</p>
                `,
        }),
      ]);

      console.timeEnd("E-posta Gönderim Süresi");

      console.time("Sepet Veritabanı Kaydı Süresi");
      const itemsToSave = cartItemsWithUrls.map((item) => ({
        order_id: orderId,
        material: item.material,
        thickness: item.thickness,
        quantity: item.quantity,
        coating: item.coating,
        note: item.note,
        file_url: item.fileUrl || null,
      }));

      const { error: cartError } = await supabase
        .from("cart_items")
        .insert(itemsToSave);
      console.timeEnd("Sepet Veritabanı Kaydı Süresi");

      if (cartError) throw new Error(cartError.message);

      console.log("Tüm işlemler başarıyla tamamlandı.");
      const remainingItems = cartItems.filter(
        (_, index) => !selectedItems.includes(index)
      );
      clearCart();
      remainingItems.forEach(addToCart);
      setSelectedItems([]);
      setSuccessOpen(true);
    } catch (error) {
      console.error(
        "Sipariş oluşturulamadı veya e-posta gönderilemedi:",
        error
      );
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }

    setIsSubmitting(false);
    setModalOpen(false);
  };

  return (
    <Stack sx={{ p: isMobile ? 1 : 6, pt: isMobile ? 1 : 2.5 }}>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 2 }}>
          {t("cartTitle1")} ({cartItems.length} {t("cartTitle2")})
        </Typography>
        {cartItems.length > 1 && (
          <Typography variant="body">{t("selectProducts")}</Typography>
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
            <AddShoppingCart color="action" sx={{ fontSize: 150 }} />
            <Typography variant="h6">{t("cartInfo")}</Typography>
            <Button variant="contained" color="primary" href="/" size="medium">
              {t("button")}
            </Button>
          </Stack>
        ) : (
          <Stack>
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
                    border: "1px solid",
                    borderColor: selectedItems.includes(index)
                      ? theme.palette.customPrimary[700]
                      : "grey.300",
                    position: "relative", // Relative pozisyon gerekli
                  }}
                >
                  {/* Delete Butonu */}
                  <Icon
                    name="delete"
                    onClick={() => handleRemoveItem(index)}
                    sx={{
                      position: "absolute", // Absolute pozisyon
                      top: "20px", // Sağ üstte konumlandırmak için
                      right: "20px", // Sağ tarafa yerleştir
                      color: theme.palette.error.main,
                      fontSize: isMobile ? "20px" : "24px", // Mobilde daha küçük font boyutu
                      cursor: "pointer", // Tıklanabilir
                    }}
                  />

                  <ListItem
                    sx={{
                      pl: 0,
                      py: 2,
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row", // Mobilde dikey hizalama
                      alignItems: isMobile ? "flex-start" : "center",
                    }}
                  >
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
                      sx={{ color: theme.palette.customPrimary[700] }}
                    />
                    <Box sx={{ width: "100%", ml: 2 }}>
                      <Typography
                        variant={isMobile ? "subtitle1" : "h6"}
                        gutterBottom
                      >
                        {!isMobile && (
                          <FileOpenIcon sx={{ fontSize: 24, marginRight: 1 }} />
                        )}
                      </Typography>
                      <Typography>
                        {t("material")}:{" "}
                        {materialMap[item.material] || item.material}
                      </Typography>
                      <Typography>
                        {t("thickness")}: {item.thickness} mm
                      </Typography>
                      <Typography>
                        {t("quantity")}: {item.quantity}
                      </Typography>
                      <Typography>
                        {t("coating")}:{" "}
                        {item.coating.startsWith("painted")
                          ? item.coating.replace("painted ", "")
                          : locale === "tr"
                          ? "Boyasız"
                          : t("unpainted")}
                      </Typography>
                    </Box>
                  </ListItem>
                </Card>
              ))}
            </List>

            <Box sx={{ mt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                onClick={clearCart}
              >
                {t("clearCart")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleOpenModal}
                disabled={selectedItems.length === 0}
                sx={{ ml: 2 }}
              >
                {t("placeOrder")}
              </Button>
            </Box>
            <Box sx={{ m: 4, textAlign: "center" }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {t("addMoreProductsText")}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                href="/"
                size={isMobile ? "small" : "medium"}
              >
                {t("goToHomePageButton")}
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
          <OrderSuccessFeedback
            open={isSuccessOpen}
            onClose={() => setSuccessOpen(false)}
          />
        )}
      </Box>
    </Stack>
  );
};

export default Cart;
