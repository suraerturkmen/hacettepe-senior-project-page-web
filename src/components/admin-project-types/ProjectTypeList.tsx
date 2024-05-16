import * as S from "@/components/admin-project-types/ProjectTypeList.styles";
import { ProjectTypeResponse } from "@/redux/features/GetProjectTypes";
import { Drawer, Typography } from "@mui/material";
import TermTimeline from "../professor-student-home-page/TermTimeline/TermTimeline";
import { useState } from "react";
import DrawerWithButton from "../drawers/drawer-with-button/DrawerWithButton";
import { useRouter } from "next/router";

interface ProjectTypeListProps {
  activeTerms: ProjectTypeResponse[];
  archivedTerms: ProjectTypeResponse[];
  notStartedTerms: ProjectTypeResponse[];
  handleArchive: (id: string) => void;
  handleActivate: (id: string) => void;
}

const ProjectTypeList = (props: ProjectTypeListProps): JSX.Element => {
  const {
    activeTerms,
    archivedTerms,
    notStartedTerms,
    handleActivate,
    handleArchive,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTermId, setCurrentTermId] = useState<string>("");
  const router = useRouter();

  const handleClickActivate = (id: string) => {
    setCurrentTermId(id);
    setIsOpen(true);
  };

  const handleConfirmAction = () => {
    handleActivate(currentTermId);
    setIsOpen(false);
  };

  const handleEdit = (term: ProjectTypeResponse) => {
    router.push({
      pathname: "/admin-edit-senior-project-term/[id]",
      query: {
        id: term.id,
        name: term.name,
        timelines: JSON.stringify(term.timelines),
      },
    });
  };

  return (
    <S.StyledWrapper>
      <DrawerWithButton
        message="Are you sure you want to activate this term? Be careful, this action cannot be undone."
        buttonName="Activate"
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        onClick={handleConfirmAction}
      />

      {notStartedTerms.length > 0 && (
        <>
          <S.StyledProjectTypes>
            <S.StyledProjectTypesHeader>
              <Typography variant="h4SubtitleBold" color="#344767">
                Not Started Term
              </Typography>
            </S.StyledProjectTypesHeader>
            {notStartedTerms.map((term) => (
              <S.StyledProjectType key={term.id}>
                <S.StyledEditSection onClick={() => handleEdit(term)}>
                  <S.StyledEditIcon />
                  <Typography variant="bodyBold" color="#344767">
                    Edit
                  </Typography>
                </S.StyledEditSection>
                <TermTimeline timelines={term.timelines} termName={term.name} />
                <S.StyledActivateButton
                  variant="contained"
                  onClick={() => handleClickActivate(term.id)}>
                  <Typography variant="formButtonLargeLabel" color="#FFFFFF">
                    Activate
                  </Typography>
                </S.StyledActivateButton>
              </S.StyledProjectType>
            ))}
          </S.StyledProjectTypes>
          <S.StyledDivider />
        </>
      )}

      {activeTerms.length > 0 && (
        <>
          <S.StyledProjectTypes>
            <S.StyledProjectTypesHeader>
              <Typography variant="h4SubtitleBold" color="#344767">
                Active Term
              </Typography>
            </S.StyledProjectTypesHeader>
            {activeTerms.map((term) => (
              <S.StyledProjectType key={term.id}>
                <TermTimeline timelines={term.timelines} termName={term.name} />
                <S.StyledArchiveButton
                  variant="contained"
                  onClick={() => handleArchive(term.id)}>
                  <Typography variant="formButtonLargeLabel" color="#FFFFFF">
                    Archive
                  </Typography>
                </S.StyledArchiveButton>
              </S.StyledProjectType>
            ))}
          </S.StyledProjectTypes>
          <S.StyledDivider />
        </>
      )}

      {archivedTerms.length > 0 && (
        <S.StyledProjectTypes>
          <S.StyledProjectTypesHeader>
            <Typography variant="h4SubtitleBold" color="#344767">
              Archived Term
            </Typography>
          </S.StyledProjectTypesHeader>
          {archivedTerms.map((term) => (
            <S.StyledProjectType key={term.id}>
              <TermTimeline timelines={term.timelines} termName={term.name} />
            </S.StyledProjectType>
          ))}
        </S.StyledProjectTypes>
      )}
    </S.StyledWrapper>
  );
};

export default ProjectTypeList;
