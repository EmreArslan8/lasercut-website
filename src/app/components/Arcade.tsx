import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export function ArcadeEmbed() {

  const t = useTranslations("HowItWorks");

  return (
    <Container maxWidth="lg">
       <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 2,
            color: "#1976d2",
            justifyContent: "center", // Yatay ortalama
            alignItems: "center", // Dikey ortalama
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
            justifyContent: "center", // Yatay ortalama
            alignItems: "center", // Dikey ortalama
            textAlign: "center",
          }}
        >
        {t("description")}
        </Typography>
  <div style={{ position: 'relative', paddingBottom: 'calc(56.80159256801593% + 41px)', height: 0, width: '100%' }}>
          
      <iframe
        src="https://demo.arcade.software/0SJCE7FxL3oN7PlWiN1c?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true"
        title="https://drawtocut.com/en"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        allow="clipboard-write"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', colorScheme: 'light' }}
      />
    </div>
    </Container>  )
}
