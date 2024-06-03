import { Delete, Edit, ArrowForward } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

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

export const StyledDescription = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
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

export const StyledLastDocumentArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const StyledSubmitButton = styled(Button)({
  backgroundColor: "#D54949",
  color: "#FFFFFF",
  width: "fit-content",
  alignSelf: "center",
  ":hover": {
    backgroundColor: "#D54949",
  },
});

export const StyledButtonContainer = styled("div")({
  display: "flex",
  height: "fit-content",
  gap: "16px",
});

export const StyledUploadButtonArea = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
});

export const StyledUploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#7D2E41",
  padding: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  color: "#FFFFFF",
  width: "fit-content",
  component: "span",
  ":hover": {
    backgroundColor: "#7D2E41",
  },
}));

export const StyledDownloadButton = styled(Button)(({ theme }) => ({
  height: "fit-content",
  backgroundColor: "#7E74F9",
  color: "#FFFFFF",
  padding: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  width: "fit-content",
  ":hover": {
    backgroundColor: "#7E74F9",
  },
}));

export const StyledPosterArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const StyledDemoLinkArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const StyledWebsiteLinkArea = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const StyledUploadLastDocumentButton = styled(Button)({
  backgroundColor: "#D54949",
  color: "#FFFFFF",
  padding: "16px",
  width: "fit-content",
  alignSelf: "center",
  alignItems: "center",
  textAlign: "center",
  borderRadius: "8px",
  ":hover": {
    backgroundColor: "#D54949",
  },
});

export const StyledUploadLastDocumentContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
});
