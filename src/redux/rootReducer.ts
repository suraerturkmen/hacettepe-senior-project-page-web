import { combineReducers } from "redux";
import projectReducer from "./features/projectSlice";
import authReducer from "./features/AuthSlice";
import timelineReducer from "./features/TimelineSlice";
import ActiveSeniorProjectTerm from "./features/ActiveSeniorProjectTerm";
import UpdateProject from "./features/UpdateProject";
import ProfessorList from "./features/ProfessorList";
import deleteReducer from "./features/DeleteProject";
import activeSeniorProjects from "./features/AllProjectsInActiveTerm";
import groupReducer from "./features/CreateGroup";
import StudentListReducer from "./features/StudentList";
import groupListReducer from "./features/GroupList";
import CreateApplicationReducer from "./features/CreateApplication";
import ApplicationListReducer from "./features/ProfessorProjectApplications";
import deleteGroupReducer from "./features/DeleteGroupById";
import projectTypesReducer from "./features/GetProjectTypes";
import CreateSeniorProjectType from "./features/CreateSeniorProjectType";
import ActivateSeniorProjectTerm from "./features/ActivateSeniorProjectTerm";
import EditSeniorProjectType from "./features/EditSeniorProjectType";
import GetEmbeddings from "./features/AddNewProjectToAI";
import AddEmbeddingToProject from "./features/AddEmbeddingToProject";
import GetSimilars from "./features/RecommendedProjects";
import RecommendedProjects from "./features/GetProjectsWithIdList";
import CreateAnnouncement from "./features/CreateAnnouncement";
import GetAnnouncement from "./features/GetAnnouncement";
import UpdateAnnouncement from "./features/UpdateAnnouncement";
import DownloadDocument from "./features/DownloadDocument";
import GetUrlAndImages from "./features/GetUrlAndImages";
import ArchivedSeniorProjectTerm from "./features/ArchivedSeniorProjectTerm";
import DeactivateProjectTerm from "./features/DeactivateProjectTerm";
import AddGradeToDocument from "./features/AddGradeToDocument";
import ProjectById from "./features/GetProjectByProjectId";
import myprojectSliceReducer from "./features/GetMyProject";

const rootReducer = combineReducers({
  projects: projectReducer,
  auth: authReducer,
  timelines: timelineReducer,
  activeSeniorProjectTerm: ActiveSeniorProjectTerm,
  updateProject: UpdateProject,
  professors: ProfessorList,
  deleteProject: deleteReducer,
  activeSeniorProjects: activeSeniorProjects,
  group: groupReducer,
  students: StudentListReducer,
  groupList: groupListReducer,
  createApplication: CreateApplicationReducer,
  applicationList: ApplicationListReducer,
  deleteGroup: deleteGroupReducer,
  projectTypes: projectTypesReducer,
  createSeniorProjectType: CreateSeniorProjectType,
  activateSeniorProjectTerm: ActivateSeniorProjectTerm,
  archivedSeniorProjectTerm: ArchivedSeniorProjectTerm,
  deactivateProjectTerm: DeactivateProjectTerm,
  editSeniorProjectType: EditSeniorProjectType,
  getEmbeddings: GetEmbeddings,
  addEmbeddings: AddEmbeddingToProject,
  getSimilars: GetSimilars,
  recommendedProjects: RecommendedProjects,
  createAnnouncement: CreateAnnouncement,
  announcement: GetAnnouncement,
  updateAnnouncement: UpdateAnnouncement,
  downloadDocument: DownloadDocument,
  urlAndImages: GetUrlAndImages,
  gradeDocumentData: AddGradeToDocument,
  projectById: ProjectById,
  myProjects: myprojectSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
