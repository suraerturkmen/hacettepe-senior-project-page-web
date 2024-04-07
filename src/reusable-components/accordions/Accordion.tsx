import { Typography } from "@mui/material";

import * as S from "@/reusable-components/accordions/Accordions.styles";
import ExpandMoreIcon from "@/components/icons/ExpandMoreIcon";

export interface AnnouncementProps {
  date: string;
  title: string;
  content: string;
}

export const Accordion = (props: AnnouncementProps) => {
  const { date, title, content } = props;
  return (
    <S.StyledWrapper>
      <S.StyledAccordion>
        <S.StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="bodyMedium">{date}</Typography>
          <Typography variant="bodyMedium" color="GrayText">
            {title}
          </Typography>
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
