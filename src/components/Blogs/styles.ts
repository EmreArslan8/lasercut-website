const styles = {
    wrapper: {
      py:  { xs: "45px", md: "100px" },
      px: { xs: "20px", md: "50px" },
      textAlign: "center",
    },
    subTitle: {
      color: "primary.main",
      fontWeight: "bold",
      mb: 1,
    },
    title: {
      fontWeight: "bold",
      mb: 2,
    },
    desc: {
      maxWidth: "700px",
      mx: "auto",
      mb: 6,
    },
    imageWrapper: {
      position: "relative",
      width: "100%",
      height: "250px",
      mb: 2,
      overflow: "hidden",
      borderRadius: "8px",
      transition: "transform 0.5s ease, rotate 0.5s ease",
      "&:hover": {
        transform: "scale(1.05) rotate(4deg)",
      },
    },
    cardTitle: {
      fontWeight: "bold",
      mb: 1,
      textAlign: "left",
    },
    cardDesc: {
      textAlign: "left",
    },
    readMoreButton: {
        mt: 2,
        color: "primary.main",
        fontWeight: "bold",
        textTransform: "none",
        padding: 0,
        "&:hover": {
          backgroundColor: "transparent",
          color: "primary.dark",
          textDecoration: "underline",
        },
      },
  };
  
  export default styles;
  