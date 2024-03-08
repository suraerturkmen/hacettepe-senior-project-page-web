import Typography from "@mui/material/Typography";
import * as S from "@/components/project-list/ProjectCard/ProjectCard.styles";
import { defaultImageUrl } from "@/dummyData/dummtData";

export interface CardProps {
  authors?: string[];
  term: string;
  name: string;
  description?: string;
  relatedTopics?: string[];
  imageUrl?: string;
}

const ProjectCard = (props: CardProps): JSX.Element => {
  const { authors, term, name, description, relatedTopics, imageUrl } = props;

  return (
    <S.StyledCard>
      {imageUrl && <S.StyledImage src={imageUrl} alt={name} />}
      {!imageUrl && <S.StyledImage src={defaultImageUrl} alt={name} />}
      <S.StyledContent>
        <S.StyledAuthorAndTerm>
          <S.StyledAuthor>
            {authors &&
              authors.map((author, index) => (
                <Typography key={index} variant="subtitle1" color="blue">
                  {author}
                </Typography>
              ))}
          </S.StyledAuthor>
          <Typography variant="subtitle1" color="blue">
            {term}
          </Typography>
        </S.StyledAuthorAndTerm>
        <Typography variant="h7Bold">{name}</Typography>
        {description && <Typography variant="body1">{description}</Typography>}
        <S.StyledChipContainer>
          {relatedTopics && (
            <Typography variant="body2">
              {relatedTopics.map((topic, index) => (
                <S.StyledChip key={index}>
                  <Typography variant="body2">{topic}</Typography>
                </S.StyledChip>
              ))}
            </Typography>
          )}
        </S.StyledChipContainer>
      </S.StyledContent>
    </S.StyledCard>
  );
};

export default ProjectCard;
