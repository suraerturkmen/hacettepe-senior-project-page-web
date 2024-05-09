import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/my-projects/project-list-cards/ProjectListCards";
import * as S from "@/components/my-projects/project-list-cards/ProjectListCards.styles";
import {
  CardProps,
  ProjectType,
  UserType,
} from "@/components/my-projects/project-list-card/ProjectListCard";
import { store } from "@/redux/store";
import { ProjectState, fetchProjectsById } from "@/redux/features/projectSlice";

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
      const userIdFromLocalStorage = localStorage.getItem("userId") || "";
      const rolesFromLocalStorage =
        localStorage.getItem("roles") || JSON.stringify(["ROLE_USER"]);
      const roles = JSON.parse(rolesFromLocalStorage);
      setSessionId(userIdFromLocalStorage);
      setUserRoles(roles);
    }
  }, []);

  const projectStateData = useFetchProfessorProjects(
    sessionId,
    userRoles
  )?.projectData;

  useEffect(() => {
    if (projectStateData) {
      const projectsData = projectStateData?.data;
      const workingProjectsData =
        projectsData?.filter(
          (project) => project.projectStatus === ProjectType.Working
        ) || [];
      const archivedProjectsData =
        projectsData?.filter(
          (project) => project.projectStatus === ProjectType.Past
        ) || [];

      const workingProjects = workingProjectsData.map((project) => ({
        name: project.title,
        description: project.description,
        students: project.authorNames,
        projectType: ProjectType.Working,
      }));

      const archivedProjects = archivedProjectsData.map((project) => ({
        name: project.title,
        description: project.description,
        students: project.authorNames,
        projectType: ProjectType.Past,
      }));

      setWorkingProjects(workingProjects);
      setArchivedProjects(archivedProjects);
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
