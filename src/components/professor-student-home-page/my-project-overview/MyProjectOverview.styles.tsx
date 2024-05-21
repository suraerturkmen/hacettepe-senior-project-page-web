import { Button, Typography } from "@mui/material";
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
  gap: "32px",
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

export const StyledButton = styled(Button)({
  display: "inline-flex",
  justifyContent: "flex-end",
  padding: "16px",
  color: "#344767",
  width: "auto",
  backgroundColor: "#3D7EAA",
  "&:hover": {
    backgroundColor: "#344767",
  },
});

export const StyledTypography = styled(Typography)({
  display: "flex",
  justifyContent: "flex-start",
  width: "260px",
  gap: "8px",
});
