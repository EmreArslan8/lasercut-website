"use client";

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase.js"; // Firebase Auth eklendi
import { useRouter } from "next/navigation"; // Yönlendirme için Next.js router

interface Data {
  id: string;
  name?: string; // Opsiyonel hale getirildi
  email?: string;
  phone?: string;
}

const Dashboard = () => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Hata durumunu tutar
  const [isAuthorized, setIsAuthorized] = useState(false); // Yetki durumu
  const router = useRouter();

  const allowedEmails = ["admin@example.com", "another@example.com"]; // Yalnızca izin verilen e-posta adresleri

  useEffect(() => {
    const checkAuth = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user && allowedEmails.includes(user.email || "")) {
          setIsAuthorized(true);
        } else {
          router.push("/login"); // Yetkisiz kullanıcılar giriş sayfasına yönlendirilir
        }
      });
    };

    checkAuth();
  }, [router]);

  useEffect(() => {
    if (isAuthorized) {
      const fetchData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "teklifler"));
          const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(documents as Data[]);
        } catch (err) {
          console.error("Veri çekme hatası:", err);
          setError("Veriler alınırken bir hata oluştu.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthorized]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: "2rem" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: "2rem" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!isAuthorized) {
    return null; // Yüklenirken ya da yetkisizse hiçbir şey render edilmez
  }

  return (
    <Stack sx={{ minHeight: "100vh", padding: "1rem" }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: "1rem", textAlign: "center" }}
      >
        Kullanıcı Listesi
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ borderRadius: "8px", overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Ad</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Telefon</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name || "Belirtilmemiş"}</TableCell>
                <TableCell>{row.email || "Belirtilmemiş"}</TableCell>
                <TableCell>{row.phone || "Belirtilmemiş"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Dashboard;
