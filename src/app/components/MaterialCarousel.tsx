import React from "react";
import { Box, Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";

interface MaterialCardListProps {
  selectedMaterial: string;
  onMaterialSelect: (value: string) => void;
}

const materials = [
  { value: "1050", label: "Alüminyum 1050", description: "Dayanıklı ve hafif.", image: "/static/images/sac-karbon-celik.png" },
  { value: "5754", label: "Alüminyum 5754", description: "Korozyona dayanıklı.", image: "/static/images/sac-karbon-celik.png" },
  { value: "GalvanizliSac", label: "Çelik Galvanizli Sac", description: "Paslanmaya karşı dayanıklı.", image: "/static/images/materials/galvanizlisac.png" },
];

const MaterialCardList: React.FC<MaterialCardListProps> = ({
  selectedMaterial,
  onMaterialSelect,
}) => {
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
