import * as S from "@/components/student-groups/group-card/GroupCard.styles";
import { ApplicationStatusType } from "@/redux/features/CreateApplication";
import { GroupResponse } from "@/redux/features/GroupList";
import { Typography } from "@mui/material";

export interface AppliedProject {
  projectName: string;
  applicationStatus: ApplicationStatusType;
}

const ColorMap: { [key in ApplicationStatusType]: string } = {
  [ApplicationStatusType.Approved]: "#599958",
  [ApplicationStatusType.Pending]: "#4034C8",
  [ApplicationStatusType.Rejected]: "#D32F2F",
};

const GroupCard = (props: GroupResponse): JSX.Element => {
  const { groupName, groupMembers, applications } = props;

  return (
    <S.StyledCard>
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
                {groupMember.username}
              </Typography>
            </S.StyledMemberList>
          ))}
        </S.StyledSection>
      </S.StyledFirstColumn>
      <S.StyledSection>
        <Typography variant="h5TaglineBold" color="#344767">
          Applied Projects:
        </Typography>
        {applications.map((appliedProject, index) => (
          <S.StyledApplicationList key={index}>
            <Typography variant="bodyMedium" color="GrayText">
              {appliedProject.projectTitle}
            </Typography>
            <Typography
              variant="bodyBold"
              color={ColorMap[appliedProject.status]}>
              {appliedProject.status}
            </Typography>
          </S.StyledApplicationList>
        ))}
      </S.StyledSection>
      <S.StyledEditSection>
        <S.StyledEditIcon />
        <Typography variant="bodyBold" color="#344767">
          Edit
        </Typography>
      </S.StyledEditSection>
    </S.StyledCard>
  );
};

export default GroupCard;
