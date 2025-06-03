import { CSSProperties } from "react";

const styles = {
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    px: { xs: 2, md: 8 },
    py: 2,
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  headerContainer: {
    width: "100%",
    maxWidth: "xl",
    margin: "0 auto",
    height: "90px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    objectFit: "contain",
    maxWidth: "100%",
    height: "auto",
  } as CSSProperties,
  badge: {
    cursor: "pointer",
  },
  menuIcon: {
    fontSize: { xs: 24, sm: 28, md: 32 },
  },
  button: {
    color: "white",
    textTransform: "none",
    fontSize: { xs: 16, md: 20 },
    fontWeight: 500,
  },
  menuList: {
    position: "absolute", // ✅ Header'dan bağımsız konumlandır
    top: "75%", // ✅ Header'ın hemen altında aç
    left: 0,
    width: "100vw", // ✅ Tam genişlikte olsun
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // Hafif gölge ekle
    zIndex: 999, // Menü en üstte olsun
  },
  link: {
    textDecoration: "none",
    display: "block",
    color: "#000",
  },
};

export default styles;
