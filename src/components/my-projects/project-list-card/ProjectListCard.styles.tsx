import { Delete, Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#F8F9FA",
  padding: "32px",
}));

export const StyledFirstLine = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const StyledDeleteAndEdit = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
}));

export const StyledDeleteIcon = styled(Delete)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#F44334",
  borderRadius: "50%",
}));

export const StyledEditIcon = styled(Edit)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#344767",
  borderRadius: "50%",
}));

export const StyledStudentsArea = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

export const StyledDescriptionArea = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));
