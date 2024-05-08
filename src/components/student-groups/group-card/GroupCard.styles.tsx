import { Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")({
  display: "flex",
  width: "100%",
  gap: "240px",
  borderRadius: "8px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#F8F9FA",
  padding: "56px",
  border: "1px solid #000000",
});

export const StyledMemberList = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const StyledSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
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
  justifyContent: "space-between",
  width: "300px",
});
