"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

const ContactPage = () => {
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
          to: "your-email@gmail.com", // Alıcı e-posta adresi
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
        Contact Us
      </Typography>
      <Typography textAlign="center" sx={{ mb: 4 }}>
        Have a question or want to reach out? Fill out the form below!
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Message
          </Button>
        </Stack>
      </form>

      {status === "success" && (
        <Typography
          textAlign="center"
          sx={{ mt: 4, color: "green", fontWeight: "bold" }}
        >
          Message sent successfully!
        </Typography>
      )}
      {status === "error" && (
        <Typography
          textAlign="center"
          sx={{ mt: 4, color: "red", fontWeight: "bold" }}
        >
          Failed to send message. Please try again later.
        </Typography>
      )}
    </Box>
  );
};

export default ContactPage;
