import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export const StyledDialogContent = styled("div")(({ theme }) => ({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
}));

export const StyledDialogTitle = styled("div")(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
}));

export const StyledDialogContentText = styled("div")(({ theme }) => ({
  fontSize: "16px",
}));
