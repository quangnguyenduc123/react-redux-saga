import { LOG_OUT, LOGIN_SUCCESS } from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

// Default State
const initialState = {
  token: '',
  id: '',
  role: '',
  isAuthenticated: false,
};

// LoginSuccess Action
const loginSuccess = (state, action) => {
  return updateObject(state, {
    isAuthenticated: true,
    token: action.token,
    id: action.id,
    role: action.role
  });
};



// Authentication Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
