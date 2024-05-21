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
import { UrlAndImage } from "@/redux/features/GetUrlAndImages";
import Link from "next/link";

export interface ImageSliderProps {
  urlAndImages: UrlAndImage[];
}

const SETTINGS: Settings = {
  centerMode: false,
  infinite: true,
  slidesToShow: 1,
  dots: true,
  nextArrow: <ChevronRightIcon />,
  prevArrow: <ChevronLeftIcon />,
};

const onImageClick = (url: string) => {
  if (!url) {
    return;
  }
  window.open(url, "_blank");
};
export const ImageSlider: React.FC<ImageSliderProps> = ({ urlAndImages }) => {
  return (
    <S.ImageSliderContainer>
      <Slider {...SETTINGS}>
        {urlAndImages?.map((urlAndImage) => (
          <S.StyledImage
            src={`data:image/jpeg;base64,${urlAndImage.image}`}
            onClick={() => onImageClick(urlAndImage.url)}
          />
        ))}
      </Slider>
    </S.ImageSliderContainer>
  );
};
