import React, { Suspense } from 'react';
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';

import { withRouter } from 'react-router-dom';

const SideBar = props => {

  return (
    <AppSidebar fixed display="lg">
      <AppSidebarHeader />
      <AppSidebarForm />
      <Suspense>
        <AppSidebarNav navConfig={props.navConfig} {...props} />
      </Suspense>
      <AppSidebarFooter />
      <AppSidebarMinimizer />
    </AppSidebar>
  );
};

export default withRouter(SideBar);
