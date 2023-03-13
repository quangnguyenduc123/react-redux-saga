import * as actionTypes from './actionTypes';

export const showLoading = () => {
  return {
    type: actionTypes.SHOW_LOADING
  };
};

export const hideLoading = () => {
  return {
    type: actionTypes.HIDE_LOADING
  };
};

export const showLoadingPage = () => {
  return {
    type: actionTypes.SHOW_LOADING_PAGE
  };
};

export const hideLoadingPage = () => {
  return {
    type: actionTypes.HIDE_LOADING_PAGE
  };
};

export const renderPages = () => {
  return {
    type: actionTypes.RENDER_PAGES
  };
};

export const showPopupMessage = (message, headerTitle) => {
  return {
    type: actionTypes.SHOW_POPUP_MESSAGE,
    message: message,
    headerTitle: headerTitle
  };
};

export const closePopupMessage = () => {
  return {
    type: actionTypes.CLOSE_POPUP_MESSAGE
  };
};


