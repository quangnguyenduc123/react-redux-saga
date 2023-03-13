import HttpClient from '../../utils/HttpUtils';
import {
  API_LOGIN,API_CHECK_LOGIN
} from '../../constants';

/**
 * Get Login Session
 * @return
 */
export const login = (username, password) => {
  const data = { username, password };
  return HttpClient.post(API_LOGIN, data);
};

export const checkLogin = async (token) => {
  const data = {token };
  return await HttpClient.post(API_CHECK_LOGIN, data );
};

