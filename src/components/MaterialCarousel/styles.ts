

const styles = {
  container: {
    overflowY: "auto",

  },
  title: {

    mb: 2,
    fontWeight: "bold",
  },
  card: (selected: boolean) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    boxShadow: selected ? "0 0 10px #1976d2" : "0 2px 6px rgba(0, 0, 0, 0.1)",
    border: selected ? "2px solid #1976d2" : "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0 0 10px rgba(25, 118, 210, 0.5)",
    },
  }),
  cardMedia: {
    width: 150,
    height: 150,
    objectFit: "contain",
    padding: 2,
  },
  cardContent: {
    textAlign: "left",
  },
  cardTitle: {
    fontWeight: "bold",
    marginBottom: 1,
  },
  cardDescription: {
    color: "textSecondary",
    marginBottom: 1,
  },
};

export default styles;
