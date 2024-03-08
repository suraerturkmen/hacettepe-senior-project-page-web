import ProjectCard, {
  CardProps,
} from "@/components/project-list/ProjectCard/ProjectCard";
import * as S from "@/components/project-list/ProjectCards/ProjectCards.styles";

interface ProjectCardsProps {
  projects: CardProps[];
}

const ProjectCards = (props: ProjectCardsProps): JSX.Element => {
  const { projects } = props;
  return (
    <S.StyledProjectCardBoxes>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </S.StyledProjectCardBoxes>
  );
};

export default ProjectCards;
