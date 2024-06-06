import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Project,
  ProjectState,
  fetchProjects,
} from "@/redux/features/projectSlice";
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
} from "@mui/material";
import { store } from "@/redux/store";
import { fetchGetEmbeddings } from "@/redux/features/AddNewProjectToAI";
import { fetchAddEmbedding } from "@/redux/features/AddEmbeddingToProject";

interface SearchForm {
  search: string;
}

const itemCountPerPage = 6;
function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("TITLE");
  const { register } = useForm<SearchForm>();

  const [searchTerm, setSearchTerm] = useState("");

  const pagingData = usePaginationProject(
    currentPage,
    itemCountPerPage,
    searchType,
    searchTerm
  )?.projectData;

  pagingData?.data.forEach((project) => {
    console.log(project.embedding)
    if (!project.embedding) {
      console.log("here")
      usefetchAndAddEmbedding(project);
    }
  });

  const currentProjects = pagingData?.data.map((project) => ({
    id: project.id,
    authors: [
      ...project.students,
      ...project.professors.map((professor) => professor.username),
    ],
    term: project.term,
    title: project.title,
    description: project.description,
    relatedTopics: project.keywords,
    poster: project.poster,
    projectStatus: project.projectStatus
  }));

  const totalElements = pagingData?.totalElements;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSearchType(newValue.toString());
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <S.StyledContainer>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
      {currentProjects && <ProjectCards projects={currentProjects} />}
      <Pagination
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPage}
        totalCount={totalElements ?? 0}
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

async function usefetchAndAddEmbedding(project: Project) {
  await store.dispatch(
    fetchGetEmbeddings({
      abstract: project.description,
      keywords: project.keywords,
    })
  );
  const embeddingState = store.getState().getEmbeddings;
  const embedding = embeddingState?.projectData?.embeddings;
  const projectId = project.id;

  if (embedding) {
    await store.dispatch(fetchAddEmbedding({ projectId, embedding }));
  }
  return embedding;
}