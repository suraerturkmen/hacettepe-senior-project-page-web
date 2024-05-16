import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProjectState, fetchProjects } from "@/redux/features/projectSlice";
import ProjectCards from "@/components/project-list/project-cards/ProjectCards";
import DefaultLayout from "@/layouts/DefaultLayouts";
import Pagination from "@/reusable-components/pagination/Pagination";
import * as S from "@/components/project-list/project-cards/ProjectCards.styles";
import {
  FormControl,
  InputLabel,
  TextField,
  Tab,
  Tabs,
  Button,
} from "@mui/material";
import { store } from "@/redux/store";

interface SearchForm {
  search: string;
}

const itemCountPerPage = 6;

function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("TITLE");
  const { register, handleSubmit } = useForm<SearchForm>();

  const [searchTerm, setSearchTerm] = useState("");

  const pagingData = usePaginationProject(
    currentPage,
    itemCountPerPage,
    searchType,
    searchTerm
  )?.projectData;

  //const recommends = useRecommendedProjects();
  const currentProjects = pagingData?.data.map((project) => ({
    authors: [
      ...project.students,
      ...project.professors.map((professor) => professor.username),
    ],
    term: project.term,
    title: project.title,
    description: project.description,
    relatedTopics: project.keywords,
    imageUrl: project.youtubeLink,
    //recommends: JSON.stringify(recommends),
  }));

  const totalElements = pagingData?.totalElements;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSearchType(newValue.toString());
  };

  const onSubmit = (data: SearchForm) => {
    setSearchTerm(data.search);
    setCurrentPage(1);
  };

  return (
    <S.StyledContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.StyledSearchContainer>
          <FormControl>
            <InputLabel>Term</InputLabel>
          </FormControl>
          <S.StyledSearchInputContainer>
            <TextField
              id="search"
              label="Search"
              variant="standard"
              {...register("search")}
            />
            <Button variant="contained" type="submit">
              Search
            </Button>
          </S.StyledSearchInputContainer>
          <Tabs
            value={searchType}
            onChange={handleTabChange}
            textColor="primary"
            indicatorColor="primary">
            <Tab label="TITLE" value="TITLE" />
            <Tab label="AUTHORS" value="AUTHORS" />
            <Tab label="KEYWORDS" value="KEYWORDS" />
          </Tabs>
        </S.StyledSearchContainer>
      </form>
      {currentProjects && <ProjectCards projects={currentProjects} />}
      <Pagination
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPage}
        totalCount={totalElements ? totalElements : 0}
        onChange={handlePageChange}
      />
    </S.StyledContainer>
  );
}

export default Page;

Page.getLayout = (page: JSX.Element) => <DefaultLayout>{page}</DefaultLayout>;

function usePaginationProject(
  pageNumber: number,
  pageSize: number,
  searchType: string,
  searchTerm: string
): ProjectState | undefined {
  const [projectStateData, setProjectStateData] = useState<ProjectState>();

  useEffect(() => {
    async function getData() {
      const searchRequest = {
        search: {
          type: searchType,
          value: searchTerm,
        },
        sort: {
          type: "",
          direction: "ASC",
        },
        pageNumber: pageNumber,
        pageSize: pageSize,
      };
      await store.dispatch(fetchProjects(searchRequest));
      const projectState = store.getState().projects;
      setProjectStateData(projectState);
    }
    getData();
  }, [pageNumber, pageSize, searchType, searchTerm]);

  return projectStateData;
}

function useRecommendedProjects(recommends: string): ProjectState | undefined {
  const [projectStateData, setProjectStateData] = useState<ProjectState>();

  useEffect(() => {
    async function getData() {
      const searchRequest = {};
      //await store.dispatch();
      const projectState = store.getState().projects;
      setProjectStateData(projectState);
    }
    getData();
  }, [recommends]);

  return projectStateData;
}
