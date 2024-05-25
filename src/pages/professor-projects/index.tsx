import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/my-projects/project-list-cards/ProjectListCards";
import * as S from "@/components/my-projects/project-list-cards/ProjectListCards.styles";
import { CardProps } from "@/components/my-projects/project-list-card/ProjectListCard";
import { store } from "@/redux/store";
import {
  ProjectState,
  ProjectStatus,
  fetchProjectsById,
} from "@/redux/features/projectSlice";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import Cookies from "js-cookie";

function ProfessorMyProjectsPage() {
  const itemCountPerPage = 4;
  const [currentPageWorkingProject, setCurrentPageWorkingProject] = useState(1);
  const [currentPageArchivedProject, setCurrentPageArchivedProject] =
    useState(1);
  const [workingProjects, setWorkingProjects] = useState<CardProps[]>([]);
  const [archivedProjects, setArchivedProjects] = useState<CardProps[]>([]);

  const handlePageChangeWorkingProject = (page: number) => {
    setCurrentPageWorkingProject(page);
  };

  const handlePageChangeArchivedProject = (page: number) => {
    setCurrentPageArchivedProject(page);
  };

  const [sessionId, setSessionId] = useState<string>("");
  const [userRoles, setUserRoles] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromCookies = Cookies.get("userId") || "";
      const rolesFromCookies =
        Cookies.get("roles") || JSON.stringify(["ROLE_USER"]);
      const roles = JSON.parse(rolesFromCookies);
      setSessionId(userIdFromCookies);
      setUserRoles(roles);
    }
  }, []);

  const projectStateData = useFetchProfessorProjects(
    sessionId,
    userRoles
  )?.projectData;

  useMemo(() => {
    if (projectStateData) {
      const workingProjectsData =
        projectStateData.data?.filter(
          (project) => project.projectStatus === ProjectStatus.Working
        ) || [];
      const archivedProjectsData =
        projectStateData.data?.filter(
          (project) => project.projectStatus === ProjectStatus.Past
        ) || [];

      setWorkingProjects(
        workingProjectsData.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          students: project.students,
          projectStatus: ProjectStatus.Past,
          userType: UserType.Teacher,
          studentLimit: project.studentLimit,
          poster: project.poster,
          keywords: project.keywords,
          groupId: project.groupId,
          term: project.term,
          projectTypeId: project.projectTypeId,
          professors: project.professors,
        }))
      );

      setArchivedProjects(
        archivedProjectsData.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          students: project.students,
          projectStatus: ProjectStatus.Past,
          userType: UserType.Teacher,
          studentLimit: project.studentLimit,
          poster: project.poster,
          keywords: project.keywords,
          groupId: project.groupId,
          term: project.term,
          projectTypeId: project.projectTypeId,
          professors: project.professors,
        }))
      );
    }
  }, [projectStateData]);
  const [pagingWorkingData, setPagingWorkingData] = useState<CardProps[]>([]);
  const [pagingArchivedData, setPagingArchivedData] = useState<CardProps[]>([]);

  useEffect(() => {
    const startIndex = (currentPageWorkingProject - 1) * itemCountPerPage;
    const endIndex = startIndex + itemCountPerPage;

    const tempWorkingProjects = workingProjects.slice(startIndex, endIndex);

    setPagingWorkingData(tempWorkingProjects);
  }, [currentPageWorkingProject, workingProjects]);

  useEffect(() => {
    const startIndex = (currentPageArchivedProject - 1) * itemCountPerPage;
    const endIndex = startIndex + itemCountPerPage;

    const tempArchivedProjects = archivedProjects.slice(startIndex, endIndex);

    setPagingArchivedData(tempArchivedProjects);
  }, [archivedProjects, currentPageArchivedProject]);

  return (
    <S.StyledProjectCardListContainer>
      <ProjectListCards
        projects={pagingWorkingData}
        title="Working Projects"
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPageWorkingProject}
        totalPages={workingProjects.length}
        handlePageChange={handlePageChangeWorkingProject}
        userType={UserType.Teacher}
      />
      <ProjectListCards
        projects={pagingArchivedData}
        title="Archived Projects"
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPageArchivedProject}
        totalPages={archivedProjects.length}
        handlePageChange={handlePageChangeArchivedProject}
        userType={UserType.Teacher}
      />
    </S.StyledProjectCardListContainer>
  );
}

export default ProfessorMyProjectsPage;

ProfessorMyProjectsPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useFetchProfessorProjects(
  sessionId: string,
  roles: string[]
): ProjectState | undefined {
  const [projectStateData, setProjectStateData] = useState<ProjectState>();
  useEffect(() => {
    async function fetchData() {
      try {
        const idByProjectRequest = { sessionId, roles: roles };
        await store.dispatch(fetchProjectsById(idByProjectRequest));
        const projectState = store.getState().projects;
        setProjectStateData(projectState);
      } catch (error) {
        console.error("Error fetching professor projects:", error);
      }
    }
    fetchData();
  }, [sessionId, roles]);

  return projectStateData;
}
