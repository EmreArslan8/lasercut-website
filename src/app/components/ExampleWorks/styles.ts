
const styles = {
  sliderContainer: {
    mt: 4,
    maxWidth: "xl",
    backgroundColor: "transparent",
    "& .slick-track": {
      display: "flex",
      gap: "10px",
    },
  },

  sliderTitle: {
    mb: 4,
    textAlign: "center",
  },

  slideBox: {
    position: "relative",
    cursor: "pointer",
    height: { xs: 400, sm: 400, md: 400 },
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

};

export default styles;
