import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "24px",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#F8F9FA",
  padding: "32px",
}));

export const StyledFirstLine = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

export const StyledDeleteAndEdit = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
}));

export const StyledDeleteIcon = styled(Delete)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#F44334",
  borderRadius: "50%",
}));

export const StyledEditIcon = styled(Edit)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#344767",
  borderRadius: "50%",
}));

export const StyledArea = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));

export const StyledDetails = styled("div")({
  display: "flex",
  gap: "4px",
  flexDirection: "column",
});

export const StyledWrapper = styled("div")({
  display: "flex",
  gap: "32px",
});

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "$color",
})<{ $color: string }>(({ $color }) => ({
  height: "60px",
  padding: "32px",
  width: "150px",
  alignSelf: "center",
  backgroundColor: $color,
  ":hover": {
    backgroundColor: $color,
  },
  ":disabled": {
    backgroundColor: $color,
  },
}));
