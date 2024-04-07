import { styled } from "@mui/material/styles";

export const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
  margin: "auto",
  maxWidth: "1254px",
  width: "100%",

  [theme.breakpoints.between("tablet", "desktop")]: {
    width: "calc(100vw - 64px)",
  },

  [theme.breakpoints.down("tablet")]: {
    width: "100vw",
  },
}));
