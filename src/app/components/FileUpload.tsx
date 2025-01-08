"use client";

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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useTranslations } from "next-intl";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  files?: File[];
  onOpenForm?: () => void;
  isSubmitted?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  files = [],
  onOpenForm = () => { },
}) => {
  const t = useTranslations("File");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const handleAddFile = () => {
    console.log("handleAddFile triggered");
    if (fileInputRef.current) {
      console.log("File input exists. Current value:", fileInputRef.current.value);
      fileInputRef.current.value = ""; // Dosya seçimini sıfırlayın
      fileInputRef.current.click();
      console.log("File input clicked.");
    } else {
      console.log("File input ref is null.");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFileSelect triggered");
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      console.log("Files selected:", selectedFiles);
      const fileArray = Array.from(selectedFiles);
      onFileUpload([...files, ...fileArray]);
      event.target.value = ""; // Seçim sonrası sıfırla
    } else {
      console.log("No files selected.");
    }
  };


  return (
    <Box
      sx={{
        textAlign: "center",
        p: isMobile ? "16px" : "32px",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        border: "1px dashed #ccc",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
        marginTop: "30px",
        "&:hover": {
          borderColor: "#1976d2",
        },
      }}
      onClick={handleAddFile}
    >
      <Stack spacing={isMobile ? 1 : 2} alignItems="center">
        <UploadFileIcon
          sx={{ fontSize: isMobile ? "36px" : "67px", color: "#1976d2" }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "bold",
            fontSize: isMobile ? "16px" : "18px",
          }}
        >
          {files.length === 0 ? t("uploadPrompt") : t("uploadedFiles")}
        </Typography>
        {files.length === 0 && (
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              fontSize: "14px",
              maxWidth: "320px",
            }}
          >
            {t("uploadDescription")}
          </Typography>
        )}
        {files.length > 0 && (
          <List sx={{ width: "100%", maxWidth: 320, margin: "0 auto" }}>
            {files.map((file, index) => (
              <ListItem
                key={index}
                sx={{
                  padding: "4px 0",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                <ListItemIcon>
                  <InsertDriveFileIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={file.name}
                  primaryTypographyProps={{
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            variant="outlined"
            sx={{
              borderColor: "#1976d2",
              color: "#1976d2",
              "&:hover": {
                borderColor: "#145ca8",
                color: "#145ca8",
              },
              fontSize: isMobile ? "12px" : "14px",
              padding: isMobile ? "6px 12px" : "8px 16px",
            }}
          >
            {t("addFile")}
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
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#145ca8",
                },
                fontSize: "14px",
                padding: "6px 12px",
              }}
            >
              {t("getQuote")}
            </Button>
          )}
        </Stack>
      </Stack>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={(e) => {
          handleFileSelect(e);
          e.target.value = ""; // Seçim sonrasında sıfırla
        }}
      />

      {files.length === 0 && (
        <Typography
          variant="caption"
          sx={{
            display: "block",
            marginTop: isMobile ? "8px" : "12px",
            color: "#777",
            fontSize: isMobile ? "10px" : "12px",
          }}
        >
          {t("secureUploads")}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
