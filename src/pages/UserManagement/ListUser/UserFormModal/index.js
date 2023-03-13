import {
  Alert,
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { registerUser, updateUser } from '../../../../services/api/userManagement';
import { API_R_200, API_R_409 } from '../../../../constants';
import { updateObject } from '../../../../utils/utility';
import Select from '../../../../components/Select';

//=================================== Constants ============================
const defaultName = { value: '', inValid: true, message: '' };
const defaultUserName = { value: '', inValid: true, message: '' };
const defaultPassword = { value: '', inValid: true, message: '' };
const roleOptions = [
  {
    value: 1,
    label: 'USER'
  },
  {
    value: 2,
    label: 'ADMIN'
  }
];
export const UserFormModal = props => {

  // ================================= State Component ================================
  const [result, setResult] = useState({ status: '', message: '' });
  const [name, setName] = useState(defaultName);
  const [username, setUserName] = useState(defaultUserName);
  const [password, setPassWord] = useState(defaultPassword);
  const [isValid, setIsValid] = useState(false);
  const [role, setUserRole] = useState(1);

  // ================================= Life Cycle Function ===========================
  /**
   * Component Did Mount &&  Component Did Update
   */
  useEffect(() => {
    if (props.isUpdate) {
      setDefaultUserInfo();
    }
  }, [props.userSelected]);

  //=========================== Handler Event Action ====================================

  const onClickClear = () => {
    if (props.isUpdate) {
      setDefaultUserInfo();
    } else {
      resetState();
    }
  };


  const onCloseModal = () => {
    if (result.status === 'success') {
      props.onLoadListUsers(props.queryParams);
    }
    props.toggleModal();
    resetState();
  };


  const onChangeName = e => {
    setResult({ status: '', message: '' });
    const name = e.target.value.trim();
    let inValid = false;
    if (!name)
      inValid = true;
    setName(updateObject(name, { value: name, inValid: inValid }));
    if (props.isUpdate) {
      const valid = name !== props.userSelected.name && !inValid;
      setIsValid(valid);
    }
  };

  const onChangeUserName = e => {
    setResult({ status: '', message: '' });
    const username = e.target.value.trim();
    let inValid = false;
    if (!username)
      inValid = true;
    setUserName(updateObject(username, { value: username, inValid: inValid }));
  };

  const onChangePassWord = e => {
    setResult({ status: '', message: '' });
    const password = e.target.value.trim();
    let inValid = false;
    if (!password)
      inValid = true;
    setPassWord(updateObject(password, { value: password, inValid: inValid }));
  };
  //=========================== Validate Action ====================================
  const validateData = () => {
    if (name.value === '') {
      setName(updateObject(name, { inValid: true, message: 'Name is not blank' }));
      setIsValid(false);
    } else if (name.value === props.userSelected.name) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setName(updateObject(name, { inValid: false, message: '' }));
    }
  };

  const validateUserName = () =>{
    if (username.value === '') {
      setUserName(updateObject(username, { inValid: true, message: 'username is not blank' }));
      setIsValid(false);
    } else {
      setIsValid(true);
      setUserName(updateObject(username, { inValid: false, message: '' }));
    }
  };

  const validatePassWord = () =>{
    if (password.value === '') {
      setPassWord(updateObject(password, { inValid: true, message: 'password is not blank' }));
      setIsValid(false);
    } else {
      setIsValid(true);
      setPassWord(updateObject(password, { inValid: false, message: '' }));
    }
  };

  //=========================== Call API Action ====================================
  const onClickRegister = async () => {
    setResult({ status: '', message: '' });
    validateData();
    if (name.inValid) return;
    props.showRequestLoading();
    try {
      const response = await registerUser(username.value, password.value, name.value, role);
      if (!response || !response.data) return;
      if (response.status === API_R_200) {
        setResult({ status: 'success', message: 'Create User success' });
      } else if (response.status === API_R_409) {
        setResult({ status: 'danger', message: 'Username already exists' });
      } else {
        setResult({ status: 'danger', message: 'Create User fail' });
      }
    } catch (e) {
      throw e;
    } finally {
      props.hideRequestLoading();
    }
  };

  const onClickUpdate = async () => {
    validateData();
    if (name.inValid || !isValid) return;
    props.showRequestLoading();
    try {
      const id = props.userSelected.id;
      const response = await updateUser(
        id,
        name.value);
      if (response.status === API_R_200) {
        setResult({ status: 'success', message: 'Update user success' });
        setIsValid(false);
        props.setUserSelected({ ...props.userSelected, name: name.value });
      } else {
        setResult({ status: 'danger', message: 'Update user fail' });
      }
    } catch (e) {

    } finally {
      props.hideRequestLoading();
    }
  };

  //============================ Util Actions =====================================
  const setDefaultUserInfo = () => {
    const email = props.userSelected.name;
    setName(updateObject(name, { value: email, inValid: false }));
    setIsValid(false);
  };

  const resetState = () => {
    setName(defaultName);
    setUserName(defaultUserName);
    setPassWord(defaultPassword);
    setUserRole(1);
    setResult({ status: '', message: '' });
    setIsValid(false);
  };

  const onsetUserRole = userRole => {
    const role = userRole.value;
    setUserRole(role);
  };

  return (
    <Modal isOpen={props.isModalOpen} className="modal-lg">
      <ModalHeader
        toggle={onCloseModal}>{props.isUpdate ? 'Update' :
          'Create'
        }
      </ModalHeader>
      <ModalBody>
        <Alert isOpen={result.status !== ''}
          color={result.status}>{result.message}</Alert>
        {props.isUpdate ? null :
          <>
            <FormGroup row>
              <Label sm={3}><strong className="text-danger">*</strong> Role</Label>
              <Col sm={9}>
                <Select listOption={roleOptions} value={role} onChange={onsetUserRole} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}><strong className="text-danger">*</strong> Username</Label>
              <Col sm={9}>
                <Input
                  maxLength={50}
                  value={username.value || ''}
                  onChange={onChangeUserName}
                  onBlur={validateUserName}
                  placeholder='Username'
                  invalid={username.inValid && username.message !== ''}
                />
                <FormFeedback className="pt-2">{username.message}</FormFeedback>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}><strong className="text-danger">*</strong> password</Label>
              <Col sm={9}>
                <Input
                  maxLength={50}
                  value={password.value || ''}
                  onChange={onChangePassWord}
                  onBlur={validatePassWord}
                  placeholder='Password'
                  invalid={password.inValid && password.message !== ''}
                />
                <FormFeedback className="pt-2">{password.message}</FormFeedback>
              </Col>
            </FormGroup>
          </>}
        <FormGroup row>
          <Label sm={3}><strong className="text-danger">*</strong> Name</Label>
          <Col sm={9}>
            <Input
              maxLength={50}
              value={name.value || ''}
              onChange={onChangeName}
              onBlur={validateData}
              placeholder='Name'
              invalid={name.inValid && name.message !== ''}
            />
            <FormFeedback className="pt-2">{name.message}</FormFeedback>
          </Col>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={onCloseModal}>Close</Button>
        <Button color="warning" onClick={onClickClear}>
          {props.isUpdate ?
            'Reset' :
            'Clear'
          }
        </Button>
        <Button color="success" disabled={(!isValid && props.isUpdate) || name.inValid || props.isLoading || (!props.isUpdate && (username.inValid || password.inValid))}
          onClick={props.isUpdate ? onClickUpdate : onClickRegister}>{
            props.isUpdate ?
              'Update' :
              'Create'}</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserFormModal;
