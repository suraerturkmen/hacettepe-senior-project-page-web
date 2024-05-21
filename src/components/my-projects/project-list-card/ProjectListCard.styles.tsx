import { Delete, Edit, ArrowForward } from "@mui/icons-material";
import { Button } from "@mui/material";

import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
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
  flexDirection: "column",
  justifyContent: "center",
}));

export const StyledDescriptionArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const StyledClickable = styled("div")({
  display: "flex",
  cursor: "pointer",
});

export const StyledUploadDocumentButton = styled(Button)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "16px",
  width: "fit-content",
  alignSelf: "center",
  ":hover": {
    backgroundColor: "transparent",
    color: "#D54949",
  },
});

export const StyledArrowForwardIcon = styled(ArrowForward)({
  color: "#D54949",
});
