import theme from "@/theme/theme";

const styles = {
  wrapper: { width: "100%", py: 8 },
  container: { gap: 10 },
  sectionTitle: {
    color: theme.palette.primary.dark,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    mb: 1,
    fontSize: { xs: "18px", md: "22px" },
    bgColor: "white"
  },
  title: {
    fontWeight: "bold",
    mb: 2,
    color: "#222",
    textAlign: "center",
    fontSize: { xs: "24px", md: "32px" },
  },
  description: {
    mb: {xs: 1, md: 4},
    textAlign: "center",
    maxWidth: 600,
    mx: "auto",
    fontSize: { xs: "16px", md: "20px" },
  },
  frameWrapper: {
    position: "relative",
    paddingBottom: "calc(51.80159256801593% + 41px)",
    height: 0,
    width: {xs: "100%", md: "80%"},
    m: "0 auto",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    colorScheme: "light",
  },


    paperWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      mt: { xs: 2, md: 6 },
    },
    paper: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      alignItems: "center",
      justifyContent: "space-between",
      textAlign: { xs: "center", md: "left" },
      p: { xs: 2, md: 4 },
      gap: { xs: 2, md: 4 },
      borderRadius: 4,
      width: "100%",
      maxWidth: "900px",
      mx: "auto",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
      gap: { xs: 1, md: 2 },
      flex: { xs: 6, md: 4 },
    },
    title2: {
      fontWeight: "bold",
      mb: 2,
    },
    buttonGroup: {
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
      gap: { xs: 1, md: 2 },
      width: "100%",
      alignItems: "center",
      justifyContent: { xs: "center", md: "flex-start" },
    },
    description2: {
      fontSize: { xs: "16px", md: "18px" },
      color: "text.secondary",
      fontWeight: "bold",
      mt: 2,
    },
    paperImage: {
      width: { xs: "140px", md: "180px" },
      height: "auto",
      flexShrink: 0,
      flex: { xs: 6, md: 8 },
      ml: { md: "auto" },
    },
  };
  

  
  export default styles;
  