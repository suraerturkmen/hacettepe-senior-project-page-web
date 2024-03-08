import { combineReducers } from 'redux';
import dataReducer from './features/dataSlice';

const rootReducer = combineReducers({
  UIdata: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
