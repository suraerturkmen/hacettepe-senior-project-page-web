import { combineReducers } from "redux";
import projectReducer from "./features/projectSlice";
import authReducer from "./features/AuthSlice";
import myProjectSliceReducer from "./features/MyProjectSlice";
import timelineReducer from "./features/TimelineSlice";
import ActiveSeniorProjectTerm from "./features/ActiveSeniorProjectTerm";

const rootReducer = combineReducers({
  projects: projectReducer,
  auth: authReducer, // Include the authentication reducer under the key 'auth'
  myProjects: myProjectSliceReducer,
  timelines: timelineReducer,
  activeSeniorProjectTerm: ActiveSeniorProjectTerm,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
