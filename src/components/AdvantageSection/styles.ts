
import { palette } from "@/theme/theme";

const styles = {
  wrapper: {
    py: 8,
    background: palette.customPrimary[700],
    color: "white",
  },
  title: {
    textAlign: "center",
    mb: 2,
  },
  subTitle: {
    textAlign: "center",
    mb: 4,
  },
  gridContainer: {
    direction: { xs: "row", sm: "column" },        
   gap: 2,
   alignItems: { xs: "center", sm: "flex-start" },
   p: 3, 
   height: "100%"
  },
  card: {
    height: "100%",
    p: 4,
    display: "flex",
    flexDirection: { xs: "row", sm: "column" }, // ✅ xs: yatay, sm ve üstü: dikey
    alignItems: { xs: "center", sm: "center", md: "flex-start" },
    gap: 2,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #016fbf, #3f8efc, #00c6ff)",
    flexShrink: 0, // ✅ Daralmayı engelle
  },
};

export default styles;
