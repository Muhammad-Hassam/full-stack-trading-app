import userReduser from './reducers/userSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  user: userReduser,
});

export default rootReducer;
