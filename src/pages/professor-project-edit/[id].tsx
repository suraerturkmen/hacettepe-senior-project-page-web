import ProfessorProjectEdit from "@/components/professor-project-edit/ProfessorProjectEdit";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  ProfessorState,
  fetchGetProfessors,
} from "@/redux/features/ProfessorList";
import {
  UpdateProjectRequest,
  fetchUpdateProject,
} from "@/redux/features/UpdateProject";
import { store } from "@/redux/store";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  title: string;
  description: string;
  studentLimit: string;
  keywords?: string[];
  defaultStudentGroup?: string;
  professors?: string;
}

function ProfessorProjectEditPage(props: Props) {
  const {
    id,
    title,
    description,
    studentLimit,
    keywords,
    defaultStudentGroup,
    professors,
  } = props;
  const newStudentLimit = parseInt(studentLimit);

  const onSubmit = async (data: UpdateProjectRequest) => {
    console.log(data);
    await store.dispatch(fetchUpdateProject(data));
  };

  const professorsResponse = useGetProfessors()?.professorData.data;
  const professorsAllProfessors = professorsResponse?.professors;

  const currentProfessorUsername = professorsResponse?.currentProfessorUsername;

  return (
    <ProfessorProjectEdit
      id={id}
      defaultTitle={title}
      defaultDescription={description}
      defaultStudentNumber={newStudentLimit}
      defaultStudentGroup={defaultStudentGroup}
      defaultKeywords={keywords}
      defaultProfessors={professors || ""}
      allProfessors={professorsAllProfessors || []}
      currentProfessorUsername={currentProfessorUsername || ""}
      onSubmit={onSubmit}
    />
  );
}

export default ProfessorProjectEditPage;

ProfessorProjectEditPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  console.log(context.query);
  const {
    id,
    title,
    studentLimit,
    description,
    poster,
    keywords,
    defaultStudentGroup,
    professors,
  } = context.query;

  return {
    props: {
      id: id as string,
      title: title as string,
      studentLimit: studentLimit as string,
      description: description as string,
      keywords: (keywords as string[]) || [],
      defaultStudentGroup: (defaultStudentGroup as string) || "",
      professors: (professors as string) || "",
    },
  };
};

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
