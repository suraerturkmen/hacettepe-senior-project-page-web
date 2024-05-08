import { TimelineItem } from "@mui/lab";
import { styled } from "@mui/material/styles";

export const StyledTermContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  flexDirection: "column",
  maxWidth: "550px",
  margin: "0 auto",
  padding: "24px",
  borderRadius: "8px",
  alignItems: "center",
});

export const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "600px",
  width: "100%",
  gap: "32px",
});

export const StyledAllTerms = styled("div")({
  display: "flex",
  width: "100%",
  height: "340px",
  gap: "8px",
});

export const StyledTimelineItem = styled(TimelineItem)({
  width: "350px",
});

export const StyledTerms = styled("div")({
  display: "flex",
  gap: "56px",
});

export const StyledTermsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "center",
});

export const StyledAllProjects = styled("div")({
  display: "flex",
  gap: "8px",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledProjectContainer = styled("div")({
  display: "flex",
  gap: "8px",
  flexDirection: "column",
});
