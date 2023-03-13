import { all } from 'redux-saga/effects';
import watchAuthSaga from './auth';
import watchUserManagement from './userManagement';

/**
 * Make a root saga
 *
 * @returns {object} - Generator functions all combined in one saga
 */
export default function* rootSaga() {
  yield all([watchAuthSaga(),watchUserManagement()]);
}
