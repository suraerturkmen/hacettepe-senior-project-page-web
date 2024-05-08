import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/student-groups/group-cards/GroupCards.styles";
import { Typography } from "@mui/material";
import GroupCards from "@/components/student-groups/group-cards/GroupCards";
import { dummyGroups } from "@/dummyData/dummyData";

function StudentGroupsPage() {
  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        My Groups
      </Typography>
      <GroupCards groups={dummyGroups} />
    </S.StyledContainer>
  );
}

export default StudentGroupsPage;

StudentGroupsPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
