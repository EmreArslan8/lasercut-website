// styles.ts
import theme from "@/theme/theme";

const styles = {
  wrapper: { width: "100%" },
  container: { py: 8 },
  sectionTitle: {
    color: "primary.main",
    fontSize: 22,
    textTransform: "uppercase",
    mb: 2,
    lineHeight: 1.3,
    textAlign: { xs: "left" },
    fontWeight: 800,
   
  },
  bottomSection: {
    py: 8,
    bgcolor: theme.palette.grey[100],
  },
  mainTitle: {
    textTransform: "uppercase",
    textAlign: "start",
    mb: 2,
    fontWeight: 800,
    fontSize: 32,
    lineHeight: 1.2,
  },
  mainDesc: {
    color: "text.secondary",
    mb: 4,
    textAlign: "start",
  },
  itemBox: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  itemIcon: { color: "primary.main" },
  itemTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "start",
  },
  itemDesc: { color: "text.secondary" },
  imageWrapper: {
    position: "relative",
    height: "100%",
    minHeight: { xs: "400px", md: "500px" },
    overflow: "hidden",
    borderRight: "10px solid #006FBF",
    borderBottom: "10px solid #006FBF",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  infoBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: theme.palette.primary.main,
    p: 3,
    color: "white",
  },
  infoContent: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  infoTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "start",
  },
  infoDesc: { mt: 1 },
};

export default styles;
