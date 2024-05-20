import React, { useEffect, useState } from "react";
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
  imageUrl?: string;
}

function StudentProjectDetailPage(props: Props) {
  const { id, title, term, description, imageUrl } = props;

  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Detail
      </Typography>
      <ProjectDetailCard
        title={title}
        term={term}
        description={description}
        imageUrl={imageUrl ?? ""}
        isArrowVisible={true}
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
  const { id, title, term, description, imageUrl } = context.query;
  return {
    props: {
      id: id as string,
      title: title as string,
      term: term as string,
      description: description as string,
      imageUrl: (imageUrl as string) || "",
    },
  };
};
