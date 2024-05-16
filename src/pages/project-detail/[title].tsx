import React from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Typography } from "@mui/material";
import ProjectDetailCard from "@/components/project-detail/ProjectDetailCard";
import { GetServerSideProps } from "next";
import { Project } from "@/redux/features/projectSlice";
import ProjectCard from "@/components/project-list/project-card/ProjectCard";
import Slider from "react-slick";

interface Props {
  title: string;
  term: string;
  description: string;
  imageUrl?: string;
  recommends?: string;
}

function ProjectDetailPage(props: Props) {
  const { title, term, description, imageUrl, recommends } = props;
  console.log(title, term, description, imageUrl, recommends);

  let parsedRecommends;

  if (recommends) {
    parsedRecommends = JSON.parse(recommends);
  }

  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Detail
      </Typography>
      <ProjectDetailCard
        title={title}
        term={term}
        description={description}
        imageUrl={imageUrl || ""}
      />
      {parsedRecommends &&
        parsedRecommends.map((project: Project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            term={project.term}
            description={project.description}
            imageUrl={project.imageUrl}
            authors={[
              ...project.students,
              ...project.professors.map((professor) => professor.username),
            ]}
          />
        ))}
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
  const { title, term, description, imageUrl } = context.query;
  return {
    props: {
      title: title as string,
      term: term as string,
      description: description as string,
      imageUrl: (imageUrl as string) || "",
    },
  };
};
