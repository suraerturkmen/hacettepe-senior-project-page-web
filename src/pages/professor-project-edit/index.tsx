import ProfessorProjectEdit from "@/components/professor-project-edit/ProfessorProjectEdit";
import { dummyDefaulStudent, dummySelectStudent } from "@/dummyData/dummyData";
import DefaultLayout from "@/layouts/DefaultLayouts";

function ProfessorProjectEditPage() {
  return (
    <ProfessorProjectEdit
      defaultTitle={"Senior Project"}
      defaultDescription={"Create a new project"}
      defaultStudentNumber={2}
      studentNames={dummySelectStudent}
      defaultStudentNames={dummyDefaulStudent}
    />
  );
}

export default ProfessorProjectEditPage;

ProfessorProjectEditPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
