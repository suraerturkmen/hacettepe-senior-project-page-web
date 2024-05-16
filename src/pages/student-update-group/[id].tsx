import UpdateStudentGroup from "@/components/update-student-groups/UpdateStudentGroups";
import DefaultLayout from "@/layouts/DefaultLayouts";

import { StudentState, fetchGetStudents } from "@/redux/features/StudentList";
import {
  UpdateGroupRequest,
  fetchUpdateGroup,
} from "@/redux/features/UpdateGroup";
import { store } from "@/redux/store";
import { GetServerSideProps } from "next";
import { Props } from "next/script";
import { useEffect, useState } from "react";

interface UpdateStudentGroupProps {
  id: string;
  groupName: string;
  groupMembers?: string;
}

function UpdateStudentGroupPage(props: UpdateStudentGroupProps) {
  const { id, groupName, groupMembers } = props;

  const onSubmit = async (data: UpdateGroupRequest) => {
    data.groupId = id;
    await store.dispatch(fetchUpdateGroup(data));
  };

  const studentsResponse = useGetStudents()?.studentData.data;
  const allStudents = studentsResponse?.students;

  const currentStudent = studentsResponse?.currentStudentUsername;

  return (
    <UpdateStudentGroup
      defaultGroupName={groupName}
      defaultStudents={groupMembers || ""}
      students={allStudents || []}
      currentStudentName={currentStudent || ""}
      onSubmit={onSubmit}
    />
  );
}

export default UpdateStudentGroupPage;

UpdateStudentGroupPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id, groupName, groupMembers } = context.query;

  return {
    props: {
      id: id as string,
      groupName: groupName as string,
      groupMembers: groupMembers as string,
    },
  };
};

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
