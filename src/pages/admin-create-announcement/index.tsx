import AdminCreateAnnouncement from "@/components/admin-create-announcement/AdminCreateAnnouncement";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  CreateAnnouncementRequest,
  fetchCreateAnnouncement,
} from "@/redux/features/CreateAnnouncement";
import { store } from "@/redux/store";
import { useRouter } from "next/router";
import { useState } from "react";

function AdminCreateAnnouncementPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (data: CreateAnnouncementRequest) => {
    await store.dispatch(fetchCreateAnnouncement(data));
    const create = store.getState().createAnnouncement;
    if (create.announcement.success) {
      // create success drawer
      console.log("Successfully created senior project term");

      setTimeout(() => {
        router.push("/admin-home");
      }, 50);
    } else {
      setErrorMessage(create.announcement.message);
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
      <AdminCreateAnnouncement onSubmit={onSubmit} />
    </>
  );
}

export default AdminCreateAnnouncementPage;

AdminCreateAnnouncementPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);
