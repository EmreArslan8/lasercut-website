"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations("contactPage");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "your-email@gmail.com",
          subject: `New Message from ${formData.name}`,
          text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
          html: `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          `,
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
    }
  };

  return (
    <Box sx={{ maxWidth: "600px", mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        {t("title")}
      </Typography>
      <Typography textAlign="center" sx={{ mb: 4 }}>
        {t("description")}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label={t("form.nameLabel")}
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label={t("form.emailLabel")}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label={t("form.messageLabel")}
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {t("form.submitButton")}
          </Button>
        </Stack>
      </form>

      {status === "success" && (
        <Typography
          textAlign="center"
          sx={{ mt: 4, color: "green", fontWeight: "bold" }}
        >
          {t("status.success")}
        </Typography>
      )}
      {status === "error" && (
        <Typography
          textAlign="center"
          sx={{ mt: 4, color: "red", fontWeight: "bold" }}
        >
          {t("status.error")}
        </Typography>
      )}
    </Box>
  );
};

export default ContactPage;
