"use client"

import React, { useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void; // Zorunlu: Dosya yükleme işlevi
  files?: File[]; // Opsiyonel: Yüklenen dosyaların dizisi
  onOpenForm?: () => void; // Opsiyonel: Formu açma işlevi
  isSubmitted?: boolean; // Opsiyonel: Gönderim durumu
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  files = [],
  onOpenForm = () => { },
  isSubmitted = false, // Default olarak gönderim yapılmadı
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      onFileUpload([...files, ...fileArray]); // Mevcut dosyaları koruyarak yeni dosyaları ekler
    }
  };

  const handleAddFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (isSubmitted) {
    // Başarı mesajı gösterilecek alan
    return (
      <Box
        sx={{
          textAlign: "center",
          padding: "40px",
          background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          marginTop: "30px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
          Tebrikler!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "30px", color: "#555" }}>
          Dosyanız ve bilgileriniz başarıyla alındı. Firmamız en kısa sürede sizinle iletişime geçecektir.
        </Typography>
        <Button variant="contained" color="primary" href="/">
          Ana Sayfaya Dön
        </Button>
      </Box>
    );
  }

  // Normal FileUpload içeriği
  return (
    <Box
      onClick={handleAddFile}
      sx={{
        textAlign: "center",
        p: { xs: "16px", sm: "32px", md: '50px' },
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        border: "1px dashed #ccc",
        borderRadius: "12px",
        cursor: "pointer",
        marginTop: "30px",
        "&:hover": {
          borderColor: "#1976d2",
        },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
        {files.length === 0 ? "Modellerinizi yükleyin" : "Yüklenen Dosyalar"}
      </Typography>
      {files.length === 0 && (
        <Typography variant="body2" sx={{ marginBottom: "25px", color: "#555", fontSize: { xs: "15px", sm: "16px" } }} >
          CAD dosyanızı yüklemek teklif almanın en iyi yoludur.
        </Typography>
      )}

      {files.length > 0 && (
        <List>
          {files.map((file, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <InsertDriveFileIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={file.name}
                slotProps={{
                  primary: {
                    style: {
                      fontSize: "15px", // Font boyutunu 15px olarak ayarlar
                    },
                  },
                }}
              />

            </ListItem>
          ))}
        </List>
      )}

      <Stack
        direction="row"
        spacing={{ xs: 0, sm: 4 }}
        justifyContent="center"
        mt={4}
        onClick={(e) => e.stopPropagation()}
        sx={{
          flexDirection: { xs: "column", sm: "row" }, // Mobilde düğmeler alt alta
          alignItems: "center",
          gap: { xs: "8px", sm: "16px" },
        }}
      >
        <Button
          variant="outlined"
          onClick={handleAddFile}
          sx={{
            width: { xs: "100%", sm: "auto" }, // xs: tam genişlik, sm ve üstü: esnek genişlik
            flex: { xs: "none", sm: 1 },
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              borderColor: "#145ca8",
              color: "#145ca8",
            },
          }}
        >
          Dosya Ekle
        </Button>
        {files.length > 0 && onOpenForm && (
          <Button

            variant="contained"
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onOpenForm();
            }}
            sx={{
              width: { xs: "100%", sm: "auto" }, // xs: tam genişlik, sm ve üstü: esnek genişlik
              flex: { xs: "none", sm: 1 },
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#145ca8",
              },
            }}
          >
            Teklif Al
          </Button>
        )}
      </Stack>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileSelect}
      />

      {files.length === 0 && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            marginTop: "20px",
            color: "#777",
          }}
        >
          Tüm yüklemeler güvenli ve gizlidir.
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
