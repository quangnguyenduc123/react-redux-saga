import * as actionTypes from './actionTypes';

export const login = (username, password) => {
  return {
    type: actionTypes.LOGIN,
    username,
    password
  };
};

export const loginSuccess = (id, token, role) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    id: id,
    token: token,
    role: role,
  };
};

export const checkLoginStatus = () => {
  return {
    type: actionTypes.CHECK_LOG_IN_STATUS
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOG_OUT
  };
};
