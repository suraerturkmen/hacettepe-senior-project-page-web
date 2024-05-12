import { styled } from "@mui/material/styles";

export const StyledProjectCardBoxes = styled("div")(({ theme }) => ({
  maxWidth: "860px",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px",
  margin: "0 auto",
}));

export const StyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 0,
  justifyContent: "center",
  margin: "auto",
  width: "1015px",

  [theme.breakpoints.between("tablet", "desktop")]: {
    width: "calc(100vw - 64px)",
  },

  [theme.breakpoints.down("tablet")]: {
    width: "100vw",
  },
}));

export const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "auto",
  width: "1015px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "36px",
}));

export const StyledSearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "200px",
  width: "100%",
}));

export const StyledSearchInputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  alignItems: "center",
}));
