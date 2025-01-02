"use client";

import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./components/Header/page";
import Footer from "./components/Footer/page";
import theme from "@/theme/theme";


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
          {children}
       <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
