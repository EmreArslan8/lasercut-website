"use client";

import React, { useMemo } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslations } from "next-intl";

const FaqPage = () => {
  const t = useTranslations("faqPage");

  const faqs = useMemo(
    () => [
      { question: t("faqs.0.question"), answer: t("faqs.0.answer") },
      { question: t("faqs.1.question"), answer: t("faqs.1.answer") },
      { question: t("faqs.2.question"), answer: t("faqs.2.answer") },
      { question: t("faqs.3.question"), answer: t("faqs.3.answer") },
      { question: t("faqs.4.question"), answer: t("faqs.4.answer") },
      { question: t("faqs.5.question"), answer: t("faqs.5.answer") },
      { question: t("faqs.6.question"), answer: t("faqs.6.answer") },
      { question: t("faqs.7.question"), answer: t("faqs.7.answer") },
    ],
    [t]
  );

  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", px: 2, py: 4 }}>
      {/* Başlık */}
      <Typography
        variant="h2"
        fontWeight="bold"
        textAlign="center"
        sx={{
          mb: 6,
          background: "linear-gradient(90deg, #007FFF, #0059B2)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {t("title")}
      </Typography>

      {/* FAQ Listesi */}
      {faqs.map((faq, index) => (
        <Accordion
          key={index}
          disableGutters
          elevation={0}
          sx={{
            mb: 2,
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:before": { display: "none" }, // Default before çizgisini kaldır
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#007FFF" }} />}
            sx={{
              backgroundColor: "#F5F5F5",
              borderRadius: "8px",
              px: 3,
              py: 2,
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
              "&:hover": {
                backgroundColor: "#E3F2FD",
              },
            }}
          >
            <Typography fontWeight="bold" sx={{ fontSize: "1.1rem" }}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#FAFAFA", px: 3, py: 2 }}>
            <Typography sx={{ color: "#424242", lineHeight: 1.7 }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqPage;
