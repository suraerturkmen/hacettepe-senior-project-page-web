import React, { useState, useEffect, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/all-projects/project-list-cards/ProjectListCards";
import * as S from "@/components/all-projects/project-list-cards/ProjectListCards.styles";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import {
  ProjectState,
  fetchActiveSeniorProjects,
} from "@/redux/features/AllProjectsInActiveTerm";
import { store } from "@/redux/store";
import { GroupState, fetchGetGroups } from "@/redux/features/GroupList";
import { fetchCreateApplication } from "@/redux/features/CreateApplication";
import Cookies from "js-cookie";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import { useRouter } from "next/router";
import { fetchUnApplyProject } from "@/redux/features/UnApplyProject";

function ProfessorAllProjectsPage() {
  const itemCountPerPage = 6;
  const [currentPageProject, setCurrentPageProject] = useState(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [term, setTerm] = useState<string>("");
  const router = useRouter();

  const handleErrorMessageClose = () => {
    setIsError(false);
    router.push("/student-home");
  };

  const handlePageChangeProject = (page: number) => {
    setCurrentPageProject(page);
  };

  const handleApply = async (groupId: string, projectId: string) => {
    await store.dispatch(fetchCreateApplication({ groupId, projectId }));
  };

  const handleUnApply = async (studentId: string, projectId: string) => {
    await store.dispatch(fetchUnApplyProject({ studentId, projectId }));
  };

  let sessionId = "";

  if (typeof window !== "undefined") {
    sessionId = Cookies.get("userId") || "";
  }

  const currentProjects = useFetchActiveSeniorProjects(
    sessionId,
    currentPageProject,
    itemCountPerPage
  );

  useEffect(() => {
    if (currentProjects?.projectData.success === false) {
      setIsError(true);
      setErrorMessage(currentProjects?.projectData.message || "");
    } else {
      setTerm(currentProjects?.projectData?.message || "");
      if (currentProjects?.projectData.data.length === 0) {
        setErrorMessage("No projects found");
        setIsError(true);
      }
    }
  }, [currentProjects, router]);

  const totalPages = currentProjects?.projectData.totalElements;

  const modifiedProjects = currentProjects?.projectData?.data?.map(
    (project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      students: project.students,
      projectType: project.projectStatus,
      userType: UserType.Student,
      studentLimit: project.studentLimit,
      isMyProject: project.myProject,
      isApplied: project.applied,
      poster: project.poster,
      term: project.term,
      professors: project.professors,
    })
  );

  const studentGroups = useFetchStudentGroups();

  return (
    <S.StyledProjectCardListContainer>
      <ErrorDrawer
        errorMessage={errorMessage}
        isError={isError}
        handleErrorMessageClose={handleErrorMessageClose}
      />
      {isError && <S.StyledLoading />}
      {!isError && (
        <ProjectListCards
          projects={modifiedProjects || []}
          title={`${term} Term Projects`}
          itemCountPerPage={itemCountPerPage}
          currentPage={currentPageProject}
          totalPages={totalPages || 0}
          handlePageChange={handlePageChangeProject}
          userType={UserType.Student}
          studentGroups={studentGroups?.groupData.data}
          handleApply={handleApply}
          handleUnApply={handleUnApply}
        />
      )}
    </S.StyledProjectCardListContainer>
  );
}

export default ProfessorAllProjectsPage;

ProfessorAllProjectsPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useFetchActiveSeniorProjects(
  sessionId: string,
  pageNumber: number,
  pageSize: number
): ProjectState | undefined {
  const [projectStateData, setProjectStateData] = useState<ProjectState>();
  useEffect(() => {
    async function fetchData() {
      try {
        const myProjectRequest = { sessionId, pageNumber, pageSize };
        await store.dispatch(fetchActiveSeniorProjects(myProjectRequest));
        const projectState = store.getState().activeSeniorProjects;
        setProjectStateData(projectState);
        console.log("projectState", projectState);
      } catch (error) {
        console.error("Error fetching professor projects:", error);
      }
    }
    fetchData();
  }, [sessionId, pageNumber, pageSize]);

  return projectStateData;
}

function useFetchStudentGroups(): GroupState | undefined {
  const [groupStateData, setGroupStateData] = useState<GroupState>();
  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchGetGroups());
        const groupState = store.getState().groupList;
        setGroupStateData(groupState);
      } catch (error) {
        console.error("Error fetching professor projects:", error);
      }
    }
    fetchData();
  }, []);

  return groupStateData;
}
