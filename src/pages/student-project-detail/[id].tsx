import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Typography } from "@mui/material";
import ProjectDetailCard from "@/components/project-detail/ProjectDetailCard";
import { GetServerSideProps } from "next";
import {
  ProjectStateId,
  fetchProjectByProjectId,
} from "@/redux/features/GetProjectByProjectId";
import { store } from "@/redux/store";

interface Props {
  id: string;
  isArchive: string;
}

function StudentProjectDetailPage(props: Props) {
  const { id, isArchive } = props;
  const [projectStateData, setProjectStateData] =
    useState<ProjectStateId | null>(null);

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

  return (
    <S.StyledContainer>
      <Typography variant="h3TitleBold" color="#344767">
        Project Detail
      </Typography>
      <ProjectDetailCard
        id={id}
        title={projectStateData?.projectData.data.title || ""}
        term={projectStateData?.projectData.data.term || ""}
        description={projectStateData?.projectData.data.description || ""}
        poster={projectStateData?.projectData.data.poster || ""}
        isArchive={isArchive === "true"}
        projectTypeId={projectStateData?.projectData.data.projectTypeId || ""}
        demoLink={projectStateData?.projectData.data.demoLink || ""}
        websiteLink={projectStateData?.projectData.data.websiteLink || ""}
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
  const { id, isArchive } = context.query;

  return {
    props: {
      id: id as string,
      isArchive: isArchive as string,
    },
  };
};
