import { styled } from "@mui/material/styles";

export const ImageSliderContainer = styled("div")(({ theme }) => ({
  width: "100%",
  margin: "0",
  overflow: "hidden",
  ".slick-arrow.slick-prev": {
    left: "unset",
    top: "unset",
    bottom: "150px !important",
    zIndex: "9",
    width: "24px",
    height: "24px",

    [theme.breakpoints.between("tablet", "desktop")]: {
      bottom: "96px !important",
    },
  },
  ".slick-arrow.slick-next": {
    right: "86px",
    top: "unset",
    bottom: "150px !important",
    zIndex: "9",
    width: "24px",
    height: "24px",
  },
  ".slick-dots": {
    "& li": {
      width: "12px",
      height: "12px",
      color: "black",
    },
    "& li button:before": {
      color: "black",
    },
    "& li.slick-active button:before": {
      color: "black",
    },
  },
}));

export const StyledImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "$imageUrl",
})<{}>(({ theme }) => ({
  width: "100% !important",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));
