import React from 'react';
import { AppFooter, AppHeader } from '@coreui/react';
import './HomePage.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import DefaultHeader from './DefaultHeader';
import SideBar from './SideBar';
import getNavigation from './navigation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import linkRoutes from '../../routes/linkRoutes';

const HomePage = props => {

  const userRoutes = [...linkRoutes];
  document.body.classList.remove('sidebar-hidden');
  document.body.classList.add('sidebar-fixed');

  return (
    <div className="app">
      <AppHeader fixed>
        <DefaultHeader {...props} />
      </AppHeader>
      <div className="app-body">
        <React.Fragment>
          <SideBar navConfig={getNavigation()} />
          <main className="main">
            <PerfectScrollbar>
              <div className="default-body">
                <Switch>
                  {userRoutes.map((route) => (
                    <Route
                      key={route.id}
                      exact={route.exact}
                      path={route.path}
                      render={(props) => <route.component {...props} />}
                    />
                  ))}
                  <Redirect
                    from="/"
                    to={
                      '/user-management'
                    }
                  />
                </Switch>
              </div>
            </PerfectScrollbar>
          </main>
        </React.Fragment>
      </div>
      <AppFooter className="d-flex justify-content-center align-items-center">
        <h6>G-Auth.</h6>
      </AppFooter>
    </div>
  );
}
  ;

export default HomePage;
