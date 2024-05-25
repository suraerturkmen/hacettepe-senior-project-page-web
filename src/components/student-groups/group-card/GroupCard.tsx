import * as S from "@/components/student-groups/group-card/GroupCard.styles";
import { ApplicationStatusType } from "@/redux/features/CreateApplication";
import { fetchDeleteGroup } from "@/redux/features/DeleteGroupById";
import { GroupResponse } from "@/redux/features/GroupList";
import { store } from "@/redux/store";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Cookies from "js-cookie";

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
  const { id, groupName, groupMembers, applications } = props;
  const [errorDelete, setErrorDelete] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const handleEdit = () => {
    router.push({
      pathname: "/student-update-group/[id]",
      query: {
        id: id,
        groupName: groupName,
        groupMembers: JSON.stringify(groupMembers),
      },
    });
  };

  const handleDelete = async () => {
    let sessionId = "";
    if (typeof window !== "undefined") sessionId = Cookies.get("userId") ?? "";
    else return;
    console.log("Deleting project with id: ", id);
    await store.dispatch(fetchDeleteGroup({ groupId: id }));
    const deleteState = store.getState().deleteGroup;

    if (deleteState.deleteResponse.success) {
      console.log("Successfully deleted group");
    } else {
      console.log("Failed to delete group");
      setErrorDelete(true);
      setErrorMessage(deleteState.deleteResponse.message);
    }
  };

  return (
    <S.StyledCard>
      <S.StyledDialog open={errorDelete} onClose={() => setErrorDelete(false)}>
        <S.StyledErrorContainer>
          <ErrorOutlineIcon style={{ color: "#F44334" }} />
          <Typography variant="h5TaglineBold" style={{ color: "#F44334" }}>
            {errorMessage}
          </Typography>
        </S.StyledErrorContainer>
      </S.StyledDialog>

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
        {applications.length > 0 && (
          <>
            <Typography variant="h5TaglineBold" color="#344767">
              Applied Projects:
            </Typography>
            {applications.map((appliedProject, index) => (
              <S.StyledApplicationList key={index}>
                <Typography variant="bodyMedium" color="GrayText">
                  {appliedProject.project.title}
                </Typography>
                <Typography
                  variant="bodyBold"
                  color={ColorMap[appliedProject.status]}>
                  {appliedProject.status}
                </Typography>
              </S.StyledApplicationList>
            ))}
          </>
        )}
        {applications.length === 0 && (
          <S.StyledNoAppliedProjects>
            <Typography variant="bodyMedium" color="GrayText">
              No applied projects
            </Typography>
          </S.StyledNoAppliedProjects>
        )}
      </S.StyledSection>
      <S.StyledEditDeleteSection>
        <S.StyledEditSection onClick={handleEdit}>
          <S.StyledEditIcon />
          <Typography variant="bodyBold" color="#344767">
            Edit
          </Typography>
        </S.StyledEditSection>
        {
          <S.StyledEditSection onClick={handleDelete}>
            <S.StyledDeleteIcon />
            <Typography variant="bodyBold" color="#F44334">
              Delete
            </Typography>
          </S.StyledEditSection>
        }
      </S.StyledEditDeleteSection>
    </S.StyledCard>
  );
};

export default GroupCard;
