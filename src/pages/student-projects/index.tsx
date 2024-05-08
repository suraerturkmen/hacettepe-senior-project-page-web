import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/my-projects/project-list-cards/ProjectListCards";
import { dummyProfessorProjects } from "@/dummyData/dummyData";
import * as S from "@/components/my-projects/project-list-cards/ProjectListCards.styles";
import {
  CardProps,
  ProjectType,
  UserType,
} from "@/components/my-projects/project-list-card/ProjectListCard";

function StudentMyProjectPage() {
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

  useEffect(() => {
    const workingProjectsData = dummyProfessorProjects.filter(
      (project) => project.projectType === ProjectType.Working
    );
    const archivedProjectsData = dummyProfessorProjects.filter(
      (project) => project.projectType === ProjectType.Past
    );

    setWorkingProjects(workingProjectsData);
    setArchivedProjects(archivedProjectsData);
  }, []);

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
        userType={UserType.Student}
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
