import { styled } from "@mui/material/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";

export const StyledAccordion = styled(Accordion)({
  width: "100%",
  margin: "auto",
  marginTop: "10px",
  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
});

export const StyledAccordionSummary = styled(AccordionSummary)({
  backgroundColor: "#f3f3f3",
});

export const StyledAccordionDetails = styled(AccordionDetails)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

export const StyledTypography = styled(Typography)({
  color: "black",
  fontWeight: "bold",
  fontSize: "1.5rem",
});

export const StyledBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

export const StyledWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexGrow: 0,
  justifyContent: "center",
  margin: "auto",
  width: "1254px",

  [theme.breakpoints.between("tablet", "desktop")]: {
    width: "calc(100vw - 64px)",
  },

  [theme.breakpoints.down("tablet")]: {
    width: "100vw",
  },
}));
