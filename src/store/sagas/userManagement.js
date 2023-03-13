import { all, put, takeEvery } from 'redux-saga/effects';
import {
  LOAD_LIST_USER,
} from '../actions/actionTypes';
import {
  getListUser,
} from '../../services/api/userManagement';
import { API_R_200 } from '../../constants';
import {
  loadListUserSuccess,
} from '../actions/userManagement';
import { hideLoading, showLoading } from '../actions/ui';


function* loadListUsersSaga(action) {
  try {
    yield put(showLoading());
    const response = yield getListUser(action.queryParams);
    if (response && response.status === API_R_200) {
      const { user_list, total } = yield response.data.data;
      const users = user_list;
      const numberOfRecord = total;
      yield put(loadListUserSuccess(users, numberOfRecord));
    } else {
      yield put(loadListUserSuccess([], 0));
    }
  } catch (e) {
    throw e;
  } finally {
    yield put(hideLoading());
  }

}

function* watchUserManagement() {
  yield all([
    takeEvery(LOAD_LIST_USER, loadListUsersSaga),
  ]);
}

export default watchUserManagement;
