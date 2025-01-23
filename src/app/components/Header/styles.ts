const styles = {
  container: {
    position: "relative",
    zIndex: 1000,
    backgroundColor: "#fff",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
    borderBottom: "1px solid #ddd",
    height: "70px",
  },
  mobileActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  desktopMenu: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  desktopActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  mobileMenu: {
    backgroundColor: "#f9f9f9",
    padding: "16px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  listItem: {
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
  },
  listItemText: {
    color: "#333",
    fontSize: "16px",
  },
};

export default styles;
