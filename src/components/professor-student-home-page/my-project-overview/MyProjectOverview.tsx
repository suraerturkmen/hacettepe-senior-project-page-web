import * as S from "@/components/professor-student-home-page/my-project-overview/MyProjectOverview.styles";
import { Typography } from "@mui/material";

export type ProjectDetail = {
  id: number;
  name: string;
  documents: string[];
};

export interface MyProjectOverviewProps {
  projects: ProjectDetail[];
}

const MyProjectOverview = (props: MyProjectOverviewProps): JSX.Element => {
  const { projects } = props;
  return (
    <S.StyledContainer>
      <Typography variant="h5TaglineBold" color="#344767">
        My Projects
      </Typography>
      <S.StyledAllProjects>
        {projects.map((project, index) => (
          <S.StyledProjectContainer key={index}>
            {project.name && (
              <Typography variant="h5TaglineBold" color="#344767">
                {project.name}
              </Typography>
            )}
            {/* Use RouterLink to navigate to the documents page */}
            <Typography variant="h5TaglineBold" color="#344767">
              Documents
            </Typography>
          </S.StyledProjectContainer>
        ))}
      </S.StyledAllProjects>
    </S.StyledContainer>
  );
};

export default MyProjectOverview;
