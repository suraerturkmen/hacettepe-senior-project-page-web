import AdminUpdateAnnouncement from "@/components/admin-update-announcement/AdminUpdateAnnouncement";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import DefaultLayout from "@/layouts/DefaultLayouts";
import {
  UpdateAnnouncementRequest,
  fetchUpdateAnnouncement,
} from "@/redux/features/UpdateAnnouncement";
import { store } from "@/redux/store";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  id: string;
  title: string;
  content: string;
}

function AdminEditAnnouncementPage(props: Props) {
  const { id, title, content } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const onSubmit = async (data: UpdateAnnouncementRequest) => {
    data.id = id;
    await store.dispatch(fetchUpdateAnnouncement(data));
    const update = store.getState().updateAnnouncement;
    if (update.announcement.success) {
      // create success drawer
      console.log("Successfully created senior project term");

      setTimeout(() => {
        router.push("/admin-home");
      }, 50);
    } else {
      setErrorMessage(update.announcement.message);
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
      <AdminUpdateAnnouncement
        title={title}
        content={content}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default AdminEditAnnouncementPage;

AdminEditAnnouncementPage.getLayout = (page: JSX.Element) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id, title, content } = context.query;
  return {
    props: {
      id: id as string,
      title: title as string,
      content: content as string,
    },
  };
};
