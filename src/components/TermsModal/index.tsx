"use client";

import { Box, Typography, Modal, IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./styles";
import { X } from "lucide-react";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const TermsModal = ({ open, onClose }: TermsModalProps) => {
  const t = useTranslations("termsAndConditions");

  return (
    <Modal open={open} onClose={onClose} disableScrollLock>
      <Box sx={styles.wrapper}>
        <IconButton  onClick={onClose} sx={styles.closeIcon}>
        <X size={32}/>
        </IconButton>
        <Typography variant="h5" sx={styles.title}> {t("title")} </Typography>
        <Typography variant="body1" sx={styles.description}>  {t("description")}
        </Typography>
        {[
          "orderProcessing",
          "paymentMethods",
          "pricingPolicy",
          "revisionRequests",
          "orderCancellations",
          "refundPolicy",
          "privacyPolicy",
          "deliverySafety",
          "gloves",
          "sharpEdges",
          "liabilityDisclaimer",
          "finalAgreement",
        ].map((key) => (
          <Typography key={key} variant="body2" sx={{ mb: 1 }}>
            {t(key)}
          </Typography>
        ))}
      </Box>
    </Modal>
  );
};

export default TermsModal;
