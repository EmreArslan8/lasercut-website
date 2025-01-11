"use client";

import React from "react";
import { Box, Typography, Stack, } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";

const ProcessSteps = () => {
  const t = useTranslations("ProcessSteps");
  const isMobile = useScreen(); // Mobil ekran kontrolü

  const steps = [
    {
      icon: <ComputerIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      icon: <FactoryIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: "40px", color: "#1976d2" }} />,
      title: t("step3.title"),
      description: t("step3.description"),
    },
  ];

  return (
    <>
      {isMobile ? (
        // Mobil Tasarım
        <Stack
          spacing={2}
          sx={{
            padding: "24px 16px",
            backgroundColor: "#fff",
          }}
        >
          {steps.map((step, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                padding: "16px 0",
                borderBottom: index < steps.length - 1 ? "1px solid #e0e0e0" : "none",
              }}
            >
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "#e3f2fd",
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </Box>
              <Stack spacing={0.5}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.4,
                  }}
                >
                  {step.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      ) : (
        // Masaüstü Tasarım
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={4}
          sx={{
            padding: "48px 16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
          }}
        >
          {steps.map((step, index) => (
            <Stack
              key={index}
              alignItems="center"
              spacing={2}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "#e3f2fd",
                }}
              >
                {step.icon}
              </Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {step.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  lineHeight: 1.6,
                  maxWidth: "240px",
                }}
              >
                {step.description}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default ProcessSteps;
