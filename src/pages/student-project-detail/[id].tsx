import React from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Typography } from "@mui/material";
import ProjectDetailCard from "@/components/project-detail/ProjectDetailCard";
import { GetServerSideProps } from "next";

interface Props {
  id: string;
  title: string;
  term: string;
  description: string;
  poster?: string;
  isArchive: string;
  projectTypeId: string;
}

function StudentProjectDetailPage(props: Props) {
  const { id, title, term, description, poster, isArchive, projectTypeId } =
    props;

  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Detail
      </Typography>
      <ProjectDetailCard
        id={id}
        title={title}
        term={term}
        description={description}
        poster={poster ?? ""}
        isArrowVisible={true}
        isArchive={isArchive === "true"}
        projectTypeId={projectTypeId}
      />
    </S.StyledContainer>
  );
}

export default StudentProjectDetailPage;

StudentProjectDetailPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id, title, term, description, poster, isArchive, projectTypeId } =
    context.query;
  return {
    props: {
      id: id as string,
      title: title as string,
      term: term as string,
      description: description as string,
      poster: (poster as string) || "",
      isArchive: isArchive as string,
      projectTypeId: projectTypeId as string,
    },
  };
};
