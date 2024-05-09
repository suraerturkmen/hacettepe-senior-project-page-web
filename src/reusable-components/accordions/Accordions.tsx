import * as S from "@/reusable-components/accordions/Accordions.styles";
import Accordion, {
  AnnouncementProps,
} from "@/reusable-components/accordions/Accordion";

interface Props {
  announcements: AnnouncementProps[];
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
