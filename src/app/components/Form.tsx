"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface ModalFormProps {
  onClose: () => void;
  onSubmit: (formData: { name: string; email: string; phone: string }) => void;
  disabled: boolean;
  loading: boolean; // Yükleme durumu
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, onSubmit, disabled, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPolicyAccepted(e.target.checked);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    if (!isPolicyAccepted) {
      alert("Lütfen gizlilik politikasını kabul edin!");
      return;
    }
    onSubmit(formData); // Form verisini üst bileşene gönder
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        padding: "24px",
        width: "400px",
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
      Teklif almak için iletişim bilgilerini doldurun
      </Typography>
      <Typography variant="body2" sx={{ color: "#555", marginBottom: "16px" }}>
        Tüm alanlar gerekli
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Tam Ad *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          disabled={disabled}
        />
        <TextField
          label="Kurumsal E-mail *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          disabled={disabled}
        />
        <Box>
          <Typography variant="body1" sx={{ marginBottom: "8px", fontWeight: "bold" }}>
            İletişim Numarası *
          </Typography>
          <PhoneInput
    country={"tr"}
    value={formData.phone}
    onChange={handlePhoneChange}
    disabled={disabled}
    inputStyle={{
      width: "100%",
      height: "52px", // TextField'in varsayılan yüksekliği ile eşleştirmek için 56px
      fontSize: "16px",
      borderRadius: "4px", // Köşeleri uyumlu hale getirme
      border: "1px solid #ccc",
      paddingLeft: "48px", // Ülke bayrağı ve kodu için boşluk
    }}
    buttonStyle={{
      borderRadius: "4px",
    }}
  />
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPolicyAccepted}
              onChange={handleCheckboxChange}
              disabled={disabled}
            />
          }
          label={
            <Typography variant="body2" sx={{m:1}}>
                <strong>{"Hüküm ve Koşulları ayrıca Gizlilik Politikası'nı inceledim ve kabul ediyorum."}</strong> 
            </Typography>
          }
        />
      </Stack>
      <Stack  spacing={2} justifyContent="center" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={disabled}
          sx={{
            position: "relative",
          }}
        >
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
          Teklif Al
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} disabled={disabled}>
          İptal
        </Button>
      </Stack>
    </Box>
  );
};

export default ModalForm;
