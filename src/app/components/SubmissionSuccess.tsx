import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";

interface SubmissionSuccessProps {
  onGoBack: () => void;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ onGoBack }) => {
  const t = useTranslations("Success");
  const isMobile = useScreen();

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: isMobile ? "24px" : "40px",
        background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        margin: "16px auto",
      }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: isMobile ? "64px" : "80px",
          color: "#4caf50",
          marginBottom: "16px",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "12px",
          fontSize: isMobile ? "20px" : "24px",
        }}
      >
        {t("successTitle", { defaultMessage: "Tebrikler!" })}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: "16px",
          color: "#555",
          fontSize: isMobile ? "14px" : "16px",
        }}
      >
          {t( "successMessage" )}
      </Typography>
      <Stack spacing={2} direction="column" alignItems="center">
        <Typography
          variant="body1"
          onClick={onGoBack}
          sx={{
            color: "#1976d2",
            fontSize: isMobile ? "14px" : "16px",
            textDecoration: "underline",
            cursor: "pointer",
            "&:hover": {
              color: "#145ca8",
            },
          }}
        >
          {t("backButton")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default SubmissionSuccess;
