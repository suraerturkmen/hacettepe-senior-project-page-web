import React, { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getAllData } from "@/redux/features/dataSlice";
import {
  ProjectData,
  getPagingData,
} from "@/redux/features/PaginationDataSlice";
import { RootState } from "@/redux/rootReducer";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import ProjectCards from "@/components/project-list/project-cards/ProjectCards";
import DefaultLayout from "@/layouts/DefaultLayouts";
import Pagination from "@/reusable-components/pagination/Pagination";
import * as S from "@/components/project-list/project-cards/ProjectCards.styles";
import { FormControl, InputLabel, TextField, Tab, Tabs } from "@mui/material";

type PagingData = {
  Projects: ProjectData[];
  totalPages: number;
};

function usePaginationProject(
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

        console.log(actionResult);
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

function Page() {
  const itemCountPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const pagingData = usePaginationProject(currentPage, itemCountPerPage);
  const [searchValue, setSearchValue] = useState("Title");
  const currentProjects = pagingData.Projects;
  const totalPages = pagingData.totalPages;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSearchValue(newValue.toString());
  };
  return (
    <S.StyledContainer>
      <S.StyledSearchContainer>
        <FormControl>
          <InputLabel>Term</InputLabel>
        </FormControl>
        <TextField
          id="input-with-icon-textfield"
          label="Search"
          variant="standard"
        />
        <Tabs
          value={searchValue}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary">
          <Tab label="TITLE" value="Title" />
          <Tab label="KEYWORD" value="Keyword" />
          <Tab label="AUTHOR" value="Author" />
        </Tabs>
      </S.StyledSearchContainer>
      {currentProjects && <ProjectCards projects={currentProjects} />}
      <Pagination
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPage}
        totalCount={totalPages}
        onChange={handlePageChange}
      />
    </S.StyledContainer>
  );
}

export default Page;

Page.getLayout = (page: JSX.Element) => <DefaultLayout>{page}</DefaultLayout>;
