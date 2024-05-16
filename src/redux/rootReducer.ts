import { combineReducers } from "redux";
import projectReducer from "./features/projectSlice";
import authReducer from "./features/AuthSlice";
import myProjectSliceReducer from "./features/MyProjectSlice";
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

const rootReducer = combineReducers({
  projects: projectReducer,
  auth: authReducer,
  myProjects: myProjectSliceReducer,
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
  editSeniorProjectType: EditSeniorProjectType,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
