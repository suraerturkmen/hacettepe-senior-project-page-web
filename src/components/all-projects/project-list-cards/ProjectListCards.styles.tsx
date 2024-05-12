import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledProjectCardBoxes = styled("div")(({ theme }) => ({
  maxWidth: "900px",
  width: "100%",
  display: "flex",
  gap: "16px",
  flexDirection: "column",
}));

export const StyledProjectCardWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
  padding: "32px",
  maxWidth: "1560px",
  margin: "0 auto",
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
  flexDirection: "column",
}));

export const StyledProjectCardListContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "32px",
  flexDirection: "column",
  width: "100%",
  margin: "0 auto",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  maxWidth: "200px",
  padding: "16px 24px",
  backgroundColor: "#247690",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#4CAF50",
  },
  alignSelf: "center",
}));
