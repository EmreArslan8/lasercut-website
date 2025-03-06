import theme from "@/theme/theme";

const styles = {
  sliderContainer: {
    mt: 4,
    width: "100%",  // Eklendi
    maxWidth:  { md: "xl" },
    overflow: "hidden",  // Eklendi
    margin: "0 auto",
    py:  { xs: "25px", md: "100px" },
    px: { md: "50px" },
    "& .slick-track": {
      display: "flex",
      gap: "10px",
    },
  },
  sectionTitle: {
    color: theme.palette.primary.dark,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    mb: 1,
    fontSize:  { xs: "0px", md: "22px" },
  },
  sectionHeading: {
    fontWeight: "bold",
    textAlign: "center",
    mb: 2,
    fontSize:  { xs: "24px", md: "45px" },
  },
  sectionDescription: {
    color: "text.secondary",
    textAlign: "center",
    maxWidth: 700,
    mx: "auto",
    mb: 4,
    px: { xs: "16px" },
    fontSize: { xs: "12px", md: "17px" },
  },
  slideBox: {
    position: "relative",
    cursor: "pointer",
    width: "100%",  // Eklendi
    height: { xs: 300, sm: 400, md: 400 },  // Mobil için daha küçük yükseklik
    "&:hover": { opacity: 0.8 },
  },
  
  modalContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "36px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    zIndex: 1000,
    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
  },

  arrowButton: (isLeft: boolean) => ({
    position: "absolute",
    [isLeft ? "left" : "right"]: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1000,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
  }),

  modalImageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    width: "100%",
    maxWidth: "1200px",
    overflow: "hidden",
  },
  navigateButton: {
    mt: 2,
    px: 4,
    py: 2,
  },
  slideImage: {
    objectFit: "cover",
    borderRadius: "12px",
  },
  galleryButton: {
    mt: 4,
    backgroundColor: theme.palette.customPrimary[700],
    color: "#fff",
    padding: "20px 50px",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    textTransform: "uppercase",
    border: "none",
    ":hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
};

export default styles;
