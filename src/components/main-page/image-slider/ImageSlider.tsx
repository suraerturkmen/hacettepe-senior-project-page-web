/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import React from "react";
import Slider, { Settings } from "react-slick";
import * as S from "@/components/main-page/image-slider/ImageSlider.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[];
}

const SETTINGS: Settings = {
  centerMode: false,
  infinite: true,
  slidesToShow: 1,
  dots: true,
  nextArrow: <ChevronRightIcon />,
  prevArrow: <ChevronLeftIcon />,
  autoplay: true,
};

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <S.ImageSliderContainer>
      <Slider {...SETTINGS}>
        {images.map((imageUrl) => (
          <S.StyledImage key={imageUrl} src={imageUrl} />
        ))}
      </Slider>
    </S.ImageSliderContainer>
  );
};
