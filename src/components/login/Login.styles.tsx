import { styled } from "@mui/material/styles";
import { Button, TextField } from "@mui/material";

export const StyledVerticalLine = styled("div")(({ theme }) => ({
  width: "1px",
  height: "530px",
  backgroundColor: "#790606",
}));

export const StyledHorizontalLine = styled("div")(({ theme }) => ({
  width: "184px",
  height: "1px",
  backgroundColor: "#790606",
}));

export const StyledSignInButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "40px",
  backgroundColor: "#790606",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#5a0404",
  },
}));

export const StyledTextFieldContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  width: "100%",
}));

export const StyledImage = styled("img")(({ theme }) => ({
  width: "500px",
  height: "500px",
}));

export const StyledOrArea = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
}));

export const StyledOrText = styled("p")(({ theme }) => ({
  color: "#790606",
  margin: "0 10px",
}));

export const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  gap: "36px",
}));

export const StyledInputAreasContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "468px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "36px",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  display: "flex",
  width: "100%",
}));

export const StyledBannerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
}));
