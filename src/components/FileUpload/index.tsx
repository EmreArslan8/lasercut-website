"use client";

import { useRef, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useTranslations } from "next-intl";
import FileUploadDrawer from "./FileUploadDrawer";
import { useDrawer } from "@/context/DrawerContext";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  files?: File[];
  setUploadedFiles: (files: File[]) => void;
}

const allowedExtensions = [".jpg", ".jpeg", ".png", ".pdf", ".dxf", ".stp"];

const FileUpload = ({ onFileUpload, files = [] }: FileUploadProps) => {
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
  const { setDrawerOpen } = useDrawer();

  const isValidFile = (fileName: string) =>
    allowedExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));

  const filterValidFiles = (fileArray: File[]) => {
    const validFiles = fileArray.filter((file) => isValidFile(file.name));
    const invalidFiles = fileArray.filter((file) => !isValidFile(file.name));

    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map((file) => file.name).join(", ");
      setSnackbarMessage(
        `The following files are not supported: ${invalidFileNames}. Please only upload allowed types: ${allowedExtensions.join(
          ", "
        )}`
      );
      setSnackbarOpen(true);
    }

    return validFiles;
  };

  const uploadDXFFile = async (file: File) => {
    setLoadingSvg(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-dxf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("❌ DXF işleme başarısız!");

      const result = await response.json();

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
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = filterValidFiles(droppedFiles);

    onFileUpload([...files, ...validFiles]);
    setDrawerOpen(true);

    const dxfFile = validFiles.find((file) =>
      file.name.toLowerCase().endsWith(".dxf")
    );
    if (dxfFile) uploadDXFFile(dxfFile);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = filterValidFiles(selectedFiles);

    onFileUpload([...files, ...validFiles]);
    setDrawerOpen(true);

    const dxfFile = validFiles.find((file) =>
      file.name.toLowerCase().endsWith(".dxf")
    );
    if (dxfFile) uploadDXFFile(dxfFile);
  };

  return (
    <>
      <FileUploadDrawer
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="warning">{snackbarMessage}</Alert>
      </Snackbar>
    </>
  );
};

export default FileUpload;
