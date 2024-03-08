import { AppBar, Typography, styled } from "@mui/material";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: "white",
  zIndex: 19,
}));

export const StyledTypography = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const StyledContentContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  textAlign: "center",
});

export const StyledButtonContainer = styled("div")({
  display: "flex",
  gap: "44px",
});

export const StyledImage = styled("img")({
  height: "51px",
  width: "40px",
});
