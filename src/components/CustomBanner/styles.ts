
import { slideRight, fadeIn, ripple } from "@/lib/utils/animations";


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
      height: { xs: "500px ", md: "700px !important" },
    },
  },
  slide: {
    position: "relative",
    width: "100%",
    height: { xs: "500px", md: "700px" },
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
    fontSize: { xs: "32px", sm: "36px", md: "42px", lg: "54px" },
    opacity: 0,
    transform: "translateX(-50px)",
    animation: `${slideRight} 1s ease-in-out forwards`,
  },
  button: {
    fontSize: "18px",
    mt: 6,
    fontWeight: "bold",
    borderRadius: 1,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", // Using a default gradient instead of palette
    opacity: 0, // Başlangıçta görünmez
    transform: "translateY(0)", // Başlangıç pozisyonu
    transition:
      "opacity 0.8s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
    animation: `${fadeIn} 1s ease-in-out forwards`,
    "&:hover": {
      transform: "translateY(-15px)", // Hover'da yukarı kayma efekti
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)", // Hover gölgelendirme efekti
    },
  },
  rightGrid: {
    display: { xs: "none", md: "block" },
  },
  description: {
    mb: 3,
    opacity: 0,
    transform: "translateX(50px)",
    animation: `${slideRight} 0.5s ease-in-out forwards`,
  },
  rightStack: {
    justifyContent: { xs: "center", md: "left" },
    alignItems: "center",
    gap: 2,
  },
  playIcon: {
    fontSize: "60px",
    color: "#1976d2", // Using default MUI primary color instead of palette reference
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
    animation: `${ripple} 2.5s infinite ease-out`,
  },
  ripple2: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    animation: `${ripple} 2.5s infinite ease-out`,
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
