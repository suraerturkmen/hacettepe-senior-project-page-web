import * as S from "@/components/student-groups/group-cards/GroupCards.styles";
import GroupCard from "@/components/student-groups/group-card/GroupCard";
import { GroupResponse } from "@/redux/features/GroupList";

interface GroupCardsProps {
  groups: GroupResponse[];
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
