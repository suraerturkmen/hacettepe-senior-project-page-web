import React, { useState, useEffect, useMemo, use } from "react";
import { useDispatch } from "react-redux";
import {
  ProjectData,
  getPagingData,
} from "@/redux/features/PaginationDataSlice";
import { RootState } from "@/redux/rootReducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import DefaultLayout from "@/layouts/DefaultLayouts";
import ProjectListCards from "@/components/my-projects/project-list-cards/ProjectListCards";
import { dummyProfessorProjects } from "@/dummyData/dummyData";
import * as S from "@/components/my-projects/project-list-cards/ProjectListCards.styles";
import {
  CardProps,
  ProjectType,
  UserType,
} from "@/components/my-projects/project-list-card/ProjectListCard";

type PagingData = {
  Projects: ProjectData[];
  totalPages: number;
};

function ProfessorMyProjectsPage() {
  const itemCountPerPage = 5;
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

function usePaginationWorkingProject(
  pageNumber: number,
  pageSize: number
): PagingData {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const actionResult = await dispatch(
          getPagingData({ pageNumber, pageSize })
        );

        if (getPagingData.fulfilled.match(actionResult)) {
          const pagingData = actionResult.payload;
          setTotalPages(pagingData.totalElements);
          const data = pagingData.data;
          data.reduce((acc: ProjectData[], project: ProjectData) => {
            acc.push(project);
            return acc;
          }, []);
          setProjects(data);
        } else if (getPagingData.rejected.match(actionResult)) {
          setError("An error occurred while fetching data.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch, pageNumber, pageSize]);

  return useMemo(
    () => ({ Projects: projects, totalPages }),
    [projects, totalPages]
  );
}

function usePaginationArchivedProject(
  pageNumber: number,
  pageSize: number
): PagingData {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> =
    useDispatch();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const actionResult = await dispatch(
          getPagingData({ pageNumber, pageSize })
        );

        if (getPagingData.fulfilled.match(actionResult)) {
          const pagingData = actionResult.payload;
          setTotalPages(pagingData.totalElements);
          const data = pagingData.data;
          data.reduce((acc: ProjectData[], project: ProjectData) => {
            acc.push(project);
            return acc;
          }, []);
          setProjects(data);
        } else if (getPagingData.rejected.match(actionResult)) {
          setError("An error occurred while fetching data.");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch, pageNumber, pageSize]);

  return useMemo(
    () => ({ Projects: projects, totalPages }),
    [projects, totalPages]
  );
}
