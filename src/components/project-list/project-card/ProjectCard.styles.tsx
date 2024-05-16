import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "white",
  color: "black",
  cursor: "pointer",
}));

export const StyledContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "16px",
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

export const StyledAuthorAndTerm = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  gap: "80px",
}));

export const StyledAuthor = styled("div")(({ theme }) => ({
  display: "flex",
  overflow: "hidden",
  width: "200px",
  textOverflow: "ellipsis",
  gap: "4px",
}));

export const StyledTerm = styled("div")(({ theme }) => ({
  width: "10ch",
}));

export const StyledDescription = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
