import Typography from "@mui/material/Typography";
import * as S from "@/components/project-list/project-card/ProjectCard.styles";
import { defaultImageUrl } from "@/dummyData/dummyData";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";
import { ProjectStatus } from "@/redux/features/projectSlice";

export interface CardProps {
  id: string;
  authors?: string[];
  term: string;
  title: string;
  description?: string;
  relatedTopics?: string[];
  poster?: string;
  width?: string;
  projectStatus: ProjectStatus;
}

const ProjectCard = (props: CardProps): JSX.Element => {
  const {
    id,
    authors,
    term,
    title,
    description,
    relatedTopics,
    poster,
    width,
    projectStatus
  } = props;

  const router = useRouter();
  const handleClick = () => {
    if (!id) return;
    const query = {
      id: id,
      title: title,
      isArchive: projectStatus === ProjectStatus.Past ? "true" : "false"
    };

    const queryString = new URLSearchParams(query).toString();
    const path = `/project-detail/${encodeURIComponent(title)}?${queryString}`;

    window.open(path);
  };

  return (
    <S.StyledCard onClick={handleClick} $width={width}>
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

        {relatedTopics && (
          <S.StyledChipContainer>
            {relatedTopics.map((topic, index) => (
              <S.StyledChip key={index}>
                <Typography variant="body2" color="#FFFFFF">
                  {topic}
                </Typography>
              </S.StyledChip>
            ))}
          </S.StyledChipContainer>
        )}
      </S.StyledContent>
    </S.StyledCard>
  );
};

export default ProjectCard;
