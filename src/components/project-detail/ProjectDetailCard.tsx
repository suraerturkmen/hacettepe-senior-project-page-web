import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { defaultImageUrl } from "@/dummyData/dummyData";
import { Typography } from "@mui/material";

export interface ProjectDetailCardProps {
  title: string;
  term: string;
  description: string;
  poster: string;
  isArrowVisible?: boolean;
}

const ProjectDetailCard = (props: ProjectDetailCardProps): JSX.Element => {
  const { title, term, description, poster, isArrowVisible } = props;

  return (
    <S.StyledCard>
      {isArrowVisible && (
        <S.StyledUploadDocumentButton>
          <Typography variant="h5TaglineBold" color="#D54949">
            Go to Upload Document
          </Typography>
          <S.StyledArrowForwardIcon />
        </S.StyledUploadDocumentButton>
      )}
      <S.StyledImageTitleContainer>
        <Typography variant="h5TaglineBold" color="#344767">
          {title}
        </Typography>
        {poster && <S.StyledImage src={poster} alt={title} />}
      </S.StyledImageTitleContainer>
      <S.StyledSection>
        <Typography variant="h5TaglineBold" color="#344767">
          Project Term:
        </Typography>
        <Typography variant="bodyBold" color="#7B809A">
          {term}
        </Typography>
      </S.StyledSection>
      <S.StyledSection>
        <Typography variant="h5TaglineBold" color="#344767">
          Project Description:
        </Typography>
        <Typography variant="bodyBold" color="#7B809A">
          {description}
        </Typography>
      </S.StyledSection>
    </S.StyledCard>
  );
};

export default ProjectDetailCard;
