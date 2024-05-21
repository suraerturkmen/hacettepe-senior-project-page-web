import * as S from "@/components/professor-project-application/application-cards/ApplicationCards.styles";
import ApplicationCard, {
  ApplicationCardProps,
} from "@/components/professor-project-application/application-card/ApplicationCard";
import { ApplicationProperties } from "@/redux/features/CreateApplication";

interface ApplicationCardsProps {
  applications: ApplicationProperties[];
}

const ApplicationCards = (props: ApplicationCardsProps): JSX.Element => {
  const { applications } = props;
  return (
    <S.StyledApplicationCards>
      {applications.map((application, index) => (
        <ApplicationCard
          key={index}
          groupName={application.groupName}
          groupMembers={application.groupMembers.map(
            (member) => member?.username
          )}
          applicationId={application.id}
          appliedProject={{
            projectId: application.project.id,
            projectName: application.project.title,
            applicationStatus: application.status,
            projectStatus: application.project.projectStatus,
          }}
        />
      ))}
    </S.StyledApplicationCards>
  );
};

export default ApplicationCards;
