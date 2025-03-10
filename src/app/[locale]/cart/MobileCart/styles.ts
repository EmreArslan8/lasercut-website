import theme from "@/theme/theme";

const styles = {
  cartContainer: { p: 2, mt: 19 },
  emptyCart: {
   gap: 5,
    alignItems: "center",
    justifyContent: "center",
    p: 4,
    borderRadius: "8px",
    textAlign: "center",
    mt: 5,
    
  },
  cartCard: {
    mb: 2,
    p: 2,
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    border: "1px solid grey.300",
    position: "relative",
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    pb: 1,
    mb: 2,
  },
  textSecondary: { fontSize: 14, color: "textSecondary" },
  productLayout: {
    display: "grid",
    gridTemplateColumns: "6fr 1fr",
    gap: 2,
    width: "100%",
  },
  itemPrice: { display: "flex", alignItems: "center", gap: 0.5 },
  totalPrice: { fontSize: 18, fontWeight: "bold", mt: 1 },
  quantityContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "4px 8px",
  },
  svg: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  deleteButton: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    mt: 1,
    cursor: "pointer",
    color: "error.main",
  },
  materialInfoBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    padding: "8px",
    mt: 2,
  },
  modal: {
    width: "80%",
    bgcolor: "white",
    p: 4,
    mx: "auto",
    my: "20vh",
    boxShadow: 24,
    textAlign: "center",
    borderRadius: 2,
  },
  loading: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999, // Ensure it appears above everything
  },
  terms: { mt: 2 },
};

export default styles;
