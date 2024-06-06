import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/my-projects/project-list-cards/ProjectListCards";
import * as S from "@/components/my-projects/project-list-cards/ProjectListCards.styles";
import { CardProps } from "@/components/my-projects/project-list-card/ProjectListCard";
import { ProjectState, ProjectStatus } from "@/redux/features/projectSlice";
import { store } from "@/redux/store";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import Cookies from "js-cookie";
import { fetchProjectsById } from "@/redux/features/GetMyProject";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import { useRouter } from "next/router";

function StudentMyProjectPage() {
  const itemCountPerPage = 4;
  const [currentPageWorkingProject, setCurrentPageWorkingProject] = useState(1);
  const [currentPageArchivedProject, setCurrentPageArchivedProject] =
    useState(1);
  const [workingProjects, setWorkingProjects] = useState<CardProps[]>([]);
  const [archivedProjects, setArchivedProjects] = useState<CardProps[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

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
      const userIdFromCookies = Cookies.get("userId") ?? "";
      const rolesFromCookies =
        Cookies.get("roles") ?? JSON.stringify(["ROLE_USER"]);
      const roles = JSON.parse(rolesFromCookies);
      setSessionId(userIdFromCookies);
      setUserRoles(roles);
    }
  }, []);

  const handleErrorMessageClose = () => {
    setIsError(false);
    router.push("/student-home")
  };

  useEffect(() => {
    async function fetchProjects() {
      if (sessionId && userRoles.length > 0) {
        try {
          const idByProjectRequest = { sessionId, roles: userRoles };
          await store.dispatch(fetchProjectsById(idByProjectRequest));
          const projectState = store.getState().myProjects as ProjectState;

          const workingProjectsData = projectState.projectData.data?.filter(
            (project) => project.projectStatus === ProjectStatus.Working
          ) || [];

          const archivedProjectsData = projectState.projectData.data?.filter(
            (project) => project.projectStatus === ProjectStatus.Past
          ) || [];

          setWorkingProjects(workingProjectsData.map((project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            students: project.students,
            projectStatus: ProjectStatus.Working,
            userType: UserType.Student,
            studentLimit: project.studentLimit,
            poster: project.poster,
            keywords: project.keywords,
            groupId: project.groupId,
            term: project.term,
            projectTypeId: project.projectTypeId,
            professors: project.professors,
            demoLink: project.demoLink,
            websiteLink: project.websiteLink,
          })));

          setArchivedProjects(archivedProjectsData.map((project) => ({
            id: project.id,
            title: project.title,
            description: project.description,
            students: project.students,
            projectStatus: ProjectStatus.Past,
            userType: UserType.Student,
            studentLimit: project.studentLimit,
            poster: project.poster,
            keywords: project.keywords,
            groupId: project.groupId,
            term: project.term,
            projectTypeId: project.projectTypeId,
            professors: project.professors,
            demoLink: project.demoLink,
            websiteLink: project.websiteLink,
          })));

          if (workingProjectsData.length === 0 && archivedProjectsData.length === 0) {
            setIsError(true);
            setErrorMessage("You do not have any projects");
          }
        } catch (error) {
          console.error("Error fetching student projects:", error);
          setIsError(true);
          setErrorMessage("Error fetching projects. Please try again later.");
        }
      }
    }

    fetchProjects();
  }, [sessionId, userRoles]);


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
      <ErrorDrawer
        errorMessage={errorMessage}
        isError={isError}
        handleErrorMessageClose={handleErrorMessageClose}
      />

      <ProjectListCards
        projects={pagingWorkingData}
        title="Working Projects"
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPageWorkingProject}
        totalPages={workingProjects.length}
        handlePageChange={handlePageChangeWorkingProject}
        userType={UserType.Student}
        isArrowVisible={true}
      />
      <ProjectListCards
        projects={pagingArchivedData}
        title="Archived Projects"
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPageArchivedProject}
        totalPages={archivedProjects.length}
        handlePageChange={handlePageChangeArchivedProject}
        userType={UserType.Student}
      />
    </S.StyledProjectCardListContainer>
  );
}

export default StudentMyProjectPage;

StudentMyProjectPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useFetchStudentProjects(
  sessionId: string,
  roles: string[]
): ProjectState | undefined {
  const [projectStateData, setProjectStateData] = useState<ProjectState>();
  useEffect(() => {
    async function fetchData() {
      try {
        const idByProjectRequest = { sessionId, roles: roles };
        await store.dispatch(fetchProjectsById(idByProjectRequest));
        const projectState = store.getState().myProjects;
        setProjectStateData(projectState);
      } catch (error) {
        console.error("Error fetching professor projects:", error);
      }
    }
    fetchData();
  }, [sessionId, roles]);

  return projectStateData;
}
