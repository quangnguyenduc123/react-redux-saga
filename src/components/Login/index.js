import React, { useState  } from 'react';
import { connect } from 'react-redux';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { login } from '../../store/actions/auth';
import './Login.css';
import 'url-search-params-polyfill';

const Login = props => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isValid, setIsValid] = useState(false);

  const onChangeUserName = e => {
    const value = e.target.value.trim();
    setUserName(value);
    if(username && password)
    setIsValid(true);
  };

  const onChangePassword = e => {
    const value = e.target.value.trim();
    setPassword(value);
    if(username && password)
    setIsValid(true);
  };

  const clickLogin = () => {
    props.onLogin(username, password);
  };


  return (
    <div className="Login">
      <Form>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
              maxLength={50}
              value={username || ''}
              onChange={onChangeUserName}
              placeholder='username'
              invalid={!username}
            />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
              maxLength={50}
              value={password || ''}
              onChange={onChangePassword}
              placeholder='password'
              invalid={!password}
              type="password"
            />
      </FormGroup>
      <Button onClick={clickLogin} >Submit</Button>
    </Form>
    </div>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    onLogin: (username, password) => dispatch(login(username, password))
  };
};

export default connect(null, mapDispatchToProps)(Login);
