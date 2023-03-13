import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { withLocalize } from 'react-localize-redux';
import './App.scss';
import loading from './components/LoadingSpinner';
import withErrorHandler from './hocs/withErrorHandler';
import { checkLoginStatus, logout } from './store/actions/auth';
import LoadingPage from './components/LoadingPage';
import LoadingRequest from './components/LoadingRequest';

// Lazy loading components
const HomePage = Loadable({
  loader: () => import('./pages/HomePage'),
  loading
});
const Login = Loadable({
  loader: () => import('./components/Login'),
  loading
});

const PopupMessage = Loadable({
  loader: () => import('./components/PopupMessage'),
  loading
});

class App extends Component {

  componentDidMount() {
    this.props.onCheckLoginStatus();
  }


  render() {
    return (
      <React.Fragment>
        <LoadingRequest isShow={this.props.loading} />
        <LoadingPage isShow={this.props.isShowLoadingPage} />
        <PopupMessage />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/"
            render={() => {
              if (!this.props.isRenderPages) return null;
              return this.props.isAuthenticated ? <HomePage {...this.props} />
                : <Login {...this.props} />;
            }} />
        </Switch>
      </React.Fragment>
    );

  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    role: state.auth.role,
    loading: state.ui.loading,
    isShowLoadingPage: state.ui.isShowLoadingPage,
    isRenderPages: state.ui.isRenderPages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCheckLoginStatus: () => dispatch(checkLoginStatus()),
    onLogout: (isCallLogoutApi) => dispatch(logout(isCallLogoutApi))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withLocalize(withErrorHandler(App))));
