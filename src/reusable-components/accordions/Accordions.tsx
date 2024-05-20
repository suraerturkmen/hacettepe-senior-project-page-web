import * as S from "@/reusable-components/accordions/Accordions.styles";
import Accordion from "@/reusable-components/accordions/Accordion";
import { Announcement } from "@/redux/features/CreateAnnouncement";

interface Props {
  announcements: Announcement[];
}

export const Accordions = (props: Props) => {
  const { announcements } = props;

  return (
    <S.StyledContainer>
      {announcements.map((announcement, index) => (
        <Accordion key={index} {...announcement} />
      ))}
    </S.StyledContainer>
  );
};

export default Accordions;
