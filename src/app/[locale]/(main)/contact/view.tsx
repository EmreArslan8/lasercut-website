"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslations } from "next-intl";
import styles from "./styles";

const ContactPageView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const t = useTranslations("contactPage");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      // POST API çağrısı
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: formData.email, // Kullanıcıdan alınan alıcı adresi
          subject: `New Message from ${formData.name}`, // Konu
          text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`, // Düz metin
          html: `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          `, // HTML içeriği
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h1" fontWeight="500" sx={styles.title}>
        {t("title")}
      </Typography>
      <Box sx={styles.formWrapper}>
        <Box sx={styles.formSection}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            {t("description")}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label={t("form.nameLabel")} // "Ad Soyad"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label={t("form.emailLabel")} // "E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label={t("form.messageLabel")} // "Mesaj"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                {loading ? t("sending") : t("submitButton")}
              </Button>
            </Stack>
          </form>

          {status === "success" && (
            <Alert severity="success" sx={{ mt: 3 }}>
              {t("successMessage")}
            </Alert>
          )}
          {status === "error" && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {t("errorMessage")}
            </Alert>
          )}
        </Box>

        {/* Harita Alanı */}
        <Box sx={styles.mapSection}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d632.0917801607355!2d28.858742250012575!3d40.222332814805235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca11e76897ed27%3A0x6b086edd81e12343!2sUlutek%20Teknopark!5e0!3m2!1str!2str!4v1737903381232!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </Box>
      </Box>

      <Box sx={styles.socialSection}>
        <Box sx={styles.socialText}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            {t("socialMedia.title")}
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.6 }}>
            {t("socialMedia.description")}
          </Typography>
        </Box>

        {/* Sosyal Medya İkonları */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* WhatsApp */}
          <Button
            component="a"
            href="https://wa.me/1234567890"
            target="_blank"
            startIcon={<WhatsAppIcon />}
            variant="contained"
            color="success"
            sx={styles.whatsappButton}
          >
            WhatsApp
          </Button>

          {/* Instagram */}
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPageView;
