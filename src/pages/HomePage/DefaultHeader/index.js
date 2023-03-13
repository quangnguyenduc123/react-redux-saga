import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import { AppSidebarToggler } from '@coreui/react';
const DefaultHeader = () => {
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile/>
      <AppSidebarToggler className="d-md-down-none" display="lg"/>
      <Nav className="ml-2 mr-auto" navbar>
        <NavItem className="mr-3">
          <NavLinkRouter exact to="/user-management"><i className="fa fa-home fa-2x"/></NavLinkRouter>
        </NavItem>
      </Nav>
    </React.Fragment>
  );
};

export default DefaultHeader;
