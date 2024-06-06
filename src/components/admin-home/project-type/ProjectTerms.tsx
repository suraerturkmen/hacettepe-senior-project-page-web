import * as S from "@/components/admin-home/project-type/ProjectTerms.styles";
import { Typography } from "@mui/material";

export type TermDetail = {
  id: number;
  name: string;
};
export interface ProjectTermProps {
  terms: TermDetail[];
}

const ProjectTerms = (props: ProjectTermProps): JSX.Element => {
  const { terms } = props;
  return (
    <S.StyledContainer>
      <Typography variant="h5TaglineBold" color="#344767">
        Project Term Overview
      </Typography>
      <S.StyledAllProjects>
        {terms.map((term, index) => (
          <S.StyledProjectContainer key={index}>
            {term.name && (
              <Typography variant="h5TaglineBold" color="#344767">
                {term.name}
              </Typography>
            )}
            {/* Use RouterLink to navigate to the term edit page */}
            <Typography variant="h5TaglineBold" color="#344767">
              Edit
            </Typography>
          </S.StyledProjectContainer>
        ))}
      </S.StyledAllProjects>
    </S.StyledContainer>
  );
};

export default ProjectTerms;
