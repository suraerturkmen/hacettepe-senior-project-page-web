import React from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Typography } from "@mui/material";
import ProjectDetailCard from "@/components/project-detail/ProjectDetailCard";
import { GetServerSideProps } from "next";

interface Props {
  title: string;
  term: string;
  description: string;
  imageUrl?: string;
}

function ProjectDetailPage(props: Props) {
  const { title, term, description, imageUrl } = props;
  console.log(title, term, description, imageUrl);
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
