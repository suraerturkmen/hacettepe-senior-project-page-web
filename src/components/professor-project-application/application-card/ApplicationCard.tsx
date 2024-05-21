import * as S from "@/components/professor-project-application/application-card/ApplicationCard.styles";
import { fetchChangeApplicationStatus } from "@/redux/features/ChangeApplicationStatus";
import { ApplicationStatusType } from "@/redux/features/CreateApplication";
import { ProjectStatus } from "@/redux/features/projectSlice";
import { store } from "@/redux/store";
import { Typography } from "@mui/material";

export interface AppliedProject {
  projectId: string;
  projectName: string;
  applicationStatus: ApplicationStatusType;
  projectStatus: ProjectStatus;
}

export interface ApplicationCardProps {
  applicationId: string;
  groupName: string;
  groupMembers: string[];
  appliedProject: AppliedProject;
}

const ColorMap: { [key in ApplicationStatusType]: string } = {
  [ApplicationStatusType.Approved]: "#599958",
  [ApplicationStatusType.Pending]: "#4034C8",
  [ApplicationStatusType.Rejected]: "#D32F2F",
};

const ApplicationCard = (props: ApplicationCardProps): JSX.Element => {
  const { applicationId, groupName, groupMembers, appliedProject } = props;

  const handleApprove = async () => {
    await store.dispatch(
      fetchChangeApplicationStatus({
        id: applicationId,
        status: ApplicationStatusType.Approved,
      })
    );
    appliedProject.applicationStatus = ApplicationStatusType.Approved;
    window.location.reload();
  };

  const handleReject = async () => {
    await store.dispatch(
      fetchChangeApplicationStatus({
        id: applicationId,
        status: ApplicationStatusType.Rejected,
      })
    );
    window.location.reload();
    appliedProject.applicationStatus = ApplicationStatusType.Rejected;
  };

  return (
    <S.StyledCard>
      {ApplicationStatusType.Pending === appliedProject.applicationStatus && (
        <S.StyledButtonsContainer>
          <S.StyledButton
            variant="contained"
            $color={"#2E7D32"}
            onClick={handleApprove}>
            <Typography color="#FFFFFF">APPROVE</Typography>
          </S.StyledButton>
          <S.StyledButton
            variant="contained"
            $color={"#D32F2F"}
            onClick={handleReject}>
            <Typography color="#FFFFFF">REJECT</Typography>
          </S.StyledButton>
        </S.StyledButtonsContainer>
      )}
      <S.StyledDetailArea>
        <S.StyledFirstColumn>
          <S.StyledSection>
            <Typography variant="h5TaglineBold" color="#344767">
              Group Name:
            </Typography>
            <Typography variant="bodyMedium" color="GrayText">
              {groupName}
            </Typography>
          </S.StyledSection>
          <S.StyledSection>
            <Typography variant="h5TaglineBold" color="#344767">
              Group Members:
            </Typography>
            {groupMembers.map((groupMember, index) => (
              <S.StyledMemberList key={index}>
                <Typography variant="bodyMedium" color="GrayText">
                  {groupMember}
                </Typography>
              </S.StyledMemberList>
            ))}
          </S.StyledSection>
        </S.StyledFirstColumn>
        <S.StyledSection>
          <S.StyledApplicationList>
            <Typography variant="h5TaglineBold" color="#344767">
              Applied Project:
            </Typography>
            <Typography variant="bodyMedium" color="GrayText">
              {appliedProject.projectName}
            </Typography>
          </S.StyledApplicationList>
          <S.StyledApplicationList>
            <Typography variant="h5TaglineBold" color="#344767">
              Application Status:
            </Typography>
            <Typography
              variant="bodyBold"
              color={ColorMap[appliedProject.applicationStatus]}>
              {appliedProject.applicationStatus}
            </Typography>
          </S.StyledApplicationList>
        </S.StyledSection>
      </S.StyledDetailArea>
    </S.StyledCard>
  );
};

export default ApplicationCard;
