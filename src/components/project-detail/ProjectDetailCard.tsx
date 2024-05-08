import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { defaultImageUrl } from "@/dummyData/dummyData";
import { Typography } from "@mui/material";

export interface ProjectDetailCardProps {
  name: string;
  term: string;
  description: string;
  imageUrl: string;
}

const ProjectDetailCard = (props: ProjectDetailCardProps): JSX.Element => {
  const { name, term, description, imageUrl } = props;

  return (
    <S.StyledCard>
      <S.StyledImageTitleContainer>
        <Typography variant="h5TaglineBold" color="#344767">
          {name}
        </Typography>
        {imageUrl && <S.StyledImage src={imageUrl} alt={name} />}
        {!imageUrl && <S.StyledImage src={defaultImageUrl} alt={name} />}
      </S.StyledImageTitleContainer>
      <S.StyledSection>
        <Typography variant="h5TaglineBold" color="#344767">
          Project Term:
        </Typography>
        <Typography variant="bodyBold" color="GrayText">
          {term}
        </Typography>
      </S.StyledSection>
      <S.StyledSection>
        <Typography variant="h5TaglineBold" color="#344767">
          Project Description:
        </Typography>
        <Typography variant="bodyBold" color="GrayText">
          {description}
        </Typography>
      </S.StyledSection>
    </S.StyledCard>
  );
};

export default ProjectDetailCard;
