import React, { useState } from "react";
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, TextField, Button, Stack, Grid2 } from "@mui/material";

const DropdownContainer: React.FC = () => {
  const [material, setMaterial] = useState("St37"); // Malzeme seçimi
  const [thickness, setThickness] = useState(""); // Sac kalınlığı metin girişi
  const [thicknessUnit, setThicknessUnit] = useState("mm"); // Sac kalınlığı birimi
  const [quantity, setQuantity] = useState("1"); // Adet seçimi
  const [isNoteVisible, setIsNoteVisible] = useState(false); // Not alanı görünürlüğü için state
  const [note, setNote] = useState(""); // Not içeriği

  return (
    <Box
      sx={{
        padding: "20px",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        mt: 4,
      }}
    >
      {/* Başlık */}
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
        Sipariş Bilgileri
      </Typography>

      {/* Açıklama Metni */}
      <Typography variant="body1" sx={{ color: "#6b7280", marginBottom: "24px" }}>
        Lütfen sipariş bilgilerinizi doldurunuz. Malzeme, sac kalınlığı ve adet bilgilerini seçerek işleminize devam edebilirsiniz.
      </Typography>

      <Grid2 container spacing={2} sx={{ marginBottom: "16px" }}>
        {/* Malzeme Dropdown */}
        <Grid2 size={{xs: 12, md: 4}}>
          <FormControl fullWidth>
            <InputLabel>Malzeme</InputLabel>
            <Select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              label="Malzeme"
            >
              <MenuItem value="St37">St37</MenuItem>
              <MenuItem value="Alüminyum">Alüminyum</MenuItem>
              <MenuItem value="Paslanmaz Çelik">Paslanmaz Çelik</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        {/* Sac Kalınlığı ve Birimi */}
        <Grid2 size= {{xs: 12, md: 4}}>
          <Stack direction="row" spacing={1}>
            <TextField
              type="number"
              label="Sac Kalınlığı"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              placeholder="Değer girin"
              fullWidth
            />
            <FormControl sx={{ minWidth: "100px" }}>
              <InputLabel>Birim</InputLabel>
              <Select
                value={thicknessUnit}
                onChange={(e) => setThicknessUnit(e.target.value)}
              >
                <MenuItem value="mm">mm</MenuItem>
                <MenuItem value="cm">cm</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid2>

        {/* Adet Dropdown */}
        <Grid2 size= {{xs: 12, md:4}}>
          <FormControl fullWidth>
            <InputLabel>Adet</InputLabel>
            <Select
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              label="Adet"
            >
              {[...Array(10).keys()].map((num) => (
                <MenuItem key={num + 1} value={(num + 1).toString()}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>

      {/* Not Alanı ve Buton */}
      {!isNoteVisible ? (
        <Button
          variant="outlined"
          onClick={() => setIsNoteVisible(true)}
          sx={{
            borderColor: "#3b82f6",
            color: "#3b82f6",
            "&:hover": {
              borderColor: "#2563eb",
              backgroundColor: "#ebf4ff",
            },
            marginTop: "16px",
          }}
        >
          Siparişiniz ile ilgili not eklemek ister misiniz?
        </Button>
      ) : (
        <Box sx={{ marginTop: "16px" }}>
          <Typography
            variant="body1"
            sx={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            Notunuzu Yazın
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Notunuzu buraya yazın..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            sx={{
              marginBottom: "16px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default DropdownContainer;
