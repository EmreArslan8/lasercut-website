import React from "react";
import { Box, Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./styles"; 

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
    <Box sx={styles.container}>
      <Typography variant="h6" sx={styles.title}>
        {t("materialSelection")}
      </Typography>
      <Stack spacing={3}>
        {materials.map((material) => (
          <Card
            key={material.key}
            sx={styles.card(selectedMaterial === material.key)}
            onClick={() => onMaterialSelect(material.key)}
          >
            <CardMedia
              component="img"
              sx={styles.cardMedia}
              image={material.image}
              alt={material.name}
            />
            <CardContent sx={styles.cardContent}>
              <Typography variant="h5" sx={styles.cardTitle}>
                {material.name}
              </Typography>
              <Typography variant="body1" sx={styles.cardDescription}>
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
