import { supabase } from "@/lib/api/supabaseClient";

interface PendingOrderData {
  draftOrderId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  fileName: string;
  fileUrl: string;
  productDetails: {
    material: string;
    thickness: string;
    quantity: number;
    extraServices?: string[];
  };
}

export const createPendingOrder = async (orderData: PendingOrderData) => {
  const { draftOrderId, userName, userEmail, userPhone, fileName, fileUrl, productDetails } = orderData;

  const { data, error } = await supabase.from("pending_orders").insert([
    {
      draft_order_id: draftOrderId,
      user_name: userName,
      user_email: userEmail,
      user_phone: userPhone,
      file_name: fileName,
      file_url: fileUrl,
      material: productDetails.material,
      thickness: productDetails.thickness,
      quantity: productDetails.quantity,
      extra_services: productDetails.extraServices || [],
    },
  ]);

  if (error) {
    console.error("❌ Pending Order Kaydedilemedi:", error.message);
    throw new Error(error.message);
  }

  console.log("✅ Pending Order Supabase'e Kaydedildi:", data);
};
