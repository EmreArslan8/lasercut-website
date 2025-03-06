import React from "react";
import { Box, Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";
import { useTranslations } from "next-intl";

interface MaterialCardListProps {
  selectedMaterial: string;
  onMaterialSelect: (value: string) => void;
}
interface Material {
  key: string;
  name: string;
  description: string;
  image: string;
}

const MaterialCardList: React.FC<MaterialCardListProps> = ({ selectedMaterial, onMaterialSelect }) => {
  const t = useTranslations("OrderDetails");
  const materials = t.raw("materials") as Material[];

  return (
    <Box sx={{ overflowY: "auto" }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        {t("materialSelection")}
      </Typography>
      <Stack spacing={3}>
        {materials.map((material) => (
          <Card
            key={material.key}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              boxShadow:
                selectedMaterial === material.key
                  ? "0 0 10px #1976d2"
                  : "0 2px 6px rgba(0, 0, 0, 0.1)",
              border:
                selectedMaterial === material.key
                  ? "2px solid #1976d2"
                  : "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "0 0 10px rgba(25, 118, 210, 0.5)",
              },
            }}
            onClick={() => onMaterialSelect(material.key)}
          >
            <CardMedia
              component="img"
              sx={{ width: 150, height: 150, objectFit: "contain", padding: 2 }}
              image={material.image}
              alt={material.name}
            />
            <CardContent sx={{ textAlign: "left" }}>  {/* Metinleri sola yasladık */}
              <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 1 }}>
                {material.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                {material.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default MaterialCardList;
