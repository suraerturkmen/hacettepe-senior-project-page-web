import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

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
  gap: "16px",
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
