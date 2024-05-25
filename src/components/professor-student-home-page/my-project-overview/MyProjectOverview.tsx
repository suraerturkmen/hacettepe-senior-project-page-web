import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";
import * as S from "@/components/professor-student-home-page/my-project-overview/MyProjectOverview.styles";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export type ProjectDetail = {
  id: string;
  title: string;
  projectTypeId: string;
};

export interface MyProjectOverviewProps {
  projects: ProjectDetail[];
  userType: UserType;
}

const MyProjectOverview = (props: MyProjectOverviewProps): JSX.Element => {
  const { projects, userType } = props;
  const router = useRouter();
  const onDocumentClick = (project: ProjectDetail) => {
    router.push({
      pathname: "/submit-documents/[id]",
      query: {
        id: project.id,
        projectId: project.id,
        projectName: project.title,
        userType: userType as UserType,
        projectTypeId: project.projectTypeId,
      },
    });
  };

  return (
    <S.StyledContainer>
      <Typography variant="h5TaglineBold" color="#344767">
        My Projects
      </Typography>
      <S.StyledAllProjects>
        {projects.map((project, index) => (
          <S.StyledProjectContainer key={index}>
            {project.title && (
              <S.StyledTypography variant="h7Bold" color="#344767">
                {project.title}
              </S.StyledTypography>
            )}
            <S.StyledButton
              variant="contained"
              onClick={() => onDocumentClick(project)}>
              <Typography variant="h5TaglineBold" color="#FFFFFF">
                Documents
              </Typography>
            </S.StyledButton>
          </S.StyledProjectContainer>
        ))}
      </S.StyledAllProjects>
    </S.StyledContainer>
  );
};

export default MyProjectOverview;
