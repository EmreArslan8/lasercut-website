"use client";

import React, { useState } from "react";
import {
  List,
  ListItem,
  Typography,
  Box,
  Paper,
  Button,
  Modal,
} from "@mui/material";
import { useCart } from "@/app/context/CartContext";
import ModalForm from "@/app/components/Form";
import { supabase } from "@/lib/api/supabaseClient";

const Cart: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleFormSubmit = async (formData: { name: string; email: string; phone: string }) => {
    console.log("Form submission started...");
    console.log("Form Data:", formData);
    console.log("Cart Items:", cartItems);
  
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
  
      // Her bir dosyayı Supabase Storage'a yükle ve URL al
      const cartItemsWithUrls = await Promise.all(
        cartItems.map(async (item) => {
          console.log("Cart Items:", cartItems);
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
        note: item.note,
        file_url: "fileUrl" in item ? item.fileUrl : null,
      }));
      console.log("Items to save:", itemsToSave);
  
      const { error: cartError } = await supabase.from("cart_items").insert(itemsToSave);
      if (cartError) throw new Error(cartError.message);
  
      // Sepeti temizle
      clearCart();
      alert("Sipariş başarıyla alındı!");
    } catch (error) {
      console.error("Sipariş oluşturulamadı:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  
    setIsSubmitting(false);
    setModalOpen(false);
  };
  
  return (
    <Box sx={{ margin: "0 auto", mt: 5, maxWidth: "800px" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Sepetiniz
      </Typography>

      {cartItems.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Sepetiniz boş
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/">
            Alışverişe Başla
          </Button>
        </Paper>
      ) : (
        <>
          <List sx={{ mt: 4 }}>
            {cartItems.map((item, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  marginBottom: 2,
                  padding: 3,
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <ListItem>
                  <Box sx={{ width: "100%" }}>
                    <Typography variant="h6" gutterBottom>
                      {item.fileName}
                    </Typography>
                    <Typography>Materyal: {item.material}</Typography>
                    <Typography>Kalınlık: {item.thickness} mm</Typography>
                    <Typography>Adet: {item.quantity}</Typography>
                  </Box>
                </ListItem>
              </Paper>
            ))}
          </List>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleOpenModal}
              sx={{
                backgroundColor: "#007BFF",
                "&:hover": { backgroundColor: "#0056b3" },
                padding: "10px 20px",
                fontWeight: "bold",
              }}
            >
              Sipariş Ver
            </Button>
          </Box>
        </>
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
    </Box>
  );
};

export default Cart;
