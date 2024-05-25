import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import MyProjectOverview, {
  ProjectDetail,
} from "@/components/professor-student-home-page/my-project-overview/MyProjectOverview";
import TermTimeline from "@/components/professor-student-home-page/TermTimeline/TermTimeline";
import * as S from "@/components/professor-student-home-page/ProfessorStudentHomePage.styles";
import { Typography } from "@mui/material";
import Accordions from "@/reusable-components/accordions/Accordions";
import Pagination from "@/reusable-components/pagination/Pagination";
import { Project } from "@/redux/features/projectSlice";
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
import { Announcement } from "@/redux/features/CreateAnnouncement";
import {
  AnnouncementState,
  fetchGetAnnouncement,
} from "@/redux/features/GetAnnouncement";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import Cookies from "js-cookie";

function StudentHomePage() {
  const itemCountPerPage = 5;
  const [currentAnnouncementPage, setCurrentAnnouncementPage] = useState(1);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [pagingAnnouncementData, setPagingAnnouncementData] = useState<
    Announcement[]
  >([]);
  const [userId, setUserId] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [myProjects, setMyProjects] = useState<ProjectDetail[]>([]);

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

  const timelineData = useTimeline()?.timelineData;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromCookies = Cookies.get("userId") || "";
      const rolesFromCookies =
        Cookies.get("roles") || JSON.stringify(["ROLE_USER"]);
      const roles = JSON.parse(rolesFromCookies);
      setUserId(userIdFromCookies);
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
        projectTypeId: project.projectTypeId,
      })) || [];
    setMyProjects(projects);
  }, [projectStateData]);

  return (
    <S.StyledWrapper>
      <S.StyledFirstSection>
        <MyProjectOverview projects={myProjects} userType={UserType.Student} />
        {timelineData?.data && (
          <TermTimeline
            timelines={timelineData?.data || []}
            termName="Senior Project 2023-2024"
          />
        )}
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

export default StudentHomePage;

StudentHomePage.getLayout = (page: JSX.Element) => (
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
    useActiveSeniorProjectTerm()?.activeSeniorProjectTermData?.data?.id || "";
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
        console.error("Error fetching active senior project term:", error);
      }
    }
    getData();
  }, []);

  return activeSeniorProjectTermData;
}

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
