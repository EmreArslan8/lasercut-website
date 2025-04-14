import { title } from "process";

const styles = {
  wrapper: {
    width: "100%",
    px: 3,
    py: {xs: 0, md: 3},
    mt: 18,
  },
  title: {
    mb: 3,
    fontSize: "36px! important",
  },
  formWrapper: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
  },

  formSection: {
    flex: 1,
  },

  mapSection: {
    flex: 1,
    borderRadius: 2,
    overflow: "hidden",
    boxShadow: 1,
    mt: 3,
  },

  socialSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    p: 4,
    py: { xs: 6, md: 8 },
    borderRadius: 2,
    backgroundColor: "#f5f5f5",
    mt: 6,
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: 3, md: 0 },
  },

  socialText: {
    textAlign: "left",
    flex: 1,
    maxWidth: "600px",
  },

  whatsappButton: {
    textTransform: "none",
    borderRadius: "20px",
    px: 3,
  },
};

export default styles;
