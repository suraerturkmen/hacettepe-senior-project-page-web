import ProfessorCreateProject from "@/components/professor-create-new-project/ProfessorCreateProject";
import DefaultLayout from "@/layouts/DefaultLayouts";

function ProfessorCreateNewProjectPage() {
  return <ProfessorCreateProject />;
}

export default ProfessorCreateNewProjectPage;

ProfessorCreateNewProjectPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
