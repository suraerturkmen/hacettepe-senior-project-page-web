import Typography from "@mui/material/Typography";
import * as S from "@/components/project-list/project-card/ProjectCard.styles";
import { defaultImageUrl } from "@/dummyData/dummyData";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

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

  {
    !imageUrl && <S.StyledImage src={imageUrl} alt={title} />;
  }

  return (
    <S.StyledCard onClick={handleClick}>
      {<S.StyledImage src={defaultImageUrl} alt={title} />}
      <S.StyledContent>
        <S.StyledAuthorAndTerm>
          <Tooltip title={authors?.join(", ")}>
            <S.StyledAuthor>
              {authors &&
                authors.map((author, index) => (
                  <Typography
                    key={index}
                    variant="bodySemiboldUnderline"
                    color="#2196F3"
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      flexShrink: 1,
                      minWidth: 0,
                    }}>
                    {author.split(" ").length > 1
                      ? author.split(" ")[0]
                      : author}
                    {index !== authors.length - 1 && authors.length > 1 && ","}
                  </Typography>
                ))}
            </S.StyledAuthor>
          </Tooltip>
          <S.StyledTerm>
            <Typography variant="subtitle1" color="#2196F3">
              {term}
            </Typography>
          </S.StyledTerm>
        </S.StyledAuthorAndTerm>
        <Typography variant="bodyBold">{title}</Typography>
        {description && (
          <Tooltip title={description}>
            <S.StyledDescription variant="body1">
              {description}
            </S.StyledDescription>
          </Tooltip>
        )}
        <S.StyledChipContainer>
          {relatedTopics && (
            <>
              {relatedTopics.map((topic, index) => (
                <S.StyledChip key={index}>
                  <Typography variant="body2">{topic}</Typography>
                </S.StyledChip>
              ))}
            </>
          )}
        </S.StyledChipContainer>
      </S.StyledContent>
    </S.StyledCard>
  );
};

export default ProjectCard;
