import Typography from "@mui/material/Typography";
import * as S from "@/components/my-projects/project-list-card/ProjectListCard.styles";
import { useRouter } from "next/router";
import { GroupProperties } from "@/components/professor-project-edit/ProfessorProjectEdit";
import {
  ProfessorsProperties,
  ProjectStatus,
} from "@/redux/features/projectSlice";
import { fetchDeleteProject } from "@/redux/features/DeleteProject";
import { store } from "@/redux/store";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import Cookies from "js-cookie";
import { TextField, Tooltip } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  UploadLastFilesRequest,
  fetchUploadLastFiles,
} from "@/redux/features/UploadPosterDemoLinkWebsiteLink";
import { createFileFromBase64 } from "@/constants/ByteToPng";
import ErrorDrawer from "@/components/drawers/error-drawer/ErrorDrawer";
import DrawerWithButton from "@/components/drawers/drawer-with-button/DrawerWithButton";

export interface CardProps {
  id: string;
  title: string;
  students?: string[];
  description?: string;
  projectStatus: ProjectStatus;
  userType?: UserType;
  studentLimit: number;
  poster: string;
  keywords: string[];
  groupId?: string;
  term?: string;
  projectTypeId: string;
  professors: ProfessorsProperties[];
  isArrowVisible?: boolean;
  demoLink?: string;
  websiteLink?: string;
}

