"use client";

import React, { useEffect, useState } from "react";
import {
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

const FilesTable = () => {
  const [files, setFiles] = useState<FileData[]>([]);

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

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Dosya Adı</strong></TableCell>
            <TableCell><strong>Ad Soyad</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Telefon</strong></TableCell>
            <TableCell><strong>Dosya URL&#39;si</strong></TableCell>
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
                >
                  Görüntüle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FilesTable;
