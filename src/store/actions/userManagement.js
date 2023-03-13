import * as actionTypes from './actionTypes';
import { UserQueryParams } from '../../models/user-management/user-query-params';

export const loadListUser = queryParams => {
  return {
    type: actionTypes.LOAD_LIST_USER,
    queryParams: queryParams ? queryParams : new UserQueryParams()
  };
};

export const loadListUserSuccess = (users, totalUser) => {
  return {
    type: actionTypes.LOAD_LIST_USER_SUCCESS,
    users: users,
    totalUser: totalUser
  };
};
