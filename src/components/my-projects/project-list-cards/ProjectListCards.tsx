import ProjectCard, {
  CardProps,
} from "@/components/my-projects/project-list-card/ProjectListCard";
import * as S from "@/components/my-projects/project-list-cards/ProjectListCards.styles";
import { Typography } from "@mui/material";
import Pagination from "@/reusable-components/pagination/Pagination";
import { UserType } from "@/components/all-projects/project-list-card/ProjectListCard";

interface ProjectCardsProps {
  projects: CardProps[];
  title?: string;
  itemCountPerPage: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  userType?: UserType;
  isArrowVisible?: boolean;
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
    isArrowVisible,
  } = props;
  return (
    <>
      {projects.length !== 0 && (
        <S.StyledProjectCardWrapper>
          {title && (
            <Typography variant="h3TitleBold" color="#344767">
              {title}
            </Typography>
          )}
          <S.StyledProjectCardBoxes>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                userType={userType}
                isArrowVisible={isArrowVisible}
                {...project}
              />
            ))}
          </S.StyledProjectCardBoxes>
          <Pagination
            itemCountPerPage={itemCountPerPage}
            currentPage={currentPage}
            totalCount={totalPages}
            onChange={handlePageChange}
          />
        </S.StyledProjectCardWrapper>
      )}
    </>
  );
};

export default ProjectCards;
