import React, { useState } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Loadable from 'react-loadable';
import { Route } from 'react-router-dom';
import loading from '../../components/LoadingSpinner';
import UserManagementContext from './UserManagementContext';
import './UserManagement.css';

const ListUser = Loadable({
  loader: () => import('./ListUser'),
  loading
});

const UserManagement = ({ match }) => {

  const [deleteUsers, setDeleteUsers] = useState([]);

  const context = {
    deleteUsers: deleteUsers,
    setDeleteUsers: setDeleteUsers,
    baseUrl: match.url
  };

  return (
    <UserManagementContext.Provider value={context}>
      <Route component={ListUser} />
    </UserManagementContext.Provider>
  );
};


export default UserManagement;
