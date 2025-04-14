"use client";

import React, { useMemo } from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslations } from "next-intl";
import styles from "./styles";

const FaqPageView = () => {
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
    <Box sx={styles.wrapper}>
      <Typography variant="h2" sx={styles.title}>
        {t("title")}
      </Typography>

      {faqs.map((faq, index) => (
        <Accordion key={index} disableGutters elevation={0} sx={styles.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#007FFF" }} />} sx={styles.summary}>
            <Typography sx={styles.summaryText}>{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.details}>
            <Typography sx={styles.answer}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FaqPageView;
