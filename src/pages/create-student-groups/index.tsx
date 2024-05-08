import CreateStudentGroups from "@/components/create-student-groups/CreateStudentGroups";
import { dummyStudentsOption } from "@/dummyData/dummyData";
import DefaultLayout from "@/layouts/DefaultLayouts";

function CreateStudentGroupsPage() {
  return <CreateStudentGroups students={dummyStudentsOption} />;
}

export default CreateStudentGroupsPage;

CreateStudentGroupsPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
