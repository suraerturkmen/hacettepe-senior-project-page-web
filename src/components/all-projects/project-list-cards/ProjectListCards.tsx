import ProjectCard, {
  AllProjectsCardProps,
  UserType,
} from "@/components/all-projects/project-list-card/ProjectListCard";
import * as S from "@/components/all-projects/project-list-cards/ProjectListCards.styles";
import { Typography } from "@mui/material";
import Pagination from "@/reusable-components/pagination/Pagination";
import { GroupResponse } from "@/redux/features/GroupList";

interface ProjectCardsProps {
  projects: AllProjectsCardProps[];
  title?: string;
  itemCountPerPage: number;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  userType?: UserType;
  studentGroups?: GroupResponse[];
  handleApply?: (groupId: string, projectId: string) => void;
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
    studentGroups,
    handleApply,
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
          <>
            <ProjectCard
              key={index}
              userType={userType}
              studentGroups={studentGroups}
              handleApply={handleApply}
              {...project}
            />
          </>
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
