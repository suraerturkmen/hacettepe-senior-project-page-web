import { styled } from "@mui/material";

export const StyledApplicationCards = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "32px",
  margin: "0 auto",
  width: "1290px",
  flexDirection: "column",
}));

export const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "56px auto",
  alignItems: "center",
  gap: "56px",
});