const ProjectListCard = (props: CardProps): JSX.Element => {
  const {
    id,
    title,
    description,
    students,
    userType,
    projectStatus,
    studentLimit,
    poster,
    keywords,
    groupId,
    professors,
    term,
    isArrowVisible,
    projectTypeId,
    demoLink,
    websiteLink,
  } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isError, setIsError] = useState(false);
  const [uploadLastDocument, setUploadLastDocument] = useState(false);
  const [message, setMessage] = useState("");
  const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
  const [handleFunction, setHandleFunction] = useState<() => void>(() => {});
  const [buttonName, setButtonName] = useState<string>("");

  function handleDelete() {
    let sessionId = "";
    if (typeof window !== "undefined") sessionId = Cookies.get("userId") ?? "";
    else return;
    deleteProjectById(sessionId, id);
    window.location.reload();
  }

  const handleClickDelete = () => {
    setMessage(
      "Are you sure you want to delete this project? All applications will be gone."
    );
    setIsDeleteDrawerOpen(true);
    setHandleFunction(() => handleDelete);
    setButtonName("Delete");
  };

  const handleConfirmAction = () => {
    handleFunction();
    setIsDeleteDrawerOpen(false);
  };

  const handleEdit = () => {
    router.push({
      pathname: "/professor-project-edit/[id]",
      query: {
        id: id,
        title: title,
        studentLimit: studentLimit,
        description: description,
        keywords: keywords,
        defaultStudentGroup: JSON.stringify({
          id: groupId,
          students: students,
        } as GroupProperties),
        professors: JSON.stringify(professors),
        projectStatus: projectStatus,
      },
    });
  };

  const handleView = () => {
    router.push({
      pathname: "/student-project-detail/[id]",
      query: {
        id: id,
        isArchive: projectStatus === ProjectStatus.Past ? "true" : "false",
      },
    });
  };

  const handleSubmitDocument = () => {
    router.push({
      pathname: "/submit-documents/[id]",
      query: {
        id: id,
        projectId: id,
        projectName: title,
        userType: userType,
        projectTypeId: projectTypeId,
      },
    });
  };

  const handleOpen = async () => {
    try {
      if (!poster) {
        setErrorMessage("No file to open");
        setIsError(true);
        return;
      }
      const { url, fileBlob, fileName } = createFileFromBase64(poster, title);
      const newTab = window.open(url, "_blank");
      if (!newTab) {
        alert("Unable to open new tab. Please allow popups for this website.");
      }
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Error opening file:", error);
      setErrorMessage("Error opening file");
      setIsError(true);
    }
  };

  const handleUpload = async (data: any) => {
    setUploadLastDocument(false);
    const byteCharacters = atob(poster);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });

    const posterFile = new File([blob], "poster.png", { type: "image/png" });

    const uploadRequest: UploadLastFilesRequest = {
      projectId: id,
      demoLink: data.demoLink,
      websiteLink: data.websiteLink,
      posterFile: file || posterFile,
    };
    try {
      await store.dispatch(fetchUploadLastFiles(uploadRequest));
      //window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file");
      setIsError(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setIsOpen(true);
    }
  };

  console.log(userType, projectStatus);
  return (
    <S.StyledCard>
      <ErrorDrawer
        errorMessage={errorMessage ?? ""}
        isError={isError}
        handleErrorMessageClose={() => setIsError(false)}
      />
      <DrawerWithButton
        message={message}
        buttonName={buttonName}
        isOpen={isDeleteDrawerOpen}
        handleClose={() => setIsDeleteDrawerOpen(false)}
        onClick={handleConfirmAction}
      />

      {userType === UserType.Student && isArrowVisible && (
        <S.StyledUploadDocumentButton onClick={handleSubmitDocument}>
          <Typography variant="h5TaglineBold" color="#D54949">
            Go to Upload Document
          </Typography>
          <S.StyledArrowForwardIcon />
        </S.StyledUploadDocumentButton>
      )}
      <S.StyledFirstLine>
        <Typography variant="h6BodyTitleBold" color="#344767">
          {title}
        </Typography>
        {userType === UserType.Teacher && (
          <S.StyledDeleteAndEdit>
            {projectStatus === ProjectStatus.Working && (
              <S.StyledClickable onClick={handleClickDelete}>
                <S.StyledDeleteIcon />
                <Typography variant="captionBold" color="#F44334">
                  Delete
                </Typography>
              </S.StyledClickable>
            )}
            <S.StyledClickable onClick={handleEdit}>
              <S.StyledEditIcon />
              <Typography variant="captionBold" color="#344767">
                Edit
              </Typography>
            </S.StyledClickable>
          </S.StyledDeleteAndEdit>
        )}
        {userType === UserType.Student && (
          <S.StyledClickable onClick={handleView}>
            <VisibilityIcon />
            <Typography variant="captionBold" color="#344767">
              View
            </Typography>
          </S.StyledClickable>
        )}
      </S.StyledFirstLine>
      {students && (
        <S.StyledStudentsArea>
          <Typography variant="bodyMedium" color="#7B809A">
            Students:
          </Typography>
          <Typography variant="captionBold" color="#344767">
            {students.join(", ")}
          </Typography>
        </S.StyledStudentsArea>
      )}
      <S.StyledDescriptionArea>
        <Typography variant="bodyMedium" color="#7B809A">
          Project Description:
        </Typography>
        <Tooltip title={description}>
          <S.StyledDescription variant="captionBold" color="#344767">
            {description}
          </S.StyledDescription>
        </Tooltip>
      </S.StyledDescriptionArea>
      {poster && !uploadLastDocument && (
        <S.StyledPosterArea>
          <Typography variant="bodyMedium" color="#7B809A">
            Poster:
          </Typography>
          <S.StyledDownloadButton variant="contained" onClick={handleOpen}>
            Open Poster
          </S.StyledDownloadButton>
        </S.StyledPosterArea>
      )}
      {demoLink && !uploadLastDocument && (
        <S.StyledDemoLinkArea>
          <Typography variant="bodyMedium" color="#7B809A">
            Demo Link:
          </Typography>
          <Typography variant="captionBold" color="#344767">
            <a
              href={demoLink}
              style={{ textDecoration: "none", color: "#344767" }}>
              {demoLink}
            </a>
          </Typography>
        </S.StyledDemoLinkArea>
      )}
      {websiteLink && !uploadLastDocument && (
        <S.StyledWebsiteLinkArea>
          <Typography variant="bodyMedium" color="#7B809A">
            Website Link:
          </Typography>
          <Typography variant="captionBold" color="#344767">
            {websiteLink}
          </Typography>
        </S.StyledWebsiteLinkArea>
      )}
      {!uploadLastDocument && userType === UserType.Student && (
        <S.StyledUploadLastDocumentButton
          onClick={() => setUploadLastDocument(true)}
          variant="contained">
          <Typography variant="formButtonLargeLabel" color="FFFFFF">
            Upload Last Document
          </Typography>
        </S.StyledUploadLastDocumentButton>
      )}

      {uploadLastDocument && userType === UserType.Student && (
        <form onSubmit={handleSubmit(handleUpload)}>
          <S.StyledUploadLastDocumentContainer>
            <S.StyledButtonContainer>
              <TextField
                id="demoLink"
                label="Demo Link"
                helperText="Enter Demo Link"
                color="secondary"
                defaultValue={demoLink}
                {...register("demoLink")}
              />
              <TextField
                id="websiteLink"
                label="Website Link"
                helperText="Enter Website Link"
                color="secondary"
                defaultValue={websiteLink}
                inputProps={{ maxLength: 100 }}
                {...register("websiteLink")}
              />
              <input
                type="file"
                accept="image/png"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="contained-button-file"
              />
              <S.StyledUploadButtonArea>
                <label htmlFor="contained-button-file">
                  <S.StyledUploadButton
                    variant="contained"
                    onClick={() =>
                      document.getElementById("contained-button-file")?.click()
                    }>
                    Select and Upload Poster
                  </S.StyledUploadButton>
                </label>
                <Typography variant="footnoteSmall">Max Size: 10MB</Typography>
              </S.StyledUploadButtonArea>
            </S.StyledButtonContainer>
            <S.StyledSubmitButton type="submit" variant="contained">
              Submit
            </S.StyledSubmitButton>
          </S.StyledUploadLastDocumentContainer>
        </form>
      )}
    </S.StyledCard>
  );
};

export default ProjectListCard;

function deleteProjectById(sessionId: string, projectId: string) {
  async function fetchData() {
    try {
      const deleteProjectRequest = { sessionId, projectId };
      await store.dispatch(fetchDeleteProject(deleteProjectRequest));
    } catch (error) {
      console.error("Error fetching professor projects:", error);
    }
  }
  fetchData();
}
