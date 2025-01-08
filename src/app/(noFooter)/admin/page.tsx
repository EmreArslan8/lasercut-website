'use client';

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { supabase } from "@/lib/api/supabaseClient";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FileData {
  id: number;
  file_name: string;
  form_data: FormData; // JSON formatındaki form verisi
}

const AdminPage = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from("files") // Tablonun adı
        .select("id, file_name, form_data");

      if (error) {
        console.error("Veri çekme hatası:", error.message);
      } else {
        setFiles(data || []);
      }
    };

    fetchFiles();
  }, []);

  const getFileUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from("uploaded-files") // Bucket adı
      .getPublicUrl(fileName);

    if (!data || !data.publicUrl) {
      console.error("Public URL alınamadı.");
      return null;
    }

    return data.publicUrl; // Public URL döner
  };

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const isAdmin = cookies.find((row) => row.startsWith("is_admin="));

    if (!isAdmin || isAdmin.split("=")[1] !== "true") {
      router.push("/"); // Admin değilse ana sayfaya yönlendir
    }
  }, [router]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
        backgroundColor: "#f7f7f7",
      }}
    >
      {/* Admin Paneli Başlığı */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: "16px",
          background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Admin Paneli
      </Typography>
      <Typography
        variant="body1"
        sx={{
          marginBottom: "24px",
          color: "#555",
        }}
      >
        Dosya yönetimi ve kullanıcı bilgilerini buradan görüntüleyebilirsiniz.
      </Typography>

      {/* Dosya Tablosu */}
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Dosya Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Ad Soyad</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Telefon</strong>
              </TableCell>
              <TableCell>
                <strong>Dosya URL&#39;si</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.id}</TableCell>
                <TableCell>{file.file_name}</TableCell>
                <TableCell>{file.form_data?.name || "Belirtilmedi"}</TableCell>
                <TableCell>{file.form_data?.email || "Belirtilmedi"}</TableCell>
                <TableCell>{file.form_data?.phone || "Belirtilmedi"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      const url = getFileUrl(file.file_name);
                      if (url) {
                        window.open(url, "_blank"); // Yeni sekmede dosyayı aç
                      } else {
                        alert("Dosya URL'si alınamadı.");
                      }
                    }}
                    sx={{
                      textTransform: "none",
                      background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #4b0fb4, #1f5fd9)",
                      },
                    }}
                  >
                    Görüntüle
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminPage;
