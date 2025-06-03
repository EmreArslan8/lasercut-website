import theme from "@/theme/theme";

const useStyles = () => ({
  link: (colored?: boolean) => ({
    color: colored ? theme.palette.primary.main : "inherit",
    textDecoration: "none",
    transition: "color 0.3s",
    ":hover": {
      color: colored ? theme.palette.primary.dark : "#555",
    },
  }),
});

export default useStyles;
