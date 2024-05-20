import { Button, styled } from "@mui/material";

export const StyledDocumentCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "32px 96px",
  borderRadius: "8px",
  backgroundColor: "#F8F9FA",
  maxWidth: "860px",
  width: "100%",
  border: `1px solid #000000`,
  alignItems: "center",
}));

export const StyledDocumentCardHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  gap: "8px",
});

export const StyledDocumentCardBody = styled("div")({
  display: "flex",
  gap: "8px",
  justifyContent: "space-between",
  width: "100%",
});

export const StyledUploadButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#7D2E41",
  padding: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  color: "#FFFFFF",
  width: "fit-content",
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

export const StyledDeliveryButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#E0E0E0",
  color: "#000000",
  padding: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  width: "fit-content",
  ":hover": {
    backgroundColor: "#E0E0E0",
  },
  ":disabled": {
    backgroundColor: "#E0E0E0",
    cursor: "not-allowed",
  },
}));

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
