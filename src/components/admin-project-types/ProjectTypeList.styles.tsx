import { Edit } from "@mui/icons-material";
import { Button, Divider, styled } from "@mui/material";
import exp from "constants";

export const StyledProjectTypes = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "48px",
  margin: "0 auto",
  width: "100%",
  alignItems: "center",
});

export const StyledProjectTypesHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export const StyledWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "56px",
  margin: "56px auto",
});

export const StyledDivider = styled(Divider)({
  width: "100%",
  maxWidth: "860px",
  margin: "0 auto",
});

export const StyledProjectType = styled("div")(({ theme }) => ({
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

export const StyledArchiveButton = styled(Button)({
  backgroundColor: "#D54949",
  padding: "16px 24px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#E27676",
  },
});

export const StyledActivateButton = styled(Button)({
  backgroundColor: "#2E7D32",
  padding: "16px 24px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4CAF50",
  },
});

export const StyledDeactivateButton = styled(Button)({
  backgroundColor: "#247690",
  padding: "16px 24px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#5FA1B6",
  },
});

export const StyledCreateProjectTypeButton = styled(Button)({
  backgroundColor: "#790606",
  padding: "16px 24px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#E27676",
  },
});

export const StyledPageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  width: "100%",
  alignItems: "center",
});

export const StyledEditSection = styled("div")({
  display: "flex",
  gap: "8px",
  cursor: "pointer",
});

export const StyledEditIcon = styled(Edit)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#344767",
  borderRadius: "50%",
}));
