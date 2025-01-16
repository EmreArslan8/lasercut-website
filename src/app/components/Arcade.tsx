import { Container, Box, Typography } from "@mui/material";

export function ArcadeEmbed() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // Yatay ortalama
        alignItems: "center", // Dikey ortalama
        textAlign: "center",
        backgroundColor: "#f9f9f9", 
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Başlık */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#1976d2",
            textTransform: "uppercase",
          }}
        >
          How It Works
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: "#555",
          }}
        >
          Discover the process step by step with our interactive guide.
        </Typography>

        {/* Embed Alanı */}
        <Box
          sx={{
            position: "relative",
            paddingBottom: "calc(56.67989417989418% + 41px)",
            height: 0,
            width: "100%",
            overflow: "hidden",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
         <iframe
        src="https://demo.arcade.software/0SJCE7FxL3oN7PlWiN1c?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true"
        title="https://drawtocut.com/en"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
        </Box>
      </Container>
    </Box>
  );
}
