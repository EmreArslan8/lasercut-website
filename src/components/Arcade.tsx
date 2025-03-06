"use client";

import { useState } from "react";
import { Container, Typography, Button, Stack, Box } from "@mui/material";
import { useTranslations } from "next-intl";

export function ArcadeEmbed() {
  const t = useTranslations("HowItWorks");
  const [selectedFrame, setSelectedFrame] = useState<"dxf" | "other">("dxf");

  return (
    <Stack sx={{bgcolor: "white" , width: "100%", py: 4}}>
    <Container maxWidth="lg" >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 2,
          color: "#1976d2",
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {t("title")}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          mb: 4,
          color: "#555",
          textAlign: "center",
        }}
      >
        {t("description")}
      </Typography>

      {/* Butonlar */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Button
          variant={selectedFrame === "dxf" ? "contained" : "outlined"}
          color="primary"
          sx={{ px: 4, py: 1.5, borderRadius: "30px", fontWeight: "bold" }}
          onClick={() => setSelectedFrame("dxf")}
        >
          DXF Files
        </Button>
        <Button
          variant={selectedFrame === "other" ? "contained" : "outlined"}
          color="primary"
          sx={{ px: 4, py: 1.5, borderRadius: "30px", fontWeight: "bold" }}
          onClick={() => setSelectedFrame("other")}
        >
          Other Files
        </Button>
      </Stack>

      {/* Frame */}
      <Box
        sx={{
          position: "relative",
          paddingBottom: "calc(56.80159256801593% + 41px)",
          height: 0,
          width: "100%",
        }}
      >
        {selectedFrame === "dxf" && (
          <iframe
            src="https://demo.arcade.software/0SJCE7FxL3oN7PlWiN1c?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true"
            title="DXF Files"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
            allow="clipboard-write"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              colorScheme: "light",
            }}
          />
        )}

        {selectedFrame === "other" && (
          <iframe
            src="https://demo.arcade.software/ANOTHER_EXAMPLE_LINK"
            title="Other Files"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
            allow="clipboard-write"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              colorScheme: "light",
            }}
          />
        )}
      </Box>
    </Container>
    </Stack>
  );
}
