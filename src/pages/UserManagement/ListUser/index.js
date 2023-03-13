import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import { loadListUser } from '../../../../src/store/actions/userManagement';
import { withLocalize } from 'react-localize-redux';
import Loadable from 'react-loadable';
import loading from '../../../components/LoadingSpinner';
import { UserQueryParams } from '../../../models/user-management/user-query-params';
import { hideLoading, showLoading } from '../../../store/actions/ui';
import SearchUsers from './SearchUsers';
import { getSortColumn } from '../../../utils/utility';

const UserFormModal = Loadable({
  loader: () => import('./UserFormModal'),
  loading
});

const DeleteUserModal = Loadable({
  loader: () => import('./DeleteUsers'),
  loading
});


const TableUsers = Loadable({
  loader: () => import('./TableUsers'),
  loading
});

const listRoleSuggestion = [
  { id: 1, name: 'USER' },
  { id: 2, name: 'ADMIN' },
];

const ListUser = props => {

  //=================================== Constants ============================

  // ================================= State Component ================================
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [queryParams, setQueryParams] = useState(new UserQueryParams());
  const [userSelected, setUserSelected] = useState({ name: '' });


  // ================================= Life Cycle Function ===========================
  /**
   * Component Did Mount
   */
  useEffect(() => {
    props.onLoadListUsers();
  }, []);

  //=========================== Handler Event Action ====================================
  const onCloseModal = () => {
    setModalOpen(!isModalOpen);
  };

  const onCloseModalDelete = () => {
    setModalDeleteOpen(!isModalDeleteOpen);
  };

  const onClickCreate = () => {
    setIsUpdate(false);
    setModalOpen(true);
  };

  const onClickEditUser = () => {
    setIsUpdate(true);
    setModalOpen(true);
  };

  const onClickDeleteUser = () => {
    setModalDeleteOpen(true);
  };
  const onChangeRoleSearch = (role) => {
    const params = { ...queryParams };
    params.role = role.value;
    setQueryParams(params);
  };

  const onChangeUserNameSearch = (event) => {
    const params = { ...queryParams };
    if (event.target.value)
      params.name = event.target.value;
    else
      delete params.name;
    setQueryParams(params);
  };


  const onClickSearch = () => {
    const params = { ...queryParams };
    params.current_page = 1;
    props.onLoadListUsers(params);
    setQueryParams(params);
  };

  const onTableChange = (type, paging) => {
    if (!props.users.length) return;
    const params = { ...queryParams };
    if (type === 'sort') {
      params.per_page = paging.sizePerPage;
      params.sortColumn = getSortColumn(paging.sortField);
      params.sortType = paging.sortOrder.toUpperCase();
      params.current_page = paging.page;
    } else {
      params.per_page = paging.sizePerPage;
      params.current_page = paging.page;
    }
    props.onLoadListUsers(params);
    setQueryParams(params);
  };

  //=========================== Call API Action ====================================


  return (
    <Card className="UserManagement mx-auto">
      <CardBody>

        <SearchUsers {...props}
          roleSearch={queryParams.role}
          onClickSearch={onClickSearch}
          onClickCreate={onClickCreate}
          onChangeRoleSearch={onChangeRoleSearch}
          onChangeUserNameSearch={onChangeUserNameSearch}
          listRoleSuggestion={listRoleSuggestion} />

        <TableUsers {...props}
          sitePerPage={queryParams.per_page}
          setUserSelected={setUserSelected}
          page={queryParams.current_page}
          onTableChange={onTableChange}
          onClickEditUser={onClickEditUser}
          onClickDeleteUser= {onClickDeleteUser}/>

        <UserFormModal {...props}
          isUpdate={isUpdate}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          queryParams={queryParams}
          isModalOpen={isModalOpen}
          toggleModal={onCloseModal} />
        <DeleteUserModal {...props}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          queryParams={queryParams}
          isModalDeleteOpen={isModalDeleteOpen}
          toggleModalDelete={onCloseModalDelete} />
      </CardBody>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    users: state.userManagement.users,
    totalUser: state.userManagement.totalUser,
    isLoading: state.ui.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadListUsers: (queryParams) => dispatch(loadListUser(queryParams)),
    showRequestLoading: () => dispatch(showLoading()),
    hideRequestLoading: () => dispatch(hideLoading())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withLocalize(ListUser));
