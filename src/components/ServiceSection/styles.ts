import theme  from '@/theme/theme';

const styles = {
  container: {
    pb: 6,
    px: { xs: 2, md: 4 },
pt:{ xs: 8, md: 1 },
  },
  sectionTitle: {
    color: theme.palette.primary.dark,
    textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    mb: 1,
    fontSize: { xs: "18px", md: "22px" },
    bgColor: "white"
  },
  sectionHeading: {
    textAlign: "center",
    fontSize: { xs: "28px", md: "32px" },
    fontWeight: 700,
    mb: 2,
  },
  sectionDescription: {
    textAlign: "center",
    fontSize: "16px",
    maxWidth: "800px",
    mx: "auto",
    mb: 4,
  },
  card: {
    position: "relative",
    borderRadius: 4,
    overflow: "hidden",
    height: {xs: 200 , md: 400}
  },
  textOverlay: {
    position: "absolute",
    bottom: "15%",
    left: "10%",
    right: "5%",
    color: "white",
    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
  },
};

export default styles;
