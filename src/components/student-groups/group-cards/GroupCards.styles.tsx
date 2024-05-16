import { Button } from "@mui/base";
import { styled } from "@mui/material";

export const StyledGroupCards = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "32px",
  margin: "0 auto",
  flexDirection: "column",
}));

export const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "56px auto",
  alignItems: "center",
  justifyContent: "center",
  gap: "56px",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: "16px 32px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledHeaderContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
  gap: "32px",
});
