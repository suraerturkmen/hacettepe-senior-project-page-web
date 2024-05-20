import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const StyledProjectCardWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "860px",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
  padding: "32px",
  maxWidth: "1560px",
  margin: "0 auto",
  backgroundColor: "#F8F9FA",
  borderRadius: "12px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
  flexDirection: "column",
}));

export const StyledInputFieldsWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
  width: "100%",
  "& form": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  alignSelf: "center",
  width: "fit-content",
  backgroundColor: "#E27676",
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#E27676",
  },
}));

export const StyledTimelineWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #E27676",
}));

export const StyledTimelineHeader = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  width: "100%",
  marginTop: "32px",
}));

export const StyledAddContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  borderRadius: "4px",
  padding: "8px",
  border: "1px solid #E27676",
  gap: "16px",
  cursor: "pointer",
}));

export const StyledTimelinesContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
}));

export const StyledOneTimeline = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export const StyledRemoveContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  borderRadius: "4px",
  padding: "8px",
  border: "1px solid #E27676",
  gap: "16px",
  cursor: "pointer",
}));
