import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Typography } from "@mui/material";
import ProjectDetailCard from "@/components/project-detail/ProjectDetailCard";

function ProjectDetailPage() {
  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Detail
      </Typography>
      <ProjectDetailCard
        name={"Title"}
        term={"2023-2024"}
        description={
          "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum"
        }
        imageUrl={""}
      />
    </S.StyledContainer>
  );
}

export default ProjectDetailPage;

ProjectDetailPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
