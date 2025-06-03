const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
    },
    mainContent: {
      flex: 7,
      padding: { xs: 1, md: 3},
      position: "relative",
      overflowY: "visible",
      mt: {xs: 5}
    },
    fileHeader: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      marginBottom: 4,
    },
    fileName: {
      fontWeight: 600,
      wordBreak: "break-word",
      whiteSpace: "normal",
      overflow: "visible",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
    inputGroup: {
      display: "flex",
      gap: 2,
      marginTop: 2,
    },
    materialList: {
      flex: 3,
      background: "#f5f5f5",
      padding: 3,
      overflowY: "auto",
      maxHeight: "90vh",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: 5,
    },
    checkbox: {
      transform: "scale(1.5)",
      width: "12px",
      height: "12px",
    },
    noteField: {
      marginTop: 2,
    },
    addToCartButton: {
      marginTop: 3,
    },
  };
  
  export default styles;
  