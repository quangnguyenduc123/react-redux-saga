import HttpClient from '../../utils/HttpUtils';
import {
  API_USER,
} from '../../constants';

/**
 * Get List User
 * @param queryParams : UserQueryParams
 * @return {*}
 */
export const getListUser = (queryParams) => {
  return HttpClient.get(API_USER, { params: queryParams });
};

/**
 * Get End User
 * @param id
 * @return {*}
 */
export const getUser = (id) => {
  return HttpClient.get(API_USER, { params: { id: id } });
};

/**
 * Register End User
 * @param token
 * @param companyId
 * @param userEmail
 * @return {*}
 */
export const registerUser = (username, password, name, role) => {
  const data = { username, password, name, role };
  return HttpClient.post(API_USER, data);
};

/**
 *  Update End User
 * @param id
 * @param name
 * @return {*}
 */
export const updateUser = (id, name) => {
  const data = { id, name };
  return HttpClient.put(`${API_USER}`, data);
};

/**
 * Delete End Users
 */
export const deleteUser = (id) => {
  return HttpClient.delete(`${API_USER}/${id}`);
};
