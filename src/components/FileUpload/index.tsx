"use client";

import { useRef, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTranslations } from "next-intl";
import FileUploadDrawer from "./FileUploadDrawer";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  files?: File[];
  setUploadedFiles: (files: File[]) => void;
  setDrawerOpen?: (open: boolean) => void;  // 🔹 Opsiyonel hale getirildi
  drawerOpen?: boolean;                     // 🔹 Opsiyonel hale getirildi
}



const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf", ".dxf", ".stp"];

const FileUpload = ({
  onFileUpload,
  files = [],
  setUploadedFiles,
  setDrawerOpen, // 🔹 Prop olarak aldık
  drawerOpen,   // 🔹 Prop olarak aldık
}: FileUploadProps) => {
  const t = useTranslations("File");
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const [isDragging, setIsDragging] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [svgData, setSvgData] = useState<{
    svg: string;
    width: string;
    height: string;
    contourLength: string;
  } | null>(null);
  const [loadingSvg, setLoadingSvg] = useState(false);

  const isValidFile = (fileName: string) => {
    return allowedExtensions.some((ext) =>
      fileName.toLowerCase().endsWith(ext)
    );
  };

  const filterValidFiles = (fileArray: File[]) => {
    const validFiles = fileArray.filter((file) => isValidFile(file.name));
    const invalidFiles = fileArray.filter((file) => !isValidFile(file.name));

    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map((file) => file.name).join(", ");
      setSnackbarMessage(
        `Şu dosyalar desteklenmiyor: ${invalidFileNames}. Lütfen yalnızca izin verilen türleri yükleyin: ${allowedExtensions.join(
          ", "
        )}`
      );
      setSnackbarOpen(true);
    }

    return validFiles;
  };

  const handleDrawerClose = () => {
    if (setDrawerOpen) {
      setDrawerOpen(false);
    }
    setUploadedFiles([]);
    setSvgData(null);
  };
  

  const uploadDXFFile = async (file: File) => {
    setLoadingSvg(true);
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      console.log("📤 DXF dosyası API'ye gönderiliyor:", file.name);
      const response = await fetch("/api/upload-dxf", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("❌ DXF işleme başarısız!");
      }
  
      const result = await response.json();
      console.log("✅ API Yanıtı:", result);
  
      setSvgData({
        svg: result.svg,
        width: result.width,
        height: result.height,
        contourLength: result.contourLength,
      });
  
    } catch (error) {
      console.error("❌ SVG alma hatası:", error);
    } finally {
      setLoadingSvg(false);
    }
  };
  

 
const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  setIsDragging(false);
  const droppedFiles = event.dataTransfer.files;
  if (droppedFiles) {
    const fileArray = Array.from(droppedFiles);
    const validFiles = filterValidFiles(fileArray);
    onFileUpload([...files, ...validFiles]);

    if (setDrawerOpen) { // ✅ Tanımlı mı kontrol ettik
      setDrawerOpen(true);
    }

    const dxfFile = validFiles.find((file) =>
      file.name.toLowerCase().endsWith(".dxf")
    );
    if (dxfFile) {
      uploadDXFFile(dxfFile);
    }
  }
};

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      const validFiles = filterValidFiles(fileArray);
      onFileUpload([...files, ...validFiles]);
  
      if (setDrawerOpen) { // ✅ Tanımlı mı kontrol ettik
        setDrawerOpen(true);
      }
  
      const dxfFile = validFiles.find((file) =>
        file.name.toLowerCase().endsWith(".dxf")
      );
      if (dxfFile) {
        uploadDXFFile(dxfFile);
      }
    }
  };

  return (
    <>
    {/*
      <Box sx={styles.container(isDragging)}>
        <Stack spacing={2} alignItems="center" gap={1}>
          <Typography variant="h3" sx={{ fontWeight: "normal", color: "white"}} >
            {files.length === 0 ? t("uploadPrompt") : t("uploadedFiles")}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: "normal", color: "white"}}>
            {t("uploadDescription")}
          </Typography>
          <Button
  variant="contained"
  size="large"
  onClick={() => setDrawerOpen && setDrawerOpen(true)} // undefined olup olmadığını kontrol ettik
>
            <Icon name="publish" />
            {t("addFile")}
          </Button>
          <Typography variant="body" sx={{ mt: "10px" }} >
            {t("secureUploads")}
          </Typography>
        </Stack>
      </Box>
      >*/}
      <FileUploadDrawer
  open={drawerOpen ?? false}  // Eğer undefined ise false ata
  onClose={handleDrawerClose}
  files={files}
  svgData={svgData}
  loadingSvg={loadingSvg}
  isDragging={isDragging}
  setIsDragging={setIsDragging}
  handleDrop={handleDrop}
  handleFileSelect={handleFileSelect}
  fileInputRef={fileInputRef}
/>


      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="warning">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default FileUpload;
