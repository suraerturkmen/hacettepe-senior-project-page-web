import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  dummyAnnouncements,
  dummyOverviewProjects,
  dummyTimelines,
} from "@/dummyData/dummyData";
import MyProjectOverview from "@/components/professor-student-home-page/my-project-overview/MyProjectOverview";
import TermTimeline from "@/components/professor-student-home-page/TermTimeline/TermTimeline";
import * as S from "@/components/professor-student-home-page/ProfessorStudentHomePage.styles";
import { Typography } from "@mui/material";
import { AnnouncementProps } from "@/reusable-components/accordions/Accordion";
import Accordions from "@/reusable-components/accordions/Accordions";
import Pagination from "@/reusable-components/pagination/Pagination";

function StudentHomePage() {
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
    <S.StyledWrapper>
      <S.StyledFirstSection>
        <MyProjectOverview projects={dummyOverviewProjects} />
        <TermTimeline
          timelines={dummyTimelines}
          termName="Senior Project 2023-2024"
        />
      </S.StyledFirstSection>
      <S.StyledAnnouncementSection>
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
      </S.StyledAnnouncementSection>
    </S.StyledWrapper>
  );
}

export default StudentHomePage;

StudentHomePage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
