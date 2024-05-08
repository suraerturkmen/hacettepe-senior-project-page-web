import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/all-projects/project-list-cards/ProjectListCards";
import { dummyAllProjects } from "@/dummyData/dummyData";
import * as S from "@/components/all-projects/project-list-cards/ProjectListCards.styles";
import {
  AllProjectsCardProps,
  UserType,
} from "@/components/all-projects/project-list-card/ProjectListCard";

function ProfessorAllProjectsPage() {
  const itemCountPerPage = 6;
  const [currentPageProject, setCurrentPageProject] = useState(1);
  const [projects, setProjects] = useState<AllProjectsCardProps[]>([]);

  const handlePageChangeProject = (page: number) => {
    setCurrentPageProject(page);
  };

  const [pagingData, setPagingData] = useState<AllProjectsCardProps[]>([]);

  useEffect(() => {
    setProjects(dummyAllProjects);
  }, []);

  useEffect(() => {
    const startIndex = (currentPageProject - 1) * itemCountPerPage;
    const endIndex = startIndex + itemCountPerPage;

    const tempWorkingProjects = projects.slice(startIndex, endIndex);

    setPagingData(tempWorkingProjects);
  }, [currentPageProject, projects]);

  return (
    <S.StyledProjectCardListContainer>
      <ProjectListCards
        projects={pagingData}
        title="2023-2024 Term Projects"
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPageProject}
        totalPages={projects.length}
        handlePageChange={handlePageChangeProject}
      />
    </S.StyledProjectCardListContainer>
  );
}

export default ProfessorAllProjectsPage;

ProfessorAllProjectsPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
