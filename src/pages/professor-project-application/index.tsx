import React, { useState, useEffect, useMemo, use } from "react";
import DefaultLayout from "@/layouts/DefaultLayouts";
import * as S from "@/components/professor-project-application/application-cards/ApplicationCards.styles";
import { Typography } from "@mui/material";
import ApplicationCards from "@/components/professor-project-application/application-cards/ApplicationCards";
import {
  ApplicationState,
  fetchGetApplications,
} from "@/redux/features/ProfessorProjectApplications";
import { store } from "@/redux/store";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import { useRouter } from "next/router";

function ProfessorProjectApplicationPage() {
  const applicationResponse = useFetchProfessorApplications()?.applicationData;
  const applications = applicationResponse?.data;
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleErrorMessageClose = () => {
    setIsError(false);
    router.push("/professor-home");
  };

  useEffect(() => {
    if (applicationResponse?.success === false) {
      setIsError(true);
      setErrorMessage(applicationResponse.message);
    }
  }, [applicationResponse]);

  return (
    <S.StyledContainer>
      <ErrorDrawer
        isError={isError}
        errorMessage={errorMessage}
        handleErrorMessageClose={handleErrorMessageClose}
      />
      {!isError && (
        <>
          <Typography variant="h3TitleBold" color="#344767">
            Project Applications
          </Typography>
          <ApplicationCards applications={applications || []} />
        </>
      )}
    </S.StyledContainer>
  );
}

export default ProfessorProjectApplicationPage;

ProfessorProjectApplicationPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useFetchProfessorApplications(): ApplicationState | undefined {
  const [applicationState, setApplicationState] = useState<ApplicationState>();
  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchGetApplications());
        const state = store.getState();
        setApplicationState(state.applicationList);
      } catch (error) {
        console.error("Error fetching professor projects:", error);
      }
    }
    fetchData();
  }, []);

  return applicationState;
}
