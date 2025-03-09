import theme from "@/theme/theme";
import { keyframes } from "@mui/material";
import { palette } from "@/theme/theme";

const rippleAnimation = keyframes`
0% {
  transform: scale(1);
  opacity: 0.6;
}
100% {
  transform: scale(2.5);
  opacity: 0;
}
`;

const styles = {
  wrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  sliderBox: {
    "& .slick-slide": {
      margin: "0 !important",
      padding: "0 !important",
      height: { xs: "500px ",md: "700px !important"},
    },
  },
  slide: {
    position: "relative",
    width: "100%",
    height:{xs: "500px", md: "700px"},
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
    },
  },
  contentBox: (isMobile: boolean) => ({
    position: "absolute",
    top: "10%",
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: isMobile ? 2 : 6,
    color: "#fff",
    margin: "0 auto", 
    mx: "auto", // Ortalamak için
    pt: { xs: 4, md: 8 }, // Üst-alt boşluk (isteğe bağlı  // Ortalamak için
  }),
  gridContainer: {
    mx: "auto",
    gap: 2,
    justifyContent: "space-between",
    flexDirection: { xs: "column", md: "row" },
  },
  title: {
    fontWeight: "bold",
    lineHeight: 1.2,
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
    fontSize: { xs: "28px", sm: "36px", md: "42px", lg: "54px" },
  },
  button: {
    mt: 6,
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: 1,
    background: palette.gradient.g5,
    transition:
      "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
    transform: "translateY(0)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
    },
  },

  rightGrid: {
    display: { xs: "none", md: "block" },
  },
  rightStack: {
    justifyContent: { xs: "center", md: "left" },
    alignItems: "center",
    gap: 2,
  },
  playIcon: {
    fontSize: "60px",
    color: theme.palette.primary.main,
  },
  counter: {
    fontSize: "40px",
    fontWeight: "bold",
  },
  playButtonWrapper: {
    position: "relative",
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.15)",
  },
  ripple1: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    animation: `${rippleAnimation} 2.5s infinite ease-out`,
  },
  ripple2: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    animation: `${rippleAnimation} 2.5s infinite ease-out`,
    animationDelay: "1.25s",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    color: "white",
    zIndex: 1,
  },
};

export default styles;
