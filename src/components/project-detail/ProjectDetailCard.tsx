import * as S from "@/components/project-detail/ProjectDetailCard.styles";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { UserType } from "../all-projects/project-list-card/ProjectListCard";
import { useState } from "react";

export interface ProjectDetailCardProps {
  id?: string;
  title: string;
  term: string;
  description: string;
  poster: string;
  isArrowVisible?: boolean;
  isArchive: boolean;
  projectTypeId: string;
  demoLink?: string;
  websiteLink?: string;
}

const ProjectDetailCard = (props: ProjectDetailCardProps): JSX.Element => {
  const {
    id,
    title,
    term,
    description,
    poster,
    isArrowVisible,
    isArchive,
    projectTypeId,
    demoLink,
    websiteLink,
  } = props;

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userType = isArrowVisible ? UserType.Student : UserType.Teacher;
  const onDocumentClick = () => {
    router.push({
      pathname: "/submit-documents/[id]",
      query: {
        id: id,
        projectId: id,
        projectName: title,
        userType: userType as UserType,
        projectTypeId: projectTypeId,
      },
    });
  };

  const handleOpenImageInDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <S.StyledCard>
      <S.StyledDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}>
        <S.StyledDialogContent>
          {poster && (
            <S.StyledDialogImage
              src={`data:image/png;base64,${poster}`}
              alt="project poster"
              onClick={handleOpenImageInDialog}
            />
          )}
        </S.StyledDialogContent>
      </S.StyledDialog>
      {isArrowVisible && (
        <S.StyledUploadDocumentButton onClick={onDocumentClick}>
          <Typography variant="h5TaglineBold" color="#D54949">
            {isArchive ? "Go to Documents" : "Go to Upload Documents"}
          </Typography>
          <S.StyledArrowForwardIcon />
        </S.StyledUploadDocumentButton>
      )}
      <S.StyledImageTitleContainer>
        <Typography variant="h5TaglineBold" color="#344767">
          {title}
        </Typography>
        {poster && (
          <S.StyledImage
            src={`data:image/png;base64,${poster}`}
            alt="project poster"
            onClick={handleOpenImageInDialog}
          />
        )}
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
      {demoLink && (
        <S.StyledSection>
          <Typography variant="h5TaglineBold" color="#344767">
            Demo Link:
          </Typography>
          <Typography variant="captionBold" color="#344767">
            <a
              href={demoLink}
              style={{ textDecoration: "none", color: "#344767" }}
              target="_blank">
              {demoLink}
            </a>
          </Typography>
        </S.StyledSection>
      )}
      {websiteLink && (
        <S.StyledSection>
          <Typography variant="h5TaglineBold" color="#344767">
            Website Link:
          </Typography>
          <Typography variant="captionBold" color="#344767">
            <a
              href={websiteLink}
              style={{ textDecoration: "none", color: "#344767" }}>
              {websiteLink}
            </a>
          </Typography>
        </S.StyledSection>
      )}
    </S.StyledCard>
  );
};

export default ProjectDetailCard;
