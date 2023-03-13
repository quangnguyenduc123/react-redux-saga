import { all, put, takeEvery } from 'redux-saga/effects';
import { LOG_OUT, LOGIN, CHECK_LOG_IN_STATUS } from '../actions/actionTypes';
import { loginSuccess } from '../actions/auth';
import { hideLoading, hideLoadingPage, renderPages, showLoading, showLoadingPage, showPopupMessage } from '../actions/ui';
import * as authService from '../../services/api/auth';
import { deleteCookie, getCookie, setCookie } from '../../utils/utility';
import { API_R_200 } from '../../constants';
import { addHttpHeaders } from '../../utils/HttpUtils';
/**
 * Login
 * @param action
 * @return {IterableIterator<*>}
 */
function* loginSaga(action) {
  try {
    yield put(showLoadingPage());
    const res = yield authService.login(action.username, action.password);
    if (!res || res.status !== API_R_200) {
      yield put(showPopupMessage('Login failed', 'Error'));
      return;
    }
    const { id, role, access_token } = yield res.data.data;
    const userId = id;
    yield setCookie(access_token);
    yield put(loginSuccess(
      userId,
      access_token,
      role));
    yield addHttpHeaders({ 'Authorization': access_token });
  } catch (e) {
    yield put(showPopupMessage('Login failed', 'Error'));
  } finally {
    yield put(hideLoadingPage());
  }
}


/**
 * Check login status
 * @return {IterableIterator<*>}
 */
function* checkLoginStatusSaga() {
  yield put(showLoadingPage());
  try {
    const token = getCookie('auth');
    if(token)
    {
      const response = yield authService.checkLogin(token);
      if (response && response.status === API_R_200) {
        const { user } = yield response.data.data;
        yield put(loginSuccess(user.id, token, user.role));
        yield addHttpHeaders({ 'Authorization': token });
      }
    }
  } catch (e) {
    yield deleteCookie('auth');
  } finally {
    yield put(renderPages());
    yield put(hideLoadingPage());
  }
}


/**
 * Logout
 * @param action
 * @return {IterableIterator<*>}
 */
function* logOutSaga() {
  try {
    yield put(showLoading());
    yield deleteCookie('auth');
    yield put(hideLoading());
  } catch (e) {
    yield put(hideLoading());
  }
}


function* watchAuth() {
  yield all([
    takeEvery(LOGIN, loginSaga),
    takeEvery(LOG_OUT, logOutSaga),
    takeEvery(CHECK_LOG_IN_STATUS, checkLoginStatusSaga),
  ]);
}


export default watchAuth;
