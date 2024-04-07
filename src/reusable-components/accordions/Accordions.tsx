import * as S from "@/reusable-components/accordions/Accordions.styles";
import Accordion, {
  AnnouncementProps,
} from "@/reusable-components/accordions/Accordion";

interface Props {
  annoncements: AnnouncementProps[];
}

export const Accordions = (props: Props) => {
  const { annoncements } = props;

  return (
    <S.StyledContainer>
      {annoncements.map((announcement, index) => (
        <Accordion key={index} {...announcement} />
      ))}
    </S.StyledContainer>
  );
};

export default Accordions;
