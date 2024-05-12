import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/all-projects/project-list-cards/ProjectListCards";
import * as S from "@/components/all-projects/project-list-cards/ProjectListCards.styles";
import {
  ProjectType,
  UserType,
} from "@/components/all-projects/project-list-card/ProjectListCard";
import { useRouter } from "next/router";
import {
  ProjectState,
  fetchActiveSeniorProjects,
} from "@/redux/features/AllProjectsInActiveTerm";
import { store } from "@/redux/store";

function ProfessorAllProjectsPage() {
  const itemCountPerPage = 6;
  const [currentPageProject, setCurrentPageProject] = useState(1);

  const handlePageChangeProject = (page: number) => {
    setCurrentPageProject(page);
  };
  const router = useRouter();

  let sessionId = "";

  if (typeof window !== "undefined") {
    sessionId = localStorage.getItem("userId") || "";
  }

  const currentProjects = useFetchActiveSeniorProjects(
    sessionId,
    currentPageProject,
    itemCountPerPage
  );

  const totalPages = currentProjects?.projectData.totalElements;

  const modifiedProjects = currentProjects?.projectData.data.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    students: project.students,
    projectType: project.projectStatus as ProjectType,
    userType: UserType.Teacher,
    studentLimit: project.studentLimit,
    isMyProject: project.myProject,
    imageUrl: project.youtubeLink,
    term: project.term,
    professors: project.professors,
  }));

  const handleCreateProject = () => {
    router.push("/professor-create-new-project");
  };

  return (
    <S.StyledProjectCardListContainer>
      <S.StyledButton variant="contained" onClick={handleCreateProject}>
        Create Project
      </S.StyledButton>
      <ProjectListCards
        projects={modifiedProjects || []}
        title="2023-2024 Term Projects"
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPageProject}
        totalPages={totalPages || 0}
        handlePageChange={handlePageChangeProject}
        userType={UserType.Teacher}
      />
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
