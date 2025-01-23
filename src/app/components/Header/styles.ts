import { Theme } from "@mui/material/styles";

const styles = {
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`,
      maxWidth: "100%",
      width: "100%",
      px: 2,
      py: 2,
      backgroundColor: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    logoButton: {
      padding: 0,
      display: "flex",
      alignItems: "center",
    },
    menuButton: {
      borderRadius: "50%",
      backgroundColor: "grey.100",
      "&:hover": {
        backgroundColor: "grey.300",
      },
      marginLeft: "auto",
    },
    drawerPaper: {
      marginTop: "64px", // Header'ın yüksekliği kadar mesafe bırakır
      width: "100%",
      height: "calc(100% - 64px)",
      backgroundColor: "white",
      padding: "16px",
      animation: "slideDown 0.3s ease-in-out",
    },
    desktopMenu: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },
    desktopLink: {
      fontSize: "18px",
      fontWeight: 500,
      color: "black",
      textDecoration: "none",
      position: "relative",
      "&:hover": {
        borderBottom: "2px solid blue",
      },
    },
    desktopRight: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginLeft: "auto",
    },
    cartBadge: {
      "& .MuiBadge-badge": {
        fontSize: "14px",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "primary.main",
      },
    },
    mobileMenuContainer: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      marginLeft: "auto",
    },
  };
  
  export default styles;
  