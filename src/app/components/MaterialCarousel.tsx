import React, { useState } from "react";
import { Box, Typography, Stack, Card, CardContent, CardMedia, Button } from "@mui/material";

const materials = [
  {
    value: "1050",
    label: "Alüminyum 1050",
    description:
      "Yüksek dayanıklılığı ve hafifliği ile endüstriyel uygulamalarda kullanılan bir malzeme.",
    image: "/static/images/sac-karbon-celik.png",
  },
  {
    value: "5754",
    label: "Alüminyum 5754",
    description:
      "Otomotiv ve denizcilik sektörlerinde korozyona dayanıklı bir seçenek.",
    image: "/static/images/sac-karbon-celik.png",
  },
  {
    value: "GalvanizliSac",
    label: "Çelik Galvanizli Sac",
    description:
      "Çinko kaplama sayesinde paslanmaya karşı dayanıklı ve uzun ömürlü.",
    image: "/static/images/materials/galvanizlisac.png",
  },
];

const MaterialCardList: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedMaterial(value);
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
        minHeight: "100vh",
      }}
    >
     

      <Stack spacing={3}>
        {materials.map((material) => (
          <Card
            key={material.value}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              boxShadow: selectedMaterial === material.value ? "0 0 10px #1976d2" : "0 2px 6px rgba(0, 0, 0, 0.1)",
              border: selectedMaterial === material.value ? "2px solid #1976d2" : "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              "&:hover": { boxShadow: "0 0 10px rgba(25, 118, 210, 0.5)" },
            }}
            onClick={() => handleSelect(material.value)}
          >
            {/* Sol tarafta resim */}
            <CardMedia
              component="img"
              sx={{ width: 150, height: 150, objectFit: "contain", padding: 2 }}
              image={material.image}
              alt={material.label}
            />

            {/* Sağ tarafta bilgi */}
            <CardContent>
              <Typography variant="h5" fontWeight="bold" sx={{ marginBottom: 1 }}>
                {material.label}
              </Typography>
              <Typography variant="body1" color="textSecondary" sx={{ marginBottom: 1 }}>
                {material.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={(e) => {
                  e.stopPropagation(); // Kartın seçilmesini engellemez
                  console.log("Seçilen materyal formda saklanıyor:", material.label);
                }}
              >
                Seç
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {selectedMaterial && (
        <Box sx={{ marginTop: 4, padding: 3, background: "#fff", borderRadius: "8px" }}>
          <Typography variant="h6">
            Seçili Materyal:{" "}
            <Typography component="span" fontWeight="bold" color="primary">
              {materials.find((material) => material.value === selectedMaterial)?.label}
            </Typography>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MaterialCardList;
