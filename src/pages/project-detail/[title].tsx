import React, { useEffect, useState } from "react";
import DefaultLayout, { UserRole } from "@/layouts/DefaultLayouts";
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
import {
  ProjectStateId,
  fetchProjectByProjectId,
} from "@/redux/features/GetProjectByProjectId";
import Cookies from "js-cookie";


interface Props {
  id: string;
  isArchive: string;
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
  const { id, isArchive } = props;
  const [recommends, setRecommends] = useState<Project[]>();
  const [projectStateData, setProjectStateData] =
    useState<ProjectStateId | null>(null);
  const ids = useRecommendedIds(id);

  const recommendProjects = useRecommendedProjects(
    ids?.projectData.similar_ids ?? [[]]
  );

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await store.dispatch(fetchProjectByProjectId({ projectId: id }));
        const projectState = store.getState().projectById;
        setProjectStateData(projectState);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setRecommends(recommendProjects?.projectData.data);
  }, [recommendProjects]);


  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const roles = typeof window !== "undefined" ? Cookies.get("roles") : null;

  useEffect(() => {
    if (roles) {
      const parsedRoles = JSON.parse(roles) as string[];
      if (parsedRoles.includes(UserRole.ADMIN)) {
        setUserRole(UserRole.ADMIN);
        Cookies.set("role", UserRole.ADMIN);
      } else if (parsedRoles.includes(UserRole.PROFESSOR)) {
        setUserRole(UserRole.PROFESSOR);
        Cookies.set("role", UserRole.PROFESSOR);
      } else if (parsedRoles.includes(UserRole.STUDENT)) {
        setUserRole(UserRole.STUDENT);
        Cookies.set("role", UserRole.STUDENT);
      } else {
        setUserRole(UserRole.USER);
        Cookies.set("role", UserRole.USER);
      }
    }
  }, [roles]);

  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Detail
      </Typography>
      <ProjectDetailCard
        id={id}
        title={projectStateData?.projectData.data.title ?? ""}
        term={projectStateData?.projectData.data.term ?? ""}
        description={projectStateData?.projectData.data.description ?? ""}
        poster={projectStateData?.projectData.data.poster ?? ""}
        isArchive={isArchive === "true"}
        projectTypeId={projectStateData?.projectData.data.projectTypeId ?? ""}
        demoLink={projectStateData?.projectData.data.demoLink ?? ""}
        websiteLink={projectStateData?.projectData.data.websiteLink ?? ""}
        isArrowVisible={false}
      />
      {recommends && recommends?.length > 0 && (userRole === null || userRole === UserRole.USER) &&
        <Typography variant="h3TitleBold" color="#344767">
          Recommends
        </Typography >
      }
      <S.StyledProjectCardContainer>
        {recommends?.length ? ((userRole === null || userRole === UserRole.USER) &&
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
                projectStatus={project.projectStatus}
                relatedTopics={project.keywords}
              />
            ))}
          </Slider>
        ) : null}
      </S.StyledProjectCardContainer>
    </S.StyledContainer >
  );
}

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id, isArchive } = context.query;
  return {
    props: {
      id: id as string,
      isArchive: isArchive as string,
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
    if (newRequest != null && newRequest.length !== 0) {
      setRequest(newRequest);
    }
  }, [ids]);

  useEffect(() => {
    async function getData() {
      if (request[0]) {
        await store.dispatch(
          fetchProjectIdsProjectList({ projectIds: request ?? [] })
        );
      }
      const recommendProjectsState = store.getState().recommendedProjects;
      setRecommendProjects(recommendProjectsState);
    }

    getData();
  }, [request]);

  return recommendProjects;
}
