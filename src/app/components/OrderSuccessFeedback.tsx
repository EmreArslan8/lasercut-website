"use client";

import React from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";

interface OrderSuccessFeedbackProps {
  open: boolean;
  onClose: () => void;
}

const OrderSuccessFeedback: React.FC<OrderSuccessFeedbackProps> = ({ open, onClose }) => {
    const router = useRouter();
    const handleRedirect = () => {
        onClose(); // Modal'ı kapat
        router.push("/"); // Ana sayfaya yönlendir
      };
    
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          padding: 4,
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Sipariş Başarıyla Verildi!
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Siparişiniz başarıyla alındı. En kısa sürede işleme alınacaktır. Teşekkür ederiz!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirect}
        
        >
          Tamam
        </Button>
      </Box>
    </Modal>
  );
};

export default OrderSuccessFeedback;
