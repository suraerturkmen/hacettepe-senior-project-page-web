import { Divider, styled } from "@mui/material";

export const StyledDocumentCards = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "48px",
  margin: "0 auto",
  width: "100%",
  alignItems: "center",
});

export const StyledDocumentCardsHeader = styled("div")({
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
