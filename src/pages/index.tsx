import DefaultLayout from "@/layouts/DefaultLayouts";
import Accordions from "@/reusable-components/accordions/Accordions";
import { Typography } from "@mui/material";
import * as S from "@/index.styles";
import { useEffect, useState } from "react";
import Pagination from "@/reusable-components/pagination/Pagination";
import { ImageSlider } from "@/components/main-page/image-slider/ImageSlider";
import { Announcement } from "@/redux/features/CreateAnnouncement";
import {
  AnnouncementState,
  fetchGetAnnouncement,
} from "@/redux/features/GetAnnouncement";
import { store } from "@/redux/store";
import {
  UrlAndImage,
  fetchUrlAndImages,
} from "@/redux/features/GetUrlAndImages";

export const MainPage = () => {
  const itemCountPerPage = 5;
  const [currentAnnouncementPage, setCurrentAnnouncementPage] = useState(1);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [pagingAnnouncementData, setPagingAnnouncementData] = useState<
    Announcement[]
  >([]);
  const [urlAndImages, setUrlAndImages] = useState<UrlAndImage[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchUrlAndImages());
        const data = store.getState().urlAndImages;
        setUrlAndImages(data.urlAndImageData.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    }
    fetchData();
  }, []);

  const handlePageChangeAnnouncement = (page: number) => {
    setCurrentAnnouncementPage(page);
  };

  const allAnnouncements = useFetchAnnouncements();
  useEffect(() => {
    setAnnouncements(allAnnouncements?.announcementData.data || []);
  }, [allAnnouncements]);

  useEffect(() => {
    const startIndex = (currentAnnouncementPage - 1) * itemCountPerPage;
    const endIndex = startIndex + itemCountPerPage;

    const tempAnnouncements = announcements.slice(startIndex, endIndex);

    setPagingAnnouncementData(tempAnnouncements);
  }, [currentAnnouncementPage, announcements]);

  return (
    <S.StyledContainer>
      <ImageSlider urlAndImages={urlAndImages} />
      <Typography variant="h3TitleBold" color="#790606">
        Announcements
      </Typography>
      <Accordions announcements={pagingAnnouncementData} />
      {announcements.length > itemCountPerPage && (
        <Pagination
          itemCountPerPage={itemCountPerPage}
          totalCount={announcements.length}
          currentPage={currentAnnouncementPage}
          onChange={handlePageChangeAnnouncement}
        />
      )}
    </S.StyledContainer>
  );
};

export default MainPage;

MainPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useFetchAnnouncements() {
  const [announcements, setAnnouncements] = useState<AnnouncementState>();
  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchGetAnnouncement());
        const data = store.getState().announcement;
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    }
    fetchData();
  }, []);
  return announcements;
}
