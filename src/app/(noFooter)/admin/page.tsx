"use client";

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
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
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
  form_data: FormData | null;
  status: string; // Statü yönetimi için eklendi
}

const AdminPanel = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const statuses = [
    "İletişim Bekleniyor",
    "İletişim Kuruldu",
    "Üretimde",
    "Kargoda",
    "Teslim Edildi",
  ];

  // Veritabanından dosyaları çek
  useEffect(() => {
    const fetchFiles = async () => {
      const { data, error } = await supabase
        .from("files")
        .select("id, file_name, form_data");

      if (error) {
        console.error("Veri çekme hatası:", error.message);
      } else {
        // Her dosyaya varsayılan statü ekle
        const filesWithStatus = data?.map((file) => ({
          ...file,
          status: "İletişim Bekleniyor", // Varsayılan statü
        }));
        setFiles(filesWithStatus || []);
      }
    };

    fetchFiles();
  }, []);

  const handleLogout = () => {
    // Çıkış yapma logic'i
    document.cookie = "is_admin=false; path=/;"; // Cookie'den admin yetkisini kaldır
    router.push("/login"); // Login sayfasına yönlendir
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getFileUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from("uploaded-files")
      .getPublicUrl(fileName);

    if (!data || !data.publicUrl) {
      console.error("Public URL alınamadı.");
      return null;
    }

    return data.publicUrl;
  };

  // Statü güncelleme (sadece state içinde yönetiliyor)
  const updateStatus = (id: number, newStatus: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) =>
        file.id === id ? { ...file, status: newStatus } : file
      )
    );
  };

  const filteredFiles = files.filter(
    (file) =>
      file.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.form_data?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.form_data?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const isAdmin = cookies.find((row) => row.startsWith("is_admin="));

    if (!isAdmin || isAdmin.split("=")[1] !== "true") {
      router.push("/login");
    }
  }, [router]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #4b6cb7, #182848)",
          paddingX: "16px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Admin Panel
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Avatar
              alt="Admin User"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 40, height: 40 }}
            />
            <Tooltip title="Çıkış Yap">
              <IconButton
                color="inherit"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Search Bar */}
        <Box sx={{ marginBottom: "24px", position: "relative" }}>
          <TextField
            fullWidth
            placeholder="Dosya adı, kullanıcı adı veya e-posta ara..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{
                    marginLeft: "8px",
                    marginRight: "-4px",
                    color: "#757575",
                  }}
                />
              ),
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Dosya Adı</strong></TableCell>
                <TableCell><strong>Ad Soyad</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Durum</strong></TableCell>
                <TableCell><strong>Dosya</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFiles.map((file) => (
                <TableRow key={file.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}>
                  <TableCell>{file.id}</TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                    }}
                    title={file.file_name} // Uzun dosya adını hover ile göster
                  >
                    {file.file_name}
                  </TableCell>
                  <TableCell>{file.form_data?.name || "Belirtilmedi"}</TableCell>
                  <TableCell>{file.form_data?.email || "Belirtilmedi"}</TableCell>
                  <TableCell>
                    <Select
                      value={file.status}
                      onChange={(e) => updateStatus(file.id, e.target.value)}
                      variant="outlined"
                      sx={{ width: "150px" }}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const url = getFileUrl(file.file_name);
                        if (url) {
                          window.open(url, "_blank");
                        } else {
                          alert("Dosya URL'si alınamadı.");
                        }
                      }}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.9rem",
                        padding: "6px 12px",
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
    </Box>
  );
};

export default AdminPanel;
