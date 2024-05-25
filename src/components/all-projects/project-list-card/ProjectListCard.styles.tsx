import { Delete, Edit } from "@mui/icons-material";
import { Button, Dialog, Drawer, Typography } from "@mui/material";
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
  cursor: "pointer",
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
  alignItems: "flex-start",
  flexDirection: "column",
  flex: 1,
}));
export const StyledDescription = styled(Typography)(({ theme }) => ({
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const StyledDetails = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  flex: 1,
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

export const StyledDraweContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  padding: "56px 164px",
  gap: "56px",
});

export const StyledSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const StyledMemberList = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export const StyledGroupContainer = styled("div")({
  display: "flex",
  gap: "56px",
  background: "#FFFFFFF",
  padding: "32px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.25)",
  borderRadius: "8px",
});

export const StyledApproveWithGroupButtonSection = styled("div")({
  display: "flex",
});

export const StyledApproveWithGroupButton = styled(Button)({
  padding: "0px 56px !important",
  height: "60px",
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

export const StyledProfessors = styled("div")({
  display: "flex",
  gap: "8px",
});
