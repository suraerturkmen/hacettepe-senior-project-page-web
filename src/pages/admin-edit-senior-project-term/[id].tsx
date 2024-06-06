import AdminEditSeniorProjectTerm from "@/components/admin-edit-senior-project-term/AdminEditSeniorProjectTerm";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  EditSeniorProjectTermRequest,
  fetchEditSeniorProjectTerm,
} from "@/redux/features/EditSeniorProjectType";
import { store } from "@/redux/store";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  id: string;
  name: string;
  timelines: string;
}

function AdminEditSeniorProjectTermPage(props: Props) {
  const { id, name, timelines } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: EditSeniorProjectTermRequest) => {
    data.id = id;
    await store.dispatch(fetchEditSeniorProjectTerm(data));
    console.log(data)
    const create = store.getState().editSeniorProjectType;
    if (create.seniorProjectData.success) {
      // create success drawer

      console.log("Successfully created senior project term");
      setTimeout(() => {
        router.push("/admin-project-types");
      }, 50);
    } else {
      setErrorMessage(create.seniorProjectData.message);
      setOpen(true);
    }
  };

  return (
    <>
      <ErrorDrawer
        errorMessage={errorMessage}
        isError={open}
        handleErrorMessageClose={() => setOpen(false)}
      />
      <AdminEditSeniorProjectTerm
        onSubmit={onSubmit}
        defaultName={name}
        defaultTimelines={timelines}
      />
    </>
  );
}

export default AdminEditSeniorProjectTermPage;

AdminEditSeniorProjectTermPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  console.log(context.query);
  const { id, name, term, timelines } = context.query;

  return {
    props: {
      id: id as string,
      name: name as string,
      timelines: timelines as string,
    },
  };
};
