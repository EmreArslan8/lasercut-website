import { supabase } from "@/lib/api/supabaseClient";
import { sendEmail } from "@/utils/sendEmail";
import { getCustomerEmailContent, getAdminEmailContent } from "./emailTemplates";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";

export const useHandleFormSubmit = (selectedItems: number[], setSuccessOpen: (value: boolean) => void) => {
    const { cartItems, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleFormSubmit = async (formData: { name: string; email: string; phone: string }) => {
      setIsSubmitting(true);
  
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
  
        if (orderError) throw new Error(orderError.message);
  
        const orderId = orderData.id;
  
        const cartItemsWithUrls = await Promise.all(
          selectedCartItems.map(async (item) => {
            if (item.file) {
              const filePath = `orders/${Date.now()}_${item.file.name.replace(/\s+/g, "_").toLowerCase()}`;
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
  
        // **E-Posta Gönderme**
        await Promise.all([
          sendEmail({
            from: `"LaserCut" <${process.env.EMAIL_USER}>`,
            to: formData.email,
            ...getCustomerEmailContent(formData, orderId, cartItemsWithUrls),
          }),
  
          sendEmail({
            from: `"LaserCut" <${process.env.EMAIL_USER}>`,
            to: "drawwtocut@gmail.com",
            ...getAdminEmailContent(formData, orderId, cartItemsWithUrls),
          }),
  
          // **Slack Bildirimini API Route Üzerinden Gönder**
          fetch("/api/send-slack", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, formData, cartItemsWithUrls }) // Ürünleri de ekledik
          })
        ]);
  
        clearCart();
        setSuccessOpen(true);
      } catch (error) {
        console.error("Sipariş hatası:", error);
      }
  
      setIsSubmitting(false);
    };
  
    return { handleFormSubmit, isSubmitting };
  };
  