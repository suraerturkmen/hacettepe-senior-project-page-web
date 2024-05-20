import { Typography } from "@mui/material";

import * as S from "@/reusable-components/accordions/Accordions.styles";
import ExpandMoreIcon from "@/components/icons/ExpandMoreIcon";
import { Announcement } from "@/redux/features/CreateAnnouncement";
import { store } from "@/redux/store";
import {
  DeleteAnnouncementRequest,
  fetchDeleteAnnouncement,
} from "@/redux/features/DeleteAnnouncement";
import { useRouter } from "next/router";

export const Accordion = (props: Announcement) => {
  const { id, createdDate, title, content } = props;

  const router = useRouter();
  let isAdmin = false;

  if (typeof window !== "undefined") {
    isAdmin = localStorage.getItem("roles")?.includes("ROLE_ADMIN")
      ? true
      : false;
  }

  const handleDelete = async () => {
    console.log(id);
    const request = {
      announcementId: id,
    };
    await store.dispatch(fetchDeleteAnnouncement(request));
    router.reload();
  };

  const handleEdit = () => {
    router.push({
      pathname: "/admin-edit-announcement/[id]",
      query: {
        id: id,
        title: title,
        content: content,
      },
    });
  };
  return (
    <S.StyledWrapper>
      <S.StyledAccordion>
        <S.StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <S.StyledContentSection>
            <Typography variant="bodyMedium">
              {new Date(createdDate)
                .toUTCString()
                .split(" ")
                .slice(0, 4)
                .join(" ")}
            </Typography>
            <Typography variant="bodyMedium" color="GrayText">
              {title}
            </Typography>
          </S.StyledContentSection>
          {isAdmin && (
            <S.StyledEditAndDeleteSection>
              <S.StyledDeleteSection onClick={handleDelete}>
                <S.StyledDeleteIcon />
                <Typography variant="captionMedium" color="#F44334">
                  Delete
                </Typography>
              </S.StyledDeleteSection>
              <S.StyledEditSection onClick={handleEdit}>
                <S.StyledEditIcon />
                <Typography variant="captionMedium" color="#344767">
                  Edit
                </Typography>
              </S.StyledEditSection>
            </S.StyledEditAndDeleteSection>
          )}
        </S.StyledAccordionSummary>
        <S.StyledAccordionDetails>
          <S.StyledBox>
            <Typography variant="captionMedium">{content}</Typography>
          </S.StyledBox>
        </S.StyledAccordionDetails>
      </S.StyledAccordion>
    </S.StyledWrapper>
  );
};

export default Accordion;
