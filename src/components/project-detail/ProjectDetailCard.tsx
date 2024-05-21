import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ProjectDetail } from "../professor-student-home-page/my-project-overview/MyProjectOverview";
import { UserType } from "../all-projects/project-list-card/ProjectListCard";

export interface ProjectDetailCardProps {
  id?: string;
  title: string;
  term: string;
  description: string;
  poster: string;
  isArrowVisible?: boolean;
}

const ProjectDetailCard = (props: ProjectDetailCardProps): JSX.Element => {
  const { id, title, term, description, poster, isArrowVisible } = props;

  const router = useRouter();

  const userType = isArrowVisible ? UserType.Student : UserType.Teacher;
  const onDocumentClick = () => {
    router.push({
      pathname: "/submit-documents/[id]",
      query: {
        id: id,
        projectId: id,
        projectName: title,
        userType: userType as UserType,
      },
    });
  };

  return (
    <S.StyledCard>
      {isArrowVisible && (
        <S.StyledUploadDocumentButton onClick={onDocumentClick}>
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
