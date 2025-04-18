
const styles = {
  mobileButton: {
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "grey.300",
    },
  },
  desktopButton: {
    borderRadius: "50px",
    padding: "4px 4px",
    backgroundColor: "grey.100",
    display: "flex",
    alignItems: "center",
    gap: 1,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "grey.300",
    },
  },
  languageText: {
    fontWeight: 500,
    fontSize: "14px",
    color: "black",
  },
  flag: {
    objectFit: "cover",
    borderRadius: "2px",
  },
};

export default styles;
