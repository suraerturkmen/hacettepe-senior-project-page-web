import Typography from "@mui/material/Typography";
import * as S from "@/components/all-projects/project-list-card/ProjectListCard.styles";

export enum UserType {
  Student = "Student",
  Teacher = "Teacher",
}

export enum ProjectType {
  Past = "Past",
  Working = "Working",
  InApplicationProcess = "InApplicationProcess",
}

export interface AllProjectsCardProps {
  name: string;
  students?: string[];
  description?: string;
  projectType: ProjectType;
  userType?: UserType;
  needNumberOfStudents?: number;
  isApplied?: boolean;
  handleButtonClick?: () => void; // Get students groups and give selection window
}

const ProjectListCard = (props: AllProjectsCardProps): JSX.Element => {
  const {
    name,
    description,
    students,
    userType,
    projectType,
    needNumberOfStudents,
    isApplied = false,
    handleButtonClick,
  } = props;

  return (
    <S.StyledWrapper>
      <S.StyledCard>
        {(name || userType === UserType.Teacher) && (
          <S.StyledFirstLine>
            {name && (
              <Typography variant="h5TaglineBold" color="#344767">
                {name}
              </Typography>
            )}
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
        )}
        <S.StyledDetails>
          {students && (
            <S.StyledArea>
              <Typography variant="bodyMedium" color="GrayText">
                Students:
              </Typography>
              <Typography variant="bodyMedium" color="#344767">
                {students.join(", ")}
              </Typography>
            </S.StyledArea>
          )}
          {needNumberOfStudents && (
            <S.StyledArea>
              <Typography variant="bodyMedium" color="GrayText">
                Need Number Of Students:
              </Typography>
              <Typography variant="bodyMedium" color="#344767">
                {needNumberOfStudents}
              </Typography>
            </S.StyledArea>
          )}
          {description && (
            <S.StyledArea>
              <Typography variant="bodyMedium" color="GrayText">
                Project Description:
              </Typography>
              <Typography variant="bodyMedium" color="#344767">
                {description}
              </Typography>
            </S.StyledArea>
          )}
        </S.StyledDetails>
      </S.StyledCard>
      {userType === UserType.Student && (
        <S.StyledButton
          variant="contained"
          $color={isApplied ? "#2E7D32" : "#247690"}
          disabled={isApplied}
          onClick={handleButtonClick}>
          <Typography color="#FFFFFF">
            {isApplied ? "APPLIED" : "APPLY"}
          </Typography>
        </S.StyledButton>
      )}
    </S.StyledWrapper>
  );
};

export default ProjectListCard;
