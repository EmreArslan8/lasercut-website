"use client";

import {
  Box,
  Drawer,
  Stack,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./styles";
import Stepper from "../Stepper";
import OrderDetails from "../OrderDetails";
import Icon from "../common/Icon";
import { truncateText } from "@/utils/truncateText";

interface FileUploadDrawerProps {
  open: boolean;
  onClose: () => void;
  files: File[];
  svgData: {
    svg: string;
    width: string;
    height: string;
    contourLength: string;
  } | null;
  loadingSvg: boolean;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const FileUploadDrawer = ({
  open,
  onClose,
  files,
  svgData,
  loadingSvg,
  isDragging,
  setIsDragging,
  handleDrop,
  handleFileSelect,
  fileInputRef,
}: FileUploadDrawerProps) => {
  const t = useTranslations("File");
  const dxfFile = files.find((file) =>
    file.name.toLowerCase().endsWith(".dxf")
  );
  
  const uploadedFile = files.length > 0 ? files[0] : null;
  const isLoading = uploadedFile && (loadingSvg || (dxfFile && !svgData));

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: styles.drawer }}
    >
      <Box sx={styles.drawerContent}>
        <Icon name="close" sx={styles.closeButton} onClick={onClose} />

        {uploadedFile ? (
          isLoading ? (
            <Stack alignItems="center" sx={{ mt: 2 }}>
              <Typography sx={{ mb: 1, fontSize: "1.2rem", fontWeight: 500 }}>
                {truncateText(uploadedFile.name)}
              </Typography>
              <Typography sx={{ color: "#666" }}>{t("analyzing")}</Typography>
              <Typography sx={{ mt: 1, fontWeight: 500 }}>
              {t("loading")}
              </Typography>
              <LinearProgress sx={{ width: "80%", mt: 2 }} />
            </Stack>
          ) : dxfFile ? (
            <Stepper
              svg={svgData?.svg || ""}
              width={svgData?.width || ""}
              height={svgData?.height || ""}
              fileName={uploadedFile.name}
              file={uploadedFile} // ✅ Dosya bilgisini ekle
            />
          ) : (
            <OrderDetails files={files} onClose={onClose} />
          )
        ) : (
          <Box sx={{ textAlign: "center", maxWidth: "950px", margin: "auto" }}>
            <Typography variant="h2" sx={{ mb: 10 }}>
              {t("title")}
            </Typography>
            <Box
              sx={styles.dropZone(isDragging)}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDrop={handleDrop}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
            >
              <Stack spacing={3} alignItems="center">
                <Typography variant="h6">{t("drawerTitle")}</Typography>
                <Typography variant="body">{t("uploadDescription")}</Typography>
                <Button variant="contained" size="large">
                  <Icon name="upload" sx={{ fontSize: 22 }} />
                  {t("uploadFile")}
                </Button>
              </Stack>
              <Typography
                variant="bodySmall"
                sx={{
                  m: 5,
                }}
              >
               🔒 {t("drawerInfo")}
              </Typography>
            </Box>
          </Box>
        )}

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          multiple
          onChange={handleFileSelect}
        />
      </Box>
    </Drawer>
  );
};

export default FileUploadDrawer;
