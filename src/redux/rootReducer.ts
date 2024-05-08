import { combineReducers } from "redux";
import projectReducer from "./features/projectSlice";
import authReducer from "./features/AuthSlice";

const rootReducer = combineReducers({
  projects: projectReducer,
  auth: authReducer, // Include the authentication reducer under the key 'auth'
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
