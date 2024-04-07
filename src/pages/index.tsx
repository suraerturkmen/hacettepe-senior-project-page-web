import { dummyAnnouncements, dummyImages } from "@/dummyData/dummyData";
import DefaultLayout from "@/layouts/DefaultLayouts";
import Accordions from "@/reusable-components/accordions/Accordions";
import { Typography } from "@mui/material";
import * as S from "@/index.styles";
import { useEffect, useState } from "react";
import { AnnouncementProps } from "@/reusable-components/accordions/Accordion";
import Pagination from "@/reusable-components/pagination/Pagination";
import { ImageSlider } from "@/components/main-page/image-slider/ImageSlider";

export const MainPage = () => {
  const itemCountPerPage = 5;
  const [currentAnnouncementPage, setCurrentAnnouncementPage] = useState(1);
  const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
  const [pagingAnnouncementData, setPagingAnnouncementData] = useState<
    AnnouncementProps[]
  >([]);

  const handlePageChangeAnnouncement = (page: number) => {
    setCurrentAnnouncementPage(page);
  };

  useEffect(() => {
    setAnnouncements(dummyAnnouncements);
  }, []);

  useEffect(() => {
    const startIndex = (currentAnnouncementPage - 1) * itemCountPerPage;
    const endIndex = startIndex + itemCountPerPage;

    const tempAnnouncements = announcements.slice(startIndex, endIndex);

    setPagingAnnouncementData(tempAnnouncements);
  }, [currentAnnouncementPage, announcements]);

  return (
    <S.StyledContainer>
      <ImageSlider images={dummyImages} />
      <Typography variant="h3TitleBold" color="#790606">
        Announcements
      </Typography>
      <Accordions annoncements={pagingAnnouncementData} />
      <Pagination
        itemCountPerPage={itemCountPerPage}
        totalCount={announcements.length}
        currentPage={currentAnnouncementPage}
        onChange={handlePageChangeAnnouncement}
      />
    </S.StyledContainer>
  );
};

export default MainPage;

MainPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
