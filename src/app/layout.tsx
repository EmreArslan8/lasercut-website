"use client";

import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "@/theme/theme";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <main style={{ minHeight: "calc(100vh - 200px)" }}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
