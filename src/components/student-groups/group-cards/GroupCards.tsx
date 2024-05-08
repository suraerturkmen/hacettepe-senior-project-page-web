import * as S from "@/components/student-groups/group-cards/GroupCards.styles";
import GroupCard, {
  GroupCardProps,
} from "@/components/student-groups/group-card/GroupCard";
import { Typography } from "@mui/material";

interface GroupCardsProps {
  groups: GroupCardProps[];
}

const GroupCards = (props: GroupCardsProps): JSX.Element => {
  const { groups } = props;
  return (
    <S.StyledGroupCards>
      {groups.map((group, index) => (
        <GroupCard key={index} {...group} />
      ))}
    </S.StyledGroupCards>
  );
};

export default GroupCards;
