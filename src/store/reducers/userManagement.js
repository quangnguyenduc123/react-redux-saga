import {
  LOAD_LIST_USER_SUCCESS,
} from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

// Default State
const initialState = {
  users: [],
  totalUser: 0,
};


const loadListUserSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    totalUser: action.totalUser
  });
};

// Authentication Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_LIST_USER_SUCCESS:
      return loadListUserSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;

