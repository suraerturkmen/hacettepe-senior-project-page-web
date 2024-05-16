import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/student-groups/group-cards/GroupCards.styles";
import { Typography } from "@mui/material";
import GroupCards from "@/components/student-groups/group-cards/GroupCards";
import { GroupState, fetchGetGroups } from "@/redux/features/GroupList";
import { store } from "@/redux/store";
import { useRouter } from "next/router";

function StudentGroupsPage() {
  const groupStateData = useFetchStudentGroups();
  const groups = groupStateData?.groupData.data;

  const router = useRouter();
  const handleCreateGroup = () => {
    router.push("/student-create-new-group");
  };

  return (
    <S.StyledContainer>
      <S.StyledHeaderContainer>
        <S.StyledButton
          variant="contained"
          color="primary"
          onClick={handleCreateGroup}>
          <Typography variant="formButtonLargeLabel" color="#FFFFFF">
            Create New Group
          </Typography>
        </S.StyledButton>
        <Typography variant="h3TitleBold" color="#344767">
          My Groups
        </Typography>
      </S.StyledHeaderContainer>
      <GroupCards groups={groups || []} />
    </S.StyledContainer>
  );
}

export default StudentGroupsPage;

StudentGroupsPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useFetchStudentGroups(): GroupState | undefined {
  const [groupStateData, setGroupStateData] = useState<GroupState>();
  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchGetGroups());
        const groupState = store.getState().groupList;
        setGroupStateData(groupState);
      } catch (error) {
        console.error("Error fetching professor projects:", error);
      }
    }
    fetchData();
  }, []);

  return groupStateData;
}
