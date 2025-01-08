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
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";
import { useTranslations } from "next-intl";

interface ModalFormProps {
  onClose: () => void;
  onSubmit: (formData: { name: string; email: string; phone: string }) => void;
  disabled: boolean;
  loading: boolean; // Yükleme durumu
}

const ModalForm: React.FC<ModalFormProps> = ({ onClose, onSubmit, disabled, loading }) => {
  const t = useTranslations("Form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false);
  const [policyError, setPolicyError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Kullanıcı yazmaya başladığında hatayı temizle
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      phone: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: "", // Kullanıcı yazmaya başladığında hatayı temizle
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPolicyAccepted(e.target.checked);
    setPolicyError(""); // Kullanıcı tıkladığında hatayı temizle
  };

  const validatePhoneNumber = (phone: string, country: string = "TR") => {
    try {
      const phoneNumber = parsePhoneNumberFromString(phone, country as CountryCode);
      return phoneNumber?.isValid() || false; // Geçerliyse true döner
    } catch {
      return false; // Geçerli değilse false döner
    }
  };
  

  const validateForm = () => {
    let hasError = false;
    const newErrors = { name: "", email: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Adınızı giriniz.";
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz.";
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-posta adresi geçersiz.";
      hasError = true;
    }

    if (!formData.phone.trim() || !validatePhoneNumber(formData.phone, "TR")) {
      newErrors.phone = "Geçerli bir telefon numarası giriniz.";
      hasError = true;
    }

    setErrors(newErrors);

    if (!isPolicyAccepted) {
      setPolicyError("Lütfen gizlilik politikasını kabul edin.");
      hasError = true;
    }

    return !hasError;
  };


  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData); // Form verisini üst bileşene gönder
    }
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
        width: { xs: "70%", sm: "400px" }, 
        zIndex: 1000,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
      {t("title")}
      </Typography>
      <Typography variant="body2" sx={{ color: "#555", marginBottom: "16px" }}>
      {t("allFieldsRequired")}
      </Typography>
      <Stack spacing={2}>
        <TextField
       label={t("nameLabel")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          disabled={disabled}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />
        <TextField
   label={t("emailLabel")}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          disabled={disabled}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <Box>
          <Typography variant="body1" sx={{ marginBottom: "8px", fontWeight: "bold" }}>
          {t("phoneLabel")}
          </Typography>
          <PhoneInput
            country={"tr"}
            value={formData.phone}
            onChange={handlePhoneChange}
            disabled={disabled}
            inputStyle={{
              width: "100%",
              height: "52px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              paddingLeft: "48px",
            }}
            buttonStyle={{
              borderRadius: "4px",
            }}
          />
          {errors.phone && (
            <Typography variant="caption" color="error">
              {errors.phone}
            </Typography>
          )}

        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isPolicyAccepted}
              onChange={handleCheckboxChange}
              disabled={disabled}
            />
          }
          label={<Typography variant="body2">{t("policyText")}</Typography>}
        />
        {policyError && (
          <Typography variant="caption" color="error">
            {policyError}
          </Typography>
        )}
      </Stack>
      <Stack spacing={2} justifyContent="center" mt={3}>
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
             {t("submitButton")}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} disabled={disabled}>
        {t("cancelButton")}
        </Button>
      </Stack>
    </Box>
  );
};

export default ModalForm;
