import { palette } from "@/theme/theme";
import { Box, Typography, Grid, Stack, Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";
import {
  Activity,
  Gauge,
  Layers3,
  Boxes,
  CheckCircle2,
  FileCheck2,
  History
} from "lucide-react";

const icons = {
  highSpeed: <History size={28} />,
  highPrecision: <Gauge size={28} />,
  advancedSurface: <Layers3 size={28} />,
  materialSelection: <Boxes size={28} />,
  qualityControl: <CheckCircle2 size={28} />,
  certificatesReports: <FileCheck2 size={28} />,
};


const AdvantagesSection = () => {
  const t = useTranslations("Advantages");
  const items = [
    { key: "highSpeed" },
    { key: "highPrecision" },
    { key: "advancedSurface" },
    { key: "materialSelection" },
    { key: "qualityControl" },
    { key: "certificatesReports" },
  ];
  return (
    <Box sx={{ py: 8,    background: palette.customPrimary[700], color: "white" }}>
      <Typography variant="h4" textAlign="center" mb={6}>
      {t("sectionTitle")}
      </Typography>
      <Grid2
        container
        spacing={4}
        justifyContent="center"
        maxWidth="lg"
        mx="auto"
      >
         {items.map(({ key }) => (
           <Grid2 size={{xs:12, sm:6, md:4}} key={key}>
            <Stack
              spacing={2}
              p={4}
             
              sx={{
                
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #016fbf, #3f8efc, #00c6ff)"




                }}
              >
                   {icons[key as keyof typeof icons]}
              </Box>
              <Typography variant="h6" fontWeight="bold">
                {t(`${key}.title`)}
              </Typography>
              <Typography variant="body2" >
                {t(`${key}.description`)}
              </Typography>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default AdvantagesSection;
