import theme, { palette } from "@/theme/theme";

const styles = {
  topSection: {
    py: { xs: 1, sm: 5, md: 10 },
    bgColor: "white",
  },
  bottomSection: {
    py: { xs: 1, sm: 5, md: 8 },
  },
  badge: {
    display: "inline-block",
    border: "1px solid #004A8D",
    px: 2,
    py: 1,
    borderRadius: "50px",
    fontSize: "16px",
    textTransform: "uppercase",
    color: palette.customPrimary[700],
    mb: 2,
  },
  desc: {
    fontStyle: "italic",
    fontSize: "16px",
    maxWidth: { md: 400 },
  },
  heading: {
    fontWeight: 700,
    fontSize: { xs: "24px", md: "36px" },
    lineHeight: 1.3,
    textAlign: { xs: "left" },
  },
  highlight: {
    color: theme.palette.primary.main,
  },
  subheading: {
    textTransform: "uppercase",
    mb: 2,
    textAlign: "start",
    color: "primary.main",
    fontSize: 22,
    lineHeight: 1.3,
    fontWeight: 800,
  },
  serviceTitle: {
    lineHeight: 1.2,
    textTransform: "uppercase",
    textAlign: "start",
    mb: 2,
  },
  serviceDesc: {
    mb: 4,
    textAlign: "start",
  },
  serviceItem: {
    display: "flex",
    gap: 2,
    alignItems: "center",
  },
  icon: {
    color: "primary.main",
  },
  serviceItemTitle: {
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "start",
  },
  imageWrapper: {
    position: "relative",
    height: "100%",
    minHeight: { xs: "400px", md: "500px" },
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
};

export default styles;
