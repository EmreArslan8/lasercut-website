"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const ProcessSteps = () => {
  return (
    <Box
      sx={{
        width: "100%",
        margin: "auto",
        padding: "32px 0",
        textAlign: "center",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={4}
        sx={{
          borderTop: "2px dashed #1976d2",
          paddingTop: "32px",
        }}
      >
        {/* Adım 1 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            alignItems: "center",
            textAlign: { xs: "left", sm: "center" },
            gap: 2,
            flex: 1,
          }}
        >
          <ComputerIcon
            sx={{
              fontSize: "100px",
              color: "#1976d2",
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Anlık teklif alın
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", marginTop: { xs: "0.25rem", sm: "0.5rem" } }}
            >
              Anlık teklif almak için: 3D modelinizi yükledikten sonra üretim
              teknolojisi ve malzemeyi seçmeniz yeterlidir.
            </Typography>
          </Box>
        </Box>

        {/* Adım 2 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            alignItems: "center",
            textAlign: { xs: "left", sm: "center" },
            gap: 2,
            flex: 1,
          }}
        >
          <FactoryIcon
            sx={{
              fontSize: "100px",
              color: "#1976d2",
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Sipariş ver
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", marginTop: { xs: "0.25rem", sm: "0.5rem" } }}
            >
              Siparişinizi verdikten sonra üretim süreci başlar. Düzenli geri
              bildirimler alırsınız.
            </Typography>
          </Box>
        </Box>

        {/* Adım 3 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            alignItems: "center",
            textAlign: { xs: "left", sm: "center" },
            gap: 2,
            flex: 1,
          }}
        >
          <LocalShippingIcon
            sx={{
              fontSize: "100px",
              color: "#1976d2",
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Parçaları Teslim Alın
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#555", marginTop: { xs: "0.25rem", sm: "0.5rem" } }}
            >
              Kalite güvencesi, kalite kontrol raporları ve teslimat takibi
              sağlıyoruz.
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProcessSteps;
