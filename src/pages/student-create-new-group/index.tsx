import CreateStudentGroups from "@/components/create-student-groups/CreateStudentGroups";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  CreateGroupRequest,
  fetchCreateGroup,
} from "@/redux/features/CreateGroup";
import { StudentState, fetchGetStudents } from "@/redux/features/StudentList";
import { store } from "@/redux/store";
import { useEffect, useState } from "react";

function CreateStudentGroupsPage() {
  const onSubmit = async (data: CreateGroupRequest) => {
    await store.dispatch(fetchCreateGroup(data));
  };

  const studentsResponse = useGetStudents()?.studentData.data;
  const allStudents = studentsResponse?.students;

  const currentStudent = studentsResponse?.currentStudentUsername;

  return (
    <CreateStudentGroups
      students={allStudents || []}
      currentStudentName={currentStudent || ""}
      onSubmit={onSubmit}
    />
  );
}

export default CreateStudentGroupsPage;

CreateStudentGroupsPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

function useGetStudents() {
  const [studentStateData, setStudentStateData] = useState<StudentState>();
  useEffect(() => {
    async function fetchData() {
      try {
        await store.dispatch(fetchGetStudents());
        const studentState = store.getState().students;
        setStudentStateData(studentState);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    }
    fetchData();
  }, []);
  return studentStateData;
}
