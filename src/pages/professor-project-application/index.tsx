import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/professor-project-application/application-cards/ApplicationCards.styles";
import { Typography } from "@mui/material";
import ApplicationCards from "@/components/professor-project-application/application-cards/ApplicationCards";
import { dummyApplications } from "@/dummyData/dummyData";

function ProfessorProjectApplicationPage() {
  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Applications
      </Typography>
      <ApplicationCards applications={dummyApplications} />
    </S.StyledContainer>
  );
}

export default ProfessorProjectApplicationPage;

ProfessorProjectApplicationPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
