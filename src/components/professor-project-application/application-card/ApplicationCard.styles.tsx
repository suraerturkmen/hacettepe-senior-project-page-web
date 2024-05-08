import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")({
  display: "flex",
  width: "100%",
  borderRadius: "8px",
  gap: "32px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#F8F9FA",
  padding: "56px",
  border: "1px solid #000000",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export const StyledMemberList = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const StyledSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
});

export const StyledFirstColumn = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "32px",
});

export const StyledEditIcon = styled(Edit)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#344767",
  borderRadius: "50%",
}));

export const StyledEditSection = styled("div")({
  display: "flex",
  gap: "4px",
});

export const StyledApplicationList = styled("div")({
  display: "flex",
  gap: "16px",
  flexDirection: "column",
  alignItems: "center",
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

export const StyledButtonsContainer = styled("div")({
  display: "flex",
  gap: "32px",
});

export const StyledDetailArea = styled("div")({
  display: "flex",
  gap: "240px",
  alignItems: "center",
});
