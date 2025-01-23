"use client";

import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FaqPage = () => {
  const faqs = [
    { question: "What services do you provide?", answer: "We offer precision cutting and metal processing services for industrial and creative needs." },
    { question: "How can I place an order?", answer: "You can place an order through our website or contact us directly via email or phone." },
    { question: "Do you offer custom designs?", answer: "Yes, we specialize in creating custom designs tailored to your requirements." },
    { question: "What is the estimated delivery time?", answer: "Delivery time depends on the project, but we aim to complete most orders within 5-10 business days." },
    { question: "Can you handle large-scale industrial projects?", answer: "Absolutely. We have the capacity to manage both small and large-scale projects with precision." },
  ];

  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h2" fontWeight="bold" textAlign="center" sx={{ mb: 6 }}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqPage;
