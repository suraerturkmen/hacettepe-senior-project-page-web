import Typography from "@mui/material/Typography";
import * as S from "@/components/my-projects/project-list-card/ProjectListCard.styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { GroupProperties } from "@/components/professor-project-edit/ProfessorProjectEdit";
import {
  ProfessorsProperties,
  ProjectStatus,
} from "@/redux/features/projectSlice";
import { useEffect } from "react";
import { fetchDeleteProject } from "@/redux/features/DeleteProject";
import { store } from "@/redux/store";

export enum UserType {
  Student = "Student",
  Teacher = "Teacher",
}

export interface CardProps {
  id: string;
  title: string;
  students?: string[];
  description?: string;
  projectStatus: ProjectStatus;
  userType?: UserType;
  studentLimit: number;
  imageUrl: string;
  keywords: string[];
  groupId?: string;
  term?: string;
  projectTypeId: string;
  professors: ProfessorsProperties[];
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
    imageUrl,
    keywords,
    groupId,
    professors,
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
        imageUrl: imageUrl,
        keywords: keywords,
        defaultStudentGroup: JSON.stringify({
          id: groupId,
          students: students,
        } as GroupProperties),
        professors: JSON.stringify(professors),
      },
    });
  };

  return (
    <S.StyledCard>
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
