

const styles = {
  container: (isDragging: boolean) => ({
    textAlign: "center",
    p: 4,
    border: "1px dashed #ccc",
    borderRadius: 2,
    mx: "auto",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    cursor: "pointer",
    mt: 4,
    backdropFilter: "blur(10px)", // Blur efekti ekler
    background: isDragging
      ?  "linear-gradient(135deg, #e3f2fd, #bbdefb)"
      : "linear-gradient(135deg, #f5f7fa, #c3cfe2)", // Normalde daha hafif beyazlık
    "&:hover": {
      borderColor: "#1976d2",
      background: "rgba(255, 255, 255, 0.5)", // Hover olunca biraz daha belirgin
    },
}),

  
  drawer: {
    width: "100vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
 
  },

  drawerContent: {
    p: 3,
    textAlign: "center",
    width: "100%"
  },
  dropZone: (isDragging: boolean) => ({
    border: `2px dashed ${isDragging ? "#1976d2" : "#bdbdbd"}`,
    backgroundColor: "#fff",
    padding: "40px", 
    transition: "all 0.3s ease",
    cursor: "pointer",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: isDragging
      ? "0px 4px 15px rgba(25, 118, 210, 0.3)"
      : "0px 4px 10px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      borderColor: "#1976d2", 
      backgroundColor: "#fff",
    },
  }),

  button: {
    variant: "contained",
    size: "large",
    mt: 2,
    width: "100%",
  },

  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },

  image: (isMobile: boolean) => ({
    width: isMobile ? 100 : 120,
    height: isMobile ? 100 : 120,
  }),

  snackbar: {
    autoHideDuration: 6000,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    fontSize: {xs: 24, sm: 30,  md: 36}
  },
};

export default styles;
