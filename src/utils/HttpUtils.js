import http from 'axios';
import { API_SERVER_URL } from '../constants';


const Http = http.create({
  baseURL: API_SERVER_URL,
});


export const addHttpHeaders = (headers) => {
  Http.defaults.headers = { ...Http.defaults.headers, ...headers };
};

Http.defaults.timeout = 60000;
export default Http;
