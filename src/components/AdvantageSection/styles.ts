
import { palette } from "@/theme/theme";

const styles = {
  wrapper: {
    py: 8,
    background: palette.customPrimary[700],
    color: "white",
  },
  title: {
    variant: "h4",
    textAlign: "center",
    mb: 6,
  },
  gridContainer: {
    spacing: 4,
    justifyContent: "center",
    maxWidth: "lg",
    mx: "auto",
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
  textGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    mt: 2,
    height: 64, // ✅ İkonla hizalama için
    ml: { xs: 2, sm: 0 }, // ✅ Mobilde ikon ile boşluk bırak
    textAlign: { xs: "left", sm: "center", md: "left" }, // ✅ sm'de ortala
  },
  titleText: {
    variant: "h6",
    fontWeight: "bold",
  },
  descriptionText: {
    variant: "body2",
  },
};

export default styles;
