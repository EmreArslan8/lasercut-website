// styles.ts

const styles = {
    wrapper: {
      maxWidth: "lg",
      mx: "auto",
      px: 2,
      py: 4,
      mt: 17,
    },
    title: {
      mb: 6,
      background: "linear-gradient(90deg, #007FFF, #0059B2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      fontWeight: "bold",
    },
    accordion: {
      mb: 2,
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      "&:before": { display: "none" },
    },
    summary: {
      backgroundColor: "#F5F5F5",
      borderRadius: "8px",
      px: 3,
      py: 2,
      "& .MuiAccordionSummary-content": {
        margin: 0,
      },
      "&:hover": {
        backgroundColor: "#E3F2FD",
      },
    },
    summaryText: {
      fontWeight: "bold",
      fontSize: "1.1rem",
    },
    details: {
      backgroundColor: "#FAFAFA",
      px: 3,
      py: 2,
    },
    answer: {
      color: "#424242",
      lineHeight: 1.7,
    },
  };
  
  export default styles;
  