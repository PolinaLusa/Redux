import { createStore, combineReducers } from 'redux';
import { registrationReducer, notesReducer } from '../Redux/reducers'; 

const rootReducer = combineReducers({
  registration: registrationReducer,
  notes: notesReducer, 
});

const store = createStore(rootReducer);

export default store;
