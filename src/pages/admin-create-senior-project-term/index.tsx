import AdminCreateSeniorProjectTerm from "@/components/admin-create-senior-project-term/AdminCreateSeniorProjectTerm";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  CreateSeniorProjectTermRequest,
  fetchCreateSeniorProjectTerm,
} from "@/redux/features/CreateSeniorProjectType";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import { useState } from "react";

function AdminCreateSeniorProjectPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (data: CreateSeniorProjectTermRequest) => {
    await store.dispatch(fetchCreateSeniorProjectTerm(data));
    const create = store.getState().createSeniorProjectType;
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
      <AdminCreateSeniorProjectTerm onSubmit={onSubmit} />
    </>
  );
}

export default AdminCreateSeniorProjectPage;

AdminCreateSeniorProjectPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
