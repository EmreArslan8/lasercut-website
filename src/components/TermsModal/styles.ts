const styles = {
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 500 },
    maxHeight: "80vh",
    bgcolor: "white",
    p: 4,
    boxShadow: 24,
    textAlign: "start",
    borderRadius: 2,
    overflowY: "auto",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontWeight: "bold",
    mb: 2,
  },
  description: {
    color: "text.secondary",
    mb: 2,
  },
};
export default styles;
