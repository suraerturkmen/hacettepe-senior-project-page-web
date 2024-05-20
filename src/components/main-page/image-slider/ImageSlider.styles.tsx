import { styled } from "@mui/material/styles";

export const ImageSliderContainer = styled("div")(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  ".slick-arrow.slick-prev": {
    position: "absolute",
    left: "10px",
    top: "unset",
    bottom: "115px !important",
    zIndex: "9",
    width: "40px",
    height: "40px",

    [theme.breakpoints.between("tablet", "desktop")]: {
      bottom: "96px !important",
    },
  },
  ".slick-arrow.slick-next": {
    position: "absolute",
    right: "5px",
    top: "unset",
    bottom: "115px !important",
    zIndex: "9",
    width: "40px",
    height: "40px",
  },
  ".slick-dots": {
    position: "absolute",
    bottom: "0px",
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
  ".slick-initialized .slick-slide": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const StyledImage = styled("img", {
  shouldForwardProp: (prop) => prop !== "$imageUrl",
})({
  display: "flex",
  alignSelf: "center",
  width: "1000px",
  bottom: "30px",
  height: "330px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  margin: "10px 0",
});
