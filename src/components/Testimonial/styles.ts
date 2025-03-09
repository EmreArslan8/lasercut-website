const styles = {
    container: {
      py: 6,
      px: 6
    },
    textSection: {
      textAlign: { xs: "center", md: "left" }, // Mobilde ortala, büyük ekranda sola hizala
    },
    sectionBadge: {
      color: "orange",
      fontWeight: "bold",
      mb: 1,
    },
    sectionTitle: {
      fontSize: { xs: 24, sm: 32 },
      fontWeight: "bold",
      mb: 2,
    },
    sectionDescription: {
      maxWidth: 600,
      color: "gray",
    },
    testimonialCard: {
      bgcolor: "white",
      p: 4,
      borderRadius: 2,
      boxShadow: 2,
      textAlign: "left",
      maxWidth: 700,
      mx: "auto",
    },
    stars: {
      fontSize: 24,
      color: "orange",
      mb: 2,
    },
    testimonialText: {
      fontSize: 18,
      fontStyle: "italic",
      mb: 3,
    },
    avatar: {
      width: 60,
      height: 60,
    },
    name: {
      fontWeight: "bold",
      fontSize: 18,
    },
    designation: {
      color: "orange",
      fontSize: 14,
    },
  };
  
  export default styles;
  