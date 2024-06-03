import Typography from "@mui/material/Typography";
import * as S from "@/components/all-projects/project-list-card/ProjectListCard.styles";
import { useRouter } from "next/router";
import { Dialog, Drawer, Tooltip } from "@mui/material";
import { useState } from "react";
import { GroupResponse } from "@/redux/features/GroupList";
import {
  ProfessorsProperties,
  ProjectStatus,
} from "@/redux/features/projectSlice";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Cookies from "js-cookie";

export enum UserType {
  Student = "Student",
  Teacher = "Teacher",
}

export interface AllProjectsCardProps {
  id: string;
  title: string;
  students?: string[];
  description?: string;
  projectType: ProjectStatus;
  userType?: UserType;
  studentLimit?: number;
  isApplied?: boolean;
  isMyProject?: boolean;
  poster?: string;
  term?: string;
  studentGroups?: GroupResponse[];
  professors?: ProfessorsProperties[];
  handleApply?: (groupId: string, projectId: string) => void;
  handleUnApply?: (studentId: string, projectId: string) => void;
}

const ProjectListCard = (props: AllProjectsCardProps): JSX.Element => {
  const {
    id,
    title,
    description,
    students,
    userType,
    projectType,
    studentLimit,
    isApplied = false,
    isMyProject = false,
    poster,
    term,
    studentGroups,
    professors,
    handleApply,
    handleUnApply,
  } = props;

  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const handleClick = () => {
    router.push({
      pathname: "/project-detail/[title]",
      query: {
        id: id,
        term: term,
        title: title,
        description: description,
        poster: poster,
        isArchive: projectType === ProjectStatus.Past,
      },
    });
  };

  const handleAppliedButtonClick = () => {
    if (!studentGroups) {
      setErrorMessage("You need to create a group first");
      setErrorOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleSelectGroup = (groupId: string) => {
    setOpen(false);
    if (groupId !== "") {
      const selectedGroup = studentGroups?.find(
        (group) => group.id === groupId
      );
      if (
        selectedGroup &&
        studentLimit &&
        studentLimit >= selectedGroup.groupMembers.length
      ) {
        if (handleApply) {
          handleApply(groupId, id);
          if (window !== undefined) {
            window.location.reload();
          }
        }
      } else {
        setErrorMessage("Your group achieved the maximum number of students.");
        setErrorOpen(true);
      }
    }
  };

  const handleUnApplyButtonClick = () => {
    if (handleUnApply) {
      const studentId = Cookies.get("userId");
      handleUnApply(studentId ?? "", id);
      if (window !== undefined) {
        window.location.reload();
      }
    }
  };

  const giveAppliedOrWorkingStatus = () => {
    if (students?.length !== 0) {
      return "IN PROGRESS";
    } else if (isApplied) {
      return "APPLIED";
    } else {
      return "APPLY";
    }
  };

  const giveAppliedOrWorkingStatusButtonColor = () => {
    if (students?.length !== 0) {
      return "#C49403";
    } else if (isApplied) {
      return "#2E7D32";
    } else {
      return "#247690";
    }
  };

  const groupDrawer = () => {
    return (
      <>
        {studentGroups?.map((group, index) => (
          <S.StyledGroupContainer key={index}>
            <S.StyledApproveWithGroupButtonSection>
              <S.StyledApproveWithGroupButton
                variant="contained"
                onClick={() => handleSelectGroup(group.id)}>
                <Typography variant="formButtonLargeLabel">Select</Typography>
              </S.StyledApproveWithGroupButton>
            </S.StyledApproveWithGroupButtonSection>
            <S.StyledSection>
              <Typography variant="h5TaglineBold" style={{ color: "#344767" }}>
                Group Name:
              </Typography>
              <Typography variant="body1" style={{ color: "GrayText" }}>
                {group.groupName}
              </Typography>
            </S.StyledSection>
            <S.StyledSection>
              <Typography variant="h5TaglineBold" style={{ color: "#344767" }}>
                {group.groupMembers.length > 1
                  ? "Group Members:"
                  : "Group Member:"}
              </Typography>
              {group.groupMembers.map((groupMember, memberIndex) => (
                <div key={memberIndex}>
                  <Typography variant="body1" style={{ color: "GrayText" }}>
                    {groupMember.username}
                  </Typography>
                </div>
              ))}
            </S.StyledSection>
          </S.StyledGroupContainer>
        ))}
      </>
    );
  };

  return (
    <S.StyledWrapper>
      <S.StyledDialog
        open={errorOpen}
        onClose={() => {
          setErrorOpen(false);
        }}>
        <S.StyledErrorContainer>
          <ErrorOutlineIcon style={{ color: "#F44334" }} />
          <Typography variant="h5TaglineBold" style={{ color: "#F44334" }}>
            {errorMessage}
          </Typography>
        </S.StyledErrorContainer>
      </S.StyledDialog>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}>
        <S.StyledDraweContainer>{groupDrawer()}</S.StyledDraweContainer>
      </Drawer>

      <S.StyledCard onClick={handleClick}>
        {(title || userType === UserType.Teacher) && (
          <S.StyledFirstLine>
            {title && (
              <Typography variant="h5TaglineBold" color="#344767">
                {title}
              </Typography>
            )}
            {userType === UserType.Teacher && isMyProject && (
              <S.StyledDeleteAndEdit>
                <S.StyledDeleteIcon />
                <Typography variant="captionBold" color="#F44334">
                  Delete
                </Typography>
                <S.StyledEditIcon />
                <Typography variant="captionBold" color="#344767">
                  Edit
                </Typography>
              </S.StyledDeleteAndEdit>
            )}
          </S.StyledFirstLine>
        )}
        <S.StyledDetails>
          <S.StyledArea>
            <Typography variant="bodyMedium" style={{ color: "#7B809A" }}>
              {professors?.length ?? 0 > 1 ? "Professors:" : "Professor:"}
            </Typography>
            <S.StyledProfessors>
              {professors?.map((professor, professorIndex) => (
                <Typography
                  key={professorIndex}
                  variant="bodyMedium"
                  style={{ color: "#344767" }}>
                  {professorIndex === professors?.length - 1
                    ? `${professor.username}`
                    : `${professor.username} ,`}
                </Typography>
              ))}
            </S.StyledProfessors>
          </S.StyledArea>
          {students && students?.length > 0 && (
            <S.StyledArea>
              <Typography variant="bodyMedium" color={"#7B809A"}>
                Students:
              </Typography>
              <Typography variant="bodyMedium" color="#344767">
                {students.join(", ")}
              </Typography>
            </S.StyledArea>
          )}
          {studentLimit && (
            <S.StyledArea>
              <Typography variant="bodyMedium" color="#7B809A">
                Need Number Of Students:
              </Typography>
              <Typography variant="bodyMedium" color="#344767">
                {studentLimit}
              </Typography>
            </S.StyledArea>
          )}
          {description && (
            <S.StyledArea>
              <Typography variant="bodyMedium" color="#7B809A">
                Project Description:
              </Typography>
              <Tooltip title={description}>
                <S.StyledDescription variant="bodyMedium" color="#344767">
                  {description}
                </S.StyledDescription>
              </Tooltip>
            </S.StyledArea>
          )}
        </S.StyledDetails>
      </S.StyledCard>
      {userType === UserType.Student && (
        <S.StyledButton
          variant="contained"
          $color={giveAppliedOrWorkingStatusButtonColor()}
          disabled={students?.length !== 0}
          onClick={
            isApplied ? handleUnApplyButtonClick : handleAppliedButtonClick
          }>
          <Typography color="#FFFFFF">
            {giveAppliedOrWorkingStatus()}
          </Typography>
        </S.StyledButton>
      )}
    </S.StyledWrapper>
  );
};

export default ProjectListCard;
