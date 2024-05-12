import Typography from "@mui/material/Typography";
import * as S from "@/components/project-list/project-card/ProjectCard.styles";
import { defaultImageUrl } from "@/dummyData/dummyData";
import Link from "next/link";
import { useRouter } from "next/router";

export interface CardProps {
  authors?: string[];
  term: string;
  title: string;
  description?: string;
  relatedTopics?: string[];
  imageUrl?: string;
}

const ProjectCard = (props: CardProps): JSX.Element => {
  const { authors, term, title, description, relatedTopics, imageUrl } = props;

  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: "/project-detail/[title]",
      query: {
        term: term,
        title: title,
        description: description,
        imageUrl: imageUrl,
      },
    });
  };

  return (
    <S.StyledCard onClick={handleClick}>
      {imageUrl && <S.StyledImage src={imageUrl} alt={title} />}
      {!imageUrl && <S.StyledImage src={defaultImageUrl} alt={title} />}
      <S.StyledContent>
        <S.StyledAuthorAndTerm>
          <S.StyledAuthor>
            {authors &&
              authors.map((author, index) => (
                <Typography key={index} variant="subtitle1" color="blue">
                  {author.split(" ").length > 1 ? author.split(" ")[0] : author}
                </Typography>
              ))}
          </S.StyledAuthor>
          <Typography variant="subtitle1" color="blue">
            {term}
          </Typography>
        </S.StyledAuthorAndTerm>
        <Typography variant="h7Bold">{title}</Typography>
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
