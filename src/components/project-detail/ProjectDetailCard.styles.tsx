import { styled } from "@mui/material/styles";

export const StyledCard = styled("div")({
  display: "flex",
  borderRadius: "8px",
  maxWidth: "1260px",
  width: "100%",
  gap: "32px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#F8F9FA",
  padding: "56px",
  border: "1px solid #000000",
  flexDirection: "column",
});

export const StyledSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const StyledImage = styled("img")({
  objectFit: "cover",
  objectPosition: "center",
  height: "350px",
});

export const StyledImageTitleContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  gap: "16px",
});

export const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  margin: "56px auto",
  alignItems: "center",
  gap: "56px",
});

export const StyledProjectCardContainer = styled("div")({
  display: "flex",
  maxWidth: "1260px",

  ".slick-slide": {
    display: "block",
    height: "auto !important",
    padding: "0 4px"
  },

  ".slick-track": {
    display: "flex",
    ".slick-slide > div": {
      display: "flex",
      height: "100%"
    },

  },

  ".slick-arrow.slick-next": {
    right: "-35px"
  }
  ,
  ".slick-slider": {
    width: "100%"
  },
});