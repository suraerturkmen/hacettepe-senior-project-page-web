import Typography from "@mui/material/Typography";
import * as S from "@/components/my-projects/project-list-card/ProjectListCard.styles";

export enum UserType {
  Student = "Student",
  Teacher = "Teacher",
}

export enum ProjectType {
  Past = "ARCHIVED",
  Working = "WORKING",
  InApplicationProcess = "OFFERED",
}

export interface CardProps {
  name: string;
  students?: string[];
  description?: string;
  projectType: ProjectType;
  userType?: UserType;
}

const ProjectListCard = (props: CardProps): JSX.Element => {
  const { name, description, students, userType, projectType } = props;

  return (
    <S.StyledCard>
      <S.StyledFirstLine>
        <Typography variant="h6BodyTitleBold" color="#344767">
          {name}
        </Typography>
        {userType === UserType.Teacher && (
          <S.StyledDeleteAndEdit>
            <S.StyledDeleteIcon />
            <Typography variant="captionBold" color="#F44334">
              Delete
            </Typography>
            <S.StyledEditIcon />
            <Typography variant="captionBold" color="#344767">
              Edit
            </Typography>
          </S.StyledDeleteAndEdit>
        )}
      </S.StyledFirstLine>
      {students && (
        <S.StyledStudentsArea>
          <Typography variant="bodyMedium" color="GrayText">
            Students:
          </Typography>
          <Typography variant="captionBold" color="#344767">
            {students.join(", ")}
          </Typography>
        </S.StyledStudentsArea>
      )}
      <S.StyledDescriptionArea>
        <Typography variant="bodyMedium" color="GrayText">
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
