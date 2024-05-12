import React, { useState, useEffect, useMemo } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import { dummyAnnouncements } from "@/dummyData/dummyData";
import MyProjectOverview, {
  ProjectDetail,
} from "@/components/professor-student-home-page/my-project-overview/MyProjectOverview";
import TermTimeline, {
  TimelineDetail,
} from "@/components/professor-student-home-page/TermTimeline/TermTimeline";
import * as S from "@/components/professor-student-home-page/ProfessorStudentHomePage.styles";
import { Typography } from "@mui/material";
import { AnnouncementProps } from "@/reusable-components/accordions/Accordion";
import Accordions from "@/reusable-components/accordions/Accordions";
import Pagination from "@/reusable-components/pagination/Pagination";
import { ProjectState, fetchMyProjects } from "@/redux/features/MyProjectSlice";
import { store } from "@/redux/store";
import {
  TimelineState,
  fetchTimelinesByProjectTypeId,
} from "@/redux/features/TimelineSlice";
import {
  ActiveSeniorProjectTermState,
  fetchActiveSeniorProjectTerm,
} from "@/redux/features/ActiveSeniorProjectTerm";
import { Project } from "@/redux/features/projectSlice";

function ProfessorHomePage() {
  const itemCountPerPage = 5;
  const [currentAnnouncementPage, setCurrentAnnouncementPage] = useState(1);
  const [announcements, setAnnouncements] = useState<AnnouncementProps[]>([]);
  const [pagingAnnouncementData, setPagingAnnouncementData] = useState<
    AnnouncementProps[]
  >([]);
  const [userId, setUserId] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [myProjects, setMyProjects] = useState<ProjectDetail[]>([]);
  const [timelines, setTimelines] = useState<TimelineDetail[]>([]);

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

  const timelineData = useTimeline()?.timelineData;

  useEffect(() => {
    if (!timelineData) return;
    const timelines =
      timelineData?.data.map((timeline) => ({
        reportName: timeline.deliveryName,
        dueDate: new Date(timeline.deliveryDate),
      })) || [];
    setTimelines(timelines);
  }, [timelineData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromLocalStorage = localStorage.getItem("userId") || "";
      const rolesFromLocalStorage =
        localStorage.getItem("roles") || JSON.stringify(["ROLE_USER"]);
      const roles = JSON.parse(rolesFromLocalStorage);
      setUserId(userIdFromLocalStorage);
      setRoles(roles);
    }
  }, []);

  const projectStateData = useMyProject(userId, roles)?.projectData;
  useEffect(() => {
    if (!projectStateData?.data) return;
    const projects =
      projectStateData?.data.map((project: Project) => ({
        id: project.id,
        title: project.title,
        documents: [], // update after document API is implemented
      })) || [];
    setMyProjects(projects);
  }, [projectStateData]);

  return (
    <S.StyledWrapper>
      <S.StyledFirstSection>
        <MyProjectOverview projects={myProjects} />
        <TermTimeline
          timelines={timelines}
          termName="Senior Project 2023-2024"
        />
      </S.StyledFirstSection>
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

export default ProfessorHomePage;

ProfessorHomePage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useMyProject(
  userId: string,
  roles: string[]
): ProjectState | undefined {
  const [projectStateData, setProjectStateData] = useState<ProjectState>();

  useEffect(() => {
    async function getData() {
      try {
        const myProjectRequest = {
          sessionId: userId,
          roles: roles,
        };
        await store.dispatch(fetchMyProjects(myProjectRequest));
        const projectState = store.getState().myProjects;
        setProjectStateData(projectState);
      } catch (error) {
        console.error("Error fetching my projects:", error);
      }
    }
    getData();
  }, [userId, roles]);

  return projectStateData;
}

function useTimeline(): TimelineState | undefined {
  const [timelineStateData, setTimelineStateData] = useState<TimelineState>();

  const projectTypeId =
    useActiveSeniorProjectTerm()?.activeSeniorProjectTermData.data.id || "";
  useEffect(() => {
    async function getData() {
      try {
        const timelineRequest = {
          projectTypeId: projectTypeId,
        };
        await store.dispatch(fetchTimelinesByProjectTypeId(timelineRequest));
        const timelineState = store.getState().timelines;
        setTimelineStateData(timelineState);
      } catch (error) {
        // Handle error
        console.error("Error fetching timelines:", error);
      }
    }
    getData();
  }, [projectTypeId]);

  return timelineStateData;
}

function useActiveSeniorProjectTerm():
  | ActiveSeniorProjectTermState
  | undefined {
  const [activeSeniorProjectTermData, setActiveSeniorProjectTermData] =
    useState<ActiveSeniorProjectTermState>();

  useEffect(() => {
    async function getData() {
      try {
        await store.dispatch(fetchActiveSeniorProjectTerm());
        const activeSeniorProjectTermState =
          store.getState().activeSeniorProjectTerm;
        setActiveSeniorProjectTermData(activeSeniorProjectTermState);
      } catch (error) {
        // Handle error
        console.error("Error fetching active senior project term:", error);
      }
    }
    getData();
  }, []);

  return activeSeniorProjectTermData;
}
