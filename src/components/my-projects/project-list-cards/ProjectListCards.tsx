import ProjectCard, {
  CardProps,
} from "@/components/my-projects/project-list-card/ProjectListCard";
import * as S from "@/components/my-projects/project-list-cards/ProjectListCards.styles";
import { Typography } from "@mui/material";
import Pagination from "@/reusable-components/pagination/Pagination";

interface ProjectCardsProps {
  projects: CardProps[];
  title?: string;
  itemCountPerPage: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  userType?: UserType;
}

const ProjectCards = (props: ProjectCardsProps): JSX.Element => {
  const {
    projects,
    title,
    itemCountPerPage,
    currentPage,
    totalPages,
    handlePageChange,
    userType,
  } = props;
  return (
    <S.StyledProjectCardWrapper>
      {title && (
        <Typography variant="h3TitleBold" color="#344767">
          {title}
        </Typography>
      )}
      <S.StyledProjectCardBoxes>
        {projects.map((project, index) => (
          <ProjectCard key={index} userType={userType} {...project} />
        ))}
      </S.StyledProjectCardBoxes>
      <Pagination
        itemCountPerPage={itemCountPerPage}
        currentPage={currentPage}
        totalCount={totalPages}
        onChange={handlePageChange}
      />
    </S.StyledProjectCardWrapper>
  );
};

export default ProjectCards;
