import { styled } from "@mui/material/styles";

export const StyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 0,
  justifyContent: "center",
  margin: "auto",
  width: "1254px",

  [theme.breakpoints.between("tablet", "desktop")]: {
    width: "calc(100vw - 64px)",
  },

  [theme.breakpoints.down("tablet")]: {
    width: "100vw",
  },
}));
