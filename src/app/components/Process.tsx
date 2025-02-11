"use client";

import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";

const ProcessSteps = () => {
  const t = useTranslations("ProcessSteps");
  const { isMobile, isTablet } = useScreen(); // Mobil ve tablet kontrolü

  const steps = [
    {
      icon: <ComputerIcon sx={{ fontSize: { xs: "30px", sm: "40px", md: "50px" }, color: "#1976d2" }} />,
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      icon: <FactoryIcon sx={{ fontSize: { xs: "30px", sm: "40px", md: "50px" }, color: "#1976d2" }} />,
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: { xs: "30px", sm: "40px", md: "50px" }, color: "#1976d2" }} />,
      title: t("step3.title"),
      description: t("step3.description"),
    },
  ];

  return (
    (<Box sx={{ padding: { xs: "16px", sm: "24px", md: "32px" }, backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
      {isMobile || isTablet ? (
        // Mobil ve Tablet Tasarım
        (<Stack spacing={4}>
          {steps.map((step, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                padding: "16px 0",
                borderBottom: index < steps.length - 1 ? "1px dashed #ccc" : "none",
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
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333" }}>
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.4 }}>
                  {step.description}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>)
      ) : (
        // Masaüstü Tasarım
        (<Stack direction="row" justifyContent="space-around" alignItems="center" spacing={4}>
          {steps.map((step, index) => (
            <Stack
              key={index}
              alignItems="center"
              spacing={2}
              sx={{
                textAlign: "center",
                position: "relative",
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
              <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333" }}>
                {step.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", lineHeight: 1.6, maxWidth: "240px" }}>
                {step.description}
              </Typography>
              {index < steps.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "-50%",
                    height: "2px",
                    width: "100%",
                    background: "repeating-linear-gradient(to right, #ccc, #ccc 5px, transparent 5px, transparent 10px)",
                    transform: "translateY(-50%)",
                    zIndex: -1,
                  }}
                ></Box>
              )}
            </Stack>
          ))}
        </Stack>)
      )}
    </Box>)
  );
};

export default ProcessSteps;