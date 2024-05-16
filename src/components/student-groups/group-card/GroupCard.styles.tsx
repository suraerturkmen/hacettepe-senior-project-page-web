import { Delete, Edit, Remove } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")({
  display: "flex",
  width: "100%",
  gap: "160px",
  justifyContent: "space-between",
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
  alignItems: "center",
  justifyContent: "center",
  width: "320px",
  gap: "16px",
});

export const StyledFirstColumn = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
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
  cursor: "pointer",
  height: "fit-content",
});

export const StyledApplicationList = styled("div")({
  display: "flex",
  gap: "16px",
  justifyContent: "space-between",
  width: "300px",
});

export const StyledDeleteIcon = styled(Delete)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#F44334",
  borderRadius: "50%",
}));

export const StyledEditDeleteSection = styled("div")({
  display: "flex",
  gap: "16px",
  justifyContent: "center",
  width: "320px",
});

export const StyledNoAppliedProjects = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100px",
  width: "300px",
  backgroundColor: "#F8F9FA",
  borderRadius: "8px",
  border: "1px solid #000000",
});

export const StyledErrorContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px",
  gap: "8px",
});

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-container": {
    "& .MuiPaper-root": {
      width: "100%",
      maxWidth: "800px",
      borderRadius: "8px 8px 0 0",
      [theme.breakpoints.down("desktop")]: {
        maxWidth: "650px",
      },
      [theme.breakpoints.down("tablet")]: {
        maxWidth: "none",
        marginTop: "65px",
        height: "calc(100% - 64px)",
        borderRadius: "0",

        "& .MuiBox-root": {
          height: "100%",
        },
      },
    },
  },
}));
