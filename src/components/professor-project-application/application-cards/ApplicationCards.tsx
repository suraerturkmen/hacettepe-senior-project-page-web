import * as S from "@/components/professor-project-application/application-cards/ApplicationCards.styles";
import ApplicationCard, {
  ApplicationCardProps,
} from "@/components/professor-project-application/application-card/ApplicationCard";

interface ApplicationCardsProps {
  applications: ApplicationCardProps[];
}

const ApplicationCards = (props: ApplicationCardsProps): JSX.Element => {
  const { applications } = props;
  return (
    <S.StyledApplicationCards>
      {applications.map((application, index) => (
        <ApplicationCard key={index} {...application} />
      ))}
    </S.StyledApplicationCards>
  );
};

export default ApplicationCards;
