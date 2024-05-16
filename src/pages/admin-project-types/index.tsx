import React, { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  EProjectTypeStatus,
  ProjectTypeResponse,
  fetchGetProjectTypes,
} from "@/redux/features/GetProjectTypes";
import { store } from "@/redux/store";
import ProjectTypeList from "@/components/admin-project-types/ProjectTypeList";
import { fetchArchivedSeniorProjectTerm } from "@/redux/features/ArchivedSeniorProjectTerm";
import { fetchActivateSeniorProjectTerm } from "@/redux/features/ActivateSeniorProjectTerm";
import * as S from "@/components/admin-project-types/ProjectTypeList.styles";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import { set } from "date-fns";

function AdminProjectTypesPage() {
  const [activeTerms, setActiveTerms] = useState<ProjectTypeResponse[]>([]);
  const [archivedTerms, setArchivedTerms] = useState<ProjectTypeResponse[]>([]);
  const [notStartedTerms, setNotStartedTerms] = useState<ProjectTypeResponse[]>(
    []
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const projectTypes = useFetchGetProjectTypes();

  useEffect(() => {
    if (projectTypes) {
      setNotStartedTerms([]);
      setActiveTerms([]);
      setArchivedTerms([]);
      projectTypes.map((projectType) => {
        if (projectType.activeness === EProjectTypeStatus.ACTIVE) {
          setActiveTerms((prev) => [...prev, projectType]);
        } else if (projectType.activeness === EProjectTypeStatus.NOT_STARTED) {
          setNotStartedTerms((prev) => [...prev, projectType]);
        } else if (projectType.activeness === EProjectTypeStatus.ARCHIVED) {
          setArchivedTerms((prev) => [...prev, projectType]);
        }
      });
    }
  }, [projectTypes]);

  const handleArchive = async (id: string) => {
    const request = {
      id: id,
    };
    console.log("request", request);
    await store.dispatch(fetchArchivedSeniorProjectTerm(request));
    setTimeout(() => {
      if (window !== undefined) window.location.reload();
    }, 50);
  };

  const handleActivate = async (id: string) => {
    const request = {
      id: id,
    };

    await store.dispatch(fetchActivateSeniorProjectTerm(request));
    const activate = store.getState().activateSeniorProjectTerm;
    if (activate.activeSeniorProjectTermData.success) {
      console.log("Successfully activated project type");
      setTimeout(() => {
        if (window !== undefined) window.location.reload();
      }, 50);
    } else {
      setErrorMessage(activate.activeSeniorProjectTermData.message);
      setOpen(true);
    }
  };

  const router = useRouter();
  const handleCreateSeniorProjectTerm = () => {
    router.push("/admin-create-senior-project-term");
  };

  return (
    <S.StyledPageContainer>
      <ErrorDrawer
        errorMessage={errorMessage}
        isError={open}
        handleErrorMessageClose={() => setOpen(false)}
      />
      <S.StyledCreateProjectTypeButton onClick={handleCreateSeniorProjectTerm}>
        <Typography variant="h5TaglineBold" color="#FFFFFF">
          Create Project Type
        </Typography>
      </S.StyledCreateProjectTypeButton>
      <ProjectTypeList
        notStartedTerms={notStartedTerms}
        activeTerms={activeTerms}
        archivedTerms={archivedTerms}
        handleArchive={handleArchive}
        handleActivate={handleActivate}
      />
    </S.StyledPageContainer>
  );
}

export default AdminProjectTypesPage;

AdminProjectTypesPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useFetchGetProjectTypes() {
  const [projectTypes, setProjectTypes] = useState<ProjectTypeResponse[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchGetProjectTypes());
        const projectTypes = store.getState().projectTypes.projectTypeData.data;
        setProjectTypes(projectTypes);
      } catch (error) {
        console.error("Error fetching project types", error);
      }
    }
    fetchData();
  }, []);

  return projectTypes;
}
