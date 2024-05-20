import { styled } from "@mui/material/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export const StyledAccordion = styled(Accordion)({
  width: "100%",
  margin: "auto",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
  padding: "16px",
  backgroundColor: "#ffffff",
});

export const StyledAccordionSummary = styled(AccordionSummary)({
  display: "flex",
  backgroundColor: "#ffffff",
  alignItems: "center",

  "& .MuiAccordionSummary-content": {
    display: "flex",
    gap: "50px",
    justifyContent: "space-between",
  },

  "& .MuiAccordionSummary-content.Mui-expanded": {
    display: "flex",
    padding: "0 0 12px 0",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    minHeight: "48px",
    alignItems: "center",
  },
});

export const StyledAccordionDetails = styled(AccordionDetails)({
  display: "flex",
});

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const StyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 0,
  justifyContent: "center",
  margin: "auto",
  width: "100%",
  [theme.breakpoints.between("tablet", "desktop")]: {
    width: "calc(100vw - 64px)",
  },

  [theme.breakpoints.down("tablet")]: {
    width: "100vw",
  },
}));

export const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  margin: "auto",

  maxWidth: "1254px",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
}));

export const StyledTitleArea = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const StyledEditIcon = styled(Edit)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#344767",
  borderRadius: "50%",
}));

export const StyledDeleteIcon = styled(Delete)(({ theme }) => ({
  width: "24px",
  height: "24px",
  color: "#F44334",
  borderRadius: "50%",
}));

export const StyledEditSection = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignSelf: "flex-end",
  cursor: "pointer",
}));

export const StyledDeleteSection = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignSelf: "flex-end",
  cursor: "pointer",
}));

export const StyledEditAndDeleteSection = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "16px",
  marginRight: "32px",
}));

export const StyledContentSection = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "32px",
}));
