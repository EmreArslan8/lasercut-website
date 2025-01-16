import React from "react";
import { Box, Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";
import { useTranslations } from "next-intl";

interface MaterialCardListProps {
  selectedMaterial: string;
  onMaterialSelect: (value: string) => void;
}





const MaterialCardList: React.FC<MaterialCardListProps> = ({ selectedMaterial, onMaterialSelect }) => {
  const t = useTranslations("MaterialCardList");
  const materials = [
    {
      value: "1050",
      label: t("materials.1050"),
      description: t("materials.1050_description"),
      image: "/static/images/aluminyum.png",
    },
    {
      value: "5754",
      label: t("materials.5754"),
      description: t("materials.5754_description"),
      image: "/static/images/aluminyum.png",
    },
    {
      value: "GalvanizliSac",
      label: t("materials.GalvanizliSac"),
      description: t("materials.GalvanizliSac_description"),
      image: "/static/images/galvaniz.png",
    },
    {
      value: "SiyahSac",
      label: t("materials.SiyahSac"),
      description: t("materials.SiyahSac_description"),
      image: "/static/images/galvaniz.png",
    },
    {
      value: "DC01",
      label: t("materials.DC01"),
      description: t("materials.DC01_description"),
      image: "/static/images/sac-karbon-celik.png",
    },
    {
      value: "ST37",
      label: t("materials.ST37"),
      description: t("materials.ST37_description"),
      image: "/static/images/st37.png",
    },
    {
      value: "Paslanmaz304",
      label: t("materials.Paslanmaz304"),
      description: t("materials.Paslanmaz304_description"),
      image: "/static/images/paslanmaz-sac.png",
    },
    {
      value: "Paslanmaz316L",
      label: t("materials.Paslanmaz316L"),
      description: t("materials.Paslanmaz316L_description"),
      image: "/static/images/paslanmaz-sac.png",
    },
  ];
  
  return (
    <Box sx={{ overflowY: "auto" }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Materyal Seçimi
      </Typography>
      <Stack spacing={3}>
        {materials.map((material) => (
          <Card
            key={material.value}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              boxShadow:
                selectedMaterial === material.value
                  ? "0 0 10px #1976d2"
                  : "0 2px 6px rgba(0, 0, 0, 0.1)",
              border:
                selectedMaterial === material.value
                  ? "2px solid #1976d2"
                  : "1px solid #ddd",
              borderRadius: "8px",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "0 0 10px rgba(25, 118, 210, 0.5)",
              },
            }}
            onClick={() => onMaterialSelect(material.value)}
          >
            <CardMedia
              component="img"
              sx={{ width: 150, height: 150, objectFit: "contain", padding: 2 }}
              image={material.image}
              alt={material.label}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 1 }}>
                {material.label}
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
