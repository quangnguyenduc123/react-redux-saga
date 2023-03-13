/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import TableResponsive from '../../../../components/TableResponsive';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import UserManagementContext from '../../UserManagementContext';
import {
  formatISODate,
} from '../../../../utils/date';

export const TableUser = props => {

  //=================================== Constants ============================
  const columns = [
    {
      dataField: 'id',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      classes: 'text-left',
      headerStyle: { width: '10%' }
    },
    {
      dataField: 'role',
      text: 'Role',
      classes: 'text-left',
      headerStyle: { width: '10%' }
    },
    {
      dataField: 'create_at',
      text: 'Create at',
      headerStyle: {
        textAlign: 'left',
        width: '20%',
      },
      style: {
        textAlign: 'left',
      },
      formatter: (cell) => formatISODate(cell),
    },
    {
      dataField: 'update_at',
      text: 'Update at',
      headerStyle: {
        textAlign: 'left',
        width: '20%',
      },
      style: {
        textAlign: 'left',
      },
      formatter: (cell) => formatISODate(cell),
    },
    {
      dataField: '',
      text: 'Action',
      classes: 'text-left',
      sort: false,
      headerStyle: { width: '20%' },
      events: {
        onClick: (e, column, columnIndex, row) => {
          props.setUserSelected({ ...row });
        }
      },
      formatter: (cell, row) => {
        return (
          <React.Fragment>
            <Button className="mr-3"
              color="primary" onClick={() => props.onClickEditUser()}><i
                className="fa fa-edit" /> Edit</Button>
            <Button color="danger"
              onClick={() => props.onClickDeleteUser()}><i
                className="fa fa-times-circle" /> Delete</Button>
          </React.Fragment>
        );
      }
    }
  ];

  return (
    <TableResponsive  {...props}
      remote
      totalSize={props.totalUser}
      rowClasses="text-center"
      keyField="id"
      data={props.users}
      columns={columns}
      classes="table-end-user" />
  );
};

export default withRouter(React.memo(TableUser, (prevProps, nextProps) => {
  return prevProps.users === nextProps.users;
}));
