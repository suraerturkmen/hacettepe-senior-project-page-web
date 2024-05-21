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
  } = props;

  const router = useRouter();
  const handleDelete = () => {
    let sessionId = "";
    if (typeof window !== "undefined")
      sessionId = localStorage.getItem("userId") ?? "";
    else return;
    console.log("Deleting project with id: ", id);
    deleteProjectById(sessionId, id);
    window.location.reload();
  };

  const handleEdit = () => {
    router.push({
      pathname: "/professor-project-edit/[id]",
      query: {
        id: id,
        title: title,
        studentLimit: studentLimit,
        description: description,
        poster: poster,
        keywords: keywords,
        defaultStudentGroup: JSON.stringify({
          id: groupId,
          students: students,
        } as GroupProperties),
        professors: JSON.stringify(professors),
      },
    });
  };

  const handleView = () => {
    router.push({
      pathname: "/student-project-detail/[id]",
      query: {
        id: id,
        term: term,
        title: title,
        description: description,
        poster: poster,
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
      },
    });
  };

  return (
    <S.StyledCard>
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
            <S.StyledClickable onClick={handleDelete}>
              <S.StyledDeleteIcon />
              <Typography variant="captionBold" color="#F44334">
                Delete
              </Typography>
            </S.StyledClickable>
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
        <Typography variant="captionBold" color="#344767">
          {description}
        </Typography>
      </S.StyledDescriptionArea>
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
