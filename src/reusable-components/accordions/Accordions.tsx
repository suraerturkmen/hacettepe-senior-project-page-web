import { Typography } from "@mui/material";

import * as S from "@/reusable-components/accordions/Accordions.styles";
import ExpandMoreIcon from "@/components/icons/ExpandMoreIcon";

export const Accordions = () => {
  return (
    <S.StyledWrapper>
      <S.StyledAccordion>
        <S.StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <S.StyledTypography>Accordion 1</S.StyledTypography>
        </S.StyledAccordionSummary>
        <S.StyledAccordionDetails>
          <S.StyledBox>
            <Typography>Content 1</Typography>
          </S.StyledBox>
        </S.StyledAccordionDetails>
      </S.StyledAccordion>
    </S.StyledWrapper>
  );
};

export default Accordions;
