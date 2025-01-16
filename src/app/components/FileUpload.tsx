"use client";

import { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";
import useScreen from "@/lib/hooks/useScreen";
import Image from "next/image";
import Icon from "./Icon";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  files?: File[];
}

const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf", ".dxf", ".stp"];

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, files = [] }) => {
  const t = useTranslations("File");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isMobile = useScreen();
  const [isDragging, setIsDragging] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const isValidFile = (fileName: string) => {
    return allowedExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const filterValidFiles = (fileArray: File[]) => {
    const validFiles = fileArray.filter((file) => isValidFile(file.name));
    const invalidFiles = fileArray.filter((file) => !isValidFile(file.name));

    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map((file) => file.name).join(", ");
      setSnackbarMessage(
        `Şu dosyalar desteklenmiyor: ${invalidFileNames}. Lütfen yalnızca izin verilen türleri yükleyin: ${allowedExtensions.join(", ")}`
      );
      setSnackbarOpen(true);
    }

    return validFiles;
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles) {
      const fileArray = Array.from(droppedFiles);
      const validFiles = filterValidFiles(fileArray);
      onFileUpload([...files, ...validFiles]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleAddFile = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      const validFiles = filterValidFiles(fileArray);
      onFileUpload([...files, ...validFiles]);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <>
      {/* Görseller */}


      <Box
        sx={{
          textAlign: "center",
          maxWidth: "lg",
          p: isMobile ? 2 : 4,
          border: "1px dashed #ccc",
          borderRadius: 1,
          mx: 'auto', // Ortalamak için
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
          mt: 4,
          "&:hover": {
            borderColor: "#1976d2",
          },
          background: isDragging
            ? "linear-gradient(135deg, #e3f2fd, #bbdefb)"
            : "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        }}
        onClick={handleAddFile}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <Stack spacing={isMobile ? 1 : 2} alignItems="center" gap={2}>
        <Stack
          direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="/static/images/drop1.png"
          alt="Dropzone Illustration 1"
          width={isMobile ? 100 : 120}
          height={isMobile ? 100 : 120}
       
        />
        <Image
          src="/static/images/drop2.png"
          alt="Dropzone Illustration 2"
          width={isMobile ? 100 : 120}
          height={isMobile ? 100 : 120}
        />
        <Image
          src="/static/images/drop3.png"
          alt="Dropzone Illustration 3"
          width={isMobile ? 100 : 120}
          height={isMobile ? 100 : 120}
        />
      </Stack>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "16px" : "18px",
            }}
          >
            {files.length === 0 ? t("uploadPrompt") : t("uploadedFiles")}
          </Typography>
          {files.length === 0 && (
            <Typography variant="h4" sx={{ fontWeight: "normal" }}>
              {t("uploadDescription")}
            </Typography>
          )}

          <Stack direction="row" spacing={1} justifyContent="center">
            <Button variant="contained" size="large">
              <Icon name="publish" />
              {t("addFile")}
            </Button>
          </Stack>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            multiple
            onChange={(e) => {
              handleFileSelect(e);
              e.target.value = "";
            }}
          />
          <Typography
            variant="body"
            sx={{
              mt: "10px",
            }}
          >
            {t("secureUploads")}
          </Typography>
        </Stack>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={(e) => {
                e.stopPropagation();
                handleSnackbarClose(e);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FileUpload;
