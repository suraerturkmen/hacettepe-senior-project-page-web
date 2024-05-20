import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import { dummyTerms } from "@/dummyData/dummyData";
import * as S from "@/components/admin-home/AdminHome.styles";
import { Typography } from "@mui/material";
import Accordions from "@/reusable-components/accordions/Accordions";
import Pagination from "@/reusable-components/pagination/Pagination";
import ProjectTerms from "@/components/admin-home/project-type/ProjectTerms";
import { useRouter } from "next/router";
import { Announcement } from "@/redux/features/CreateAnnouncement";
import { store } from "@/redux/store";
import {
  AnnouncementState,
  fetchGetAnnouncement,
} from "@/redux/features/GetAnnouncement";

function StudentHomePage() {
  const itemCountPerPage = 5;
  const [currentAnnouncementPage, setCurrentAnnouncementPage] = useState(1);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [pagingAnnouncementData, setPagingAnnouncementData] = useState<
    Announcement[]
  >([]);
  const router = useRouter();

  const handlePageChangeAnnouncement = (page: number) => {
    setCurrentAnnouncementPage(page);
  };

  const handleAnnouncement = () => {
    router.push("/admin-create-announcement");
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
    <S.StyledWrapper>
      <S.StyledCreateAnnoncementButton onClick={handleAnnouncement}>
        <Typography variant="h5TaglineBold" color="#FFFFFF">
          Create Announcement
        </Typography>
      </S.StyledCreateAnnoncementButton>
      <ProjectTerms terms={dummyTerms} />
      <S.StyledAnnouncementSection>
        <Typography variant="h3TitleBold" color="#790606">
          Announcements
        </Typography>
        <Accordions announcements={pagingAnnouncementData} />
        <Pagination
          itemCountPerPage={itemCountPerPage}
          totalCount={announcements.length}
          currentPage={currentAnnouncementPage}
          onChange={handlePageChangeAnnouncement}
        />
      </S.StyledAnnouncementSection>
    </S.StyledWrapper>
  );
}

export default StudentHomePage;

StudentHomePage.getLayout = (page: JSX.Element) => (
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
