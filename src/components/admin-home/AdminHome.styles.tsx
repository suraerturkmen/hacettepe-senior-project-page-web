import { Button } from "@mui/base";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledWrapper = styled("div")({
  display: "flex",
  width: "1290px",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  margin: "56px auto",
  gap: "56px",
});

export const StyledFirstSection = styled("div")({
  display: "flex",
  gap: "56px",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
});

export const StyledAnnouncementSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
  width: "100%",
});

export const StyledCreateAnnoncementButton = styled(Button)({
  backgroundColor: "#790606",
  padding: "16px 32px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#E27676",
  },
});

export const StyledLoading = styled(CircularProgress)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  fontSize: "24px",
  color: "#790606",
});
