import {
  CLOSE_POPUP_MESSAGE,
  HIDE_LOADING,
  HIDE_LOADING_PAGE,
  RENDER_PAGES,
  SHOW_LOADING,
  SHOW_LOADING_PAGE,
  SHOW_POPUP_MESSAGE
} from '../actions/actionTypes';
import { updateObject } from '../../utils/utility';

// Default State
const initialState = {
  loading: false,
  isShowLoadingPage: false,
  isRenderPages: false,
  isNavBarOpen: false,
  popupConfigs: { message: '' },
  isOpenPopup: false
};

// UI Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return updateObject(state, { loading: true });
    case HIDE_LOADING:
      return updateObject(state, { loading: false });
    case SHOW_LOADING_PAGE:
      return updateObject(state, { isShowLoadingPage: true });
    case HIDE_LOADING_PAGE:
      return updateObject(state, { isShowLoadingPage: false });
    case RENDER_PAGES:
      return updateObject(state, { isRenderPages: true });
    case SHOW_POPUP_MESSAGE:
      return updateObject(state, {
        isOpenPopup: true,
        popupConfigs: { message: action.message, headerTitle: action.headerTitle }
      });
    case CLOSE_POPUP_MESSAGE:
      return updateObject(state, { isOpenPopup: false, popupConfigs: { message: '' } });
    default:
      return state;
  }
};

export default reducer;
