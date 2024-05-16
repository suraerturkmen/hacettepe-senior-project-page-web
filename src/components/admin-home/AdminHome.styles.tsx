import { Button } from "@mui/base";
import { styled } from "@mui/material/styles";

export const StyledWrapper = styled("div")({
  display: "flex",
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
