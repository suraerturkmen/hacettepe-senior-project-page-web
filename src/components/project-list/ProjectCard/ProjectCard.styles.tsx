import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "white",
  color: "black",
  width: "318px",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "16px",
}));

export const StyledAuthorAndTerm = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const StyledAuthor = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "4px",
  flexDirection: "column",
}));

export const StyledChip = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "4px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const StyledChipContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "4px",
  flexDirection: "column",
  background: "lightgray",
}));

export const StyledImage = styled("img")({
  objectFit: "cover",
  objectPosition: "center",
  height: "200px",
});
