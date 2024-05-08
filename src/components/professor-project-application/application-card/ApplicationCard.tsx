import * as S from "@/components/professor-project-application/application-card/ApplicationCard.styles";
import { Typography } from "@mui/material";

export enum ApplicationStatusType {
  Approved = "Approved",
  Rejected = "Rejected",
  Pending = "Pending",
}

export interface AppliedProject {
  projectName: string;
  applicationStatus: ApplicationStatusType;
}

export interface ApplicationCardProps {
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
  const { groupName, groupMembers, appliedProject } = props;

  return (
    <S.StyledCard>
      {ApplicationStatusType.Pending === appliedProject.applicationStatus && (
        <S.StyledButtonsContainer>
          <S.StyledButton
            variant="contained"
            $color={"#2E7D32"}
            //onClick={handleButtonClick}
          >
            <Typography color="#FFFFFF">APPROVE</Typography>
          </S.StyledButton>
          <S.StyledButton
            variant="contained"
            $color={"#D32F2F"}
            //onClick={handleButtonClick}
          >
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
