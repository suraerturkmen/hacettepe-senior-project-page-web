import { styled } from "@mui/material/styles";

export const StyledProjectContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  backgroundColor: "#F8F9FA",
  padding: "24px",
  borderRadius: "8px",
  alignItems: "center",
});

export const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "550px",
  width: "100%",
  gap: "32px",
});

export const StyledAllProjects = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "340px",
  overflowY: "auto",
  gap: "8px",
  "::-webkit-scrollbar": {
    width: "5px",
  },
  "::-webkit-scrollbar-track": {
    background: "#F5F5F5",
  },

  "::-webkit-scrollbar-thumb": {
    background: "#BDBDBD",
  },
});
