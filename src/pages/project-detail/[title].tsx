import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Typography } from "@mui/material";
import ProjectDetailCard from "@/components/project-detail/ProjectDetailCard";
import { GetServerSideProps } from "next";
import { Project, ProjectState } from "@/redux/features/projectSlice";
import ProjectCard from "@/components/project-list/project-card/ProjectCard";
import {
  GetRecommendState,
  fetchGetSimilars,
} from "@/redux/features/RecommendedProjects";
import { store } from "@/redux/store";
import { fetchProjectIdsProjectList } from "@/redux/features/GetProjectsWithIdList";

import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  id: string;
  title: string;
  term: string;
  description: string;
  poster?: string;
}

const SETTINGS: Settings = {
  slidesToScroll: 3,
  slidesToShow: 3,
  variableWidth: true,
  centerMode: true,
  dots: true,
  nextArrow: <ChevronRightIcon />,
  prevArrow: <ChevronLeftIcon />,
  autoplay: true,
};

function ProjectDetailPage(props: Props) {
  const { id, title, term, description, poster } = props;
  const [recommends, setRecommends] = useState<Project[]>();
  const ids = useRecommendedIds(id);

  const recommendProjects = useRecommendedProjects(
    ids?.projectData.similar_ids ?? [[]]
  );

  useEffect(() => {
    setRecommends(recommendProjects?.projectData.data);
  }, [recommendProjects]);

  console.log(recommends);
  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Detail
      </Typography>
      <ProjectDetailCard
        title={title}
        term={term}
        description={description}
        poster={poster ?? ""}
      />
      <S.StyledProjectCardContainer>
        {recommends?.length ? (
          <Slider {...SETTINGS}>
            {recommends.map((project) => (
              <ProjectCard
                key={project.id}
                width="400px"
                id={project.id}
                title={project.title}
                term={project.term}
                description={project.description}
                poster={project.poster}
                authors={[
                  ...project.students,
                  ...project.professors.map((professor) => professor.username),
                ]}
              />
            ))}
          </Slider>
        ) : null}
      </S.StyledProjectCardContainer>
    </S.StyledContainer>
  );
}

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id, title, term, description, poster } = context.query;
  return {
    props: {
      id: id as string,
      title: title as string,
      term: term as string,
      description: description as string,
      poster: (poster as string) || "",
    },
  };
};

function useRecommendedIds(id: string): GetRecommendState | undefined {
  const [recommendStateData, setRecommendStateData] =
    useState<GetRecommendState>();

  useEffect(() => {
    async function getData() {
      await store.dispatch(fetchGetSimilars({ id }));
      const recommendState = store.getState().getSimilars;
      setRecommendStateData(recommendState);
    }
    getData();
  }, [id]);

  return recommendStateData;
}

function useRecommendedProjects(ids: string[][]): ProjectState | undefined {
  const [recommendProjects, setRecommendProjects] = useState<
    ProjectState | undefined
  >(undefined);
  const [request, setRequest] = useState<string[]>([]);

  useEffect(() => {
    const newRequest = ids.map((id) => id[1]);
    setRequest(newRequest);
  }, [ids]);

  useEffect(() => {
    async function getData() {
      await store.dispatch(
        fetchProjectIdsProjectList({ projectIds: request ?? [] })
      );
      const recommendProjectsState = store.getState().recommendedProjects;
      setRecommendProjects(recommendProjectsState);
    }

    getData();
  }, [request]);

  return recommendProjects;
}
