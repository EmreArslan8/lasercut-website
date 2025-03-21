import theme from "@/theme/theme";

const styles = {
  wrapper: { width: "100%", py: 8 },
  container: { gap: 10 },
  sectionTitle: {
    color: theme.palette.primary.dark,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 100,
    mb: {xs: 1, md: 3},
    bgColor: "white",
    fontSize: {xs: "24px", sm: "20px", md: "24px"},
    display: { xs: "none", sm: "block" }, 
  },
  buttonDescription: {
    mb: { xs: 3, md: 2 },
    textAlign: "center",
    maxWidth: 600,
    mx: "auto",
    fontSize: { xs: "16px", md: "20px" },
    display: { xs: "none", sm: "block" }, 
  },
  title: {
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    fontSize: { xs: "24px", md: "32px" },
    mb: 2
  },
  description: {
    mb: { xs: 1, md: 4 },
    textAlign: "center",
    maxWidth: 600,
    mx: "auto",
    fontSize: { xs: "16px", md: "20px" },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 2,

  },
  sectionWrapper: {
    maxWidth: "lg",
    m: "0 auto",
    backgroundColor: {sm: "#f5f5f5", },
    background: { md: `linear-gradient(180deg, #ffffff 0%, #eef2ff 30%, #c7d2fe 60%, #60a5fa 90%)`},
    pb: {xs:0 , md: 3 },
    pt: 1,
    py: {xs:2 , md: 3 },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 1,
  },
  frameWrapper: {
    position: "relative",
    paddingBottom: {
      xs: "calc(75%)",
      sm: "calc(65.5%)",
      md: "calc(56%)",
    },
    height: 0,
    width: { xs: "100%", },
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
