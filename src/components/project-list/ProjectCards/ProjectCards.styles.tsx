import { styled } from "@mui/material/styles";

export const StyledProjectCardBoxes = styled("div")(({ theme }) => ({
  maxWidth: "860px",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  margin: "0 auto",
}));
