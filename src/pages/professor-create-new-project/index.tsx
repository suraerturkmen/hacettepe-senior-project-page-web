import ProfessorCreateProject from "@/components/professor-create-new-project/ProfessorCreateProject";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  ActiveSeniorProjectTermState,
  fetchActiveSeniorProjectTerm,
} from "@/redux/features/ActiveSeniorProjectTerm";
import {
  CreateProjectRequest,
  fetchCreateProject,
} from "@/redux/features/CreateProjectRequest";
import {
  ProfessorState,
  fetchGetProfessors,
} from "@/redux/features/ProfessorList";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";

function ProfessorCreateNewProjectPage() {
  const onSubmit = async (data: CreateProjectRequest) => {
    console.log(data);
    await store.dispatch(fetchCreateProject(data));
    //const projectState = store.getState().projects;
    //setProjectStateData(projectState);
  };

  const professorsResponse = useGetProfessors()?.professorData.data;
  const professorsAllProfessors = professorsResponse?.professors;
  const currentProfessorUsername = professorsResponse?.currentProfessorUsername;
  const activeSeniorProjectTermData =
    useActiveSeniorProjectTerm()?.activeSeniorProjectTermData.data;
  const activeTerm = activeSeniorProjectTermData?.term || "";
  const projectTypeId = activeSeniorProjectTermData?.id || "";

  return (
    <ProfessorCreateProject
      allProfessors={professorsAllProfessors || []}
      currentProfessorUsername={currentProfessorUsername || ""}
      term={activeTerm}
      projectTypeId={projectTypeId}
      onSubmit={onSubmit}
    />
  );
}

export default ProfessorCreateNewProjectPage;

ProfessorCreateNewProjectPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useGetProfessors() {
  const [projectStateData, setProjectStateData] = useState<ProfessorState>();
  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchGetProfessors());
        const projectState = store.getState().professors;
        setProjectStateData(projectState);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    }
    fetchData();
  }, []);
  return projectStateData;
}

function useActiveSeniorProjectTerm():
  | ActiveSeniorProjectTermState
  | undefined {
  const [activeSeniorProjectTermData, setActiveSeniorProjectTermData] =
    useState<ActiveSeniorProjectTermState>();

  useEffect(() => {
    async function getData() {
      try {
        await store.dispatch(fetchActiveSeniorProjectTerm());
        const activeSeniorProjectTermState =
          store.getState().activeSeniorProjectTerm;
        setActiveSeniorProjectTermData(activeSeniorProjectTermState);
      } catch (error) {
        // Handle error
        console.error("Error fetching active senior project term:", error);
      }
    }
    getData();
  }, []);

  return activeSeniorProjectTermData;
}
