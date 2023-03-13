import { Button, Col, FormGroup, Input, Label } from 'reactstrap';
import React from 'react';
import Select from '../../../../../src/components/Select';

const SearchUsers = ({ listRoleSuggestion, isLoading, roleSearch, onChangeRoleSearch,
  onChangeUserNameSearch, onClickSearch, onClickCreate
}) => {


  const onHandleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onClickSearch();
    }
  };

  return (
    <React.Fragment>
      <h2>User Management</h2>
      <hr />
      <div className="d-flex  align-items-center">
        <Col md={12} xl={10}>
          <FormGroup row>
            <Label md={3} xl={2} className="font-weight-bold">Role</Label>
            <Col md={6} xl={4}>
              <Select listOption={listRoleSuggestion}
                onChange={onChangeRoleSearch}
                labelField="name"
                valueField="id"
                value={roleSearch} />
            </Col>
          </FormGroup>
          <FormGroup row className="mb-0">
            <Label md={3} lg={3} xl={2} className="font-weight-bold">Name</Label>
            <Col md={6} xl={4}>
              <Input autoFocus onKeyPress={onHandleKeyPress} onChange={onChangeUserNameSearch}
                maxLength={50}
                placeholder='Name' />
            </Col>
            <Col md={3}>
              <Button className="mt-3 mt-sm-0" disabled={isLoading} onClick={onClickSearch}>
                <i className="fa fa-search" /> Search
              </Button>
            </Col>
          </FormGroup>
        </Col>
      </div>
      <React.Fragment>
        <hr />
        <div className="d-flex justify-content-end mb-3">
          <div>
            <Button color="success"
              onClick={onClickCreate} className="mr-3">Create</Button>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default SearchUsers;
