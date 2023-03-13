import {
  Alert,
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import React, { useState } from 'react';
import { deleteUser } from '../../../../services/api/userManagement';
import { API_R_200 } from '../../../../constants';


export const DeleteUsers = props => {


  // ================================= State Component ================================
  const [result, setResult] = useState({ status: '', message: '' });

  // ================================= Life Cycle Function ===========================

  const onCloseModalDelete = () => {
    if (result.status === 'success') {
      props.onLoadListUsers(props.queryParams);
    }
    props.toggleModalDelete();
    resetState();
  };

  //=========================== Call API Action ===================================

  const onClickDelete = async () => {
    props.showRequestLoading();
    try {
      const id = props.userSelected.id;
      const response = await deleteUser(id);
      if (response.status === API_R_200) {
        setResult({ status: 'success', message: 'Delete user success' });
      } else {
        setResult({ status: 'danger', message: 'Delete user fail' });
      }
    } catch (e) {

    } finally {
      props.hideRequestLoading();
    }
  };

  const resetState = () => {
    setResult({ status: '', message: '' });
  };


  return (
    <Modal isOpen={props.isModalDeleteOpen} className="modal-lg">
      <ModalHeader
        toggle={onCloseModalDelete}>{'Delete'}
      </ModalHeader>
      <ModalBody>
        <Alert isOpen={result.status !== ''}
          color={result.status}>{result.message}</Alert>
        <FormGroup row>
          <Label sm={12}><strong className="text-danger">*</strong> Do you want to delete {props.userSelected.name}</Label>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onCloseModalDelete}>Close</Button>
        <Button color="danger"
          onClick={onClickDelete}>{'Delete'}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteUsers;
