import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import FormsValidatorService from '../../services/FormsValidator.service';
import * as styled from './LoginPage.styled';
import { signinUserAttempt, signinUserAttemptActionCreator } from '../../store/userState/actions';
import { createStructuredSelector } from 'reselect';
import { areCredentialsInvalidSelector, isSigninAttemptInProgressSelector } from '../../store/userState/selectors';
import { RootReducer } from '../../store/rootReducer';


interface LoginPageState {
  username: string,
  password: string,
  usernameValid: boolean,
  passwordValid: boolean,
  usernameTouched: boolean,
  passwordTouched: boolean,
  passwordVisible: boolean,
}

interface LoginPageOwnProps {
  areCredentialsInvalid: boolean,
  isSigninAttemptInProgress: boolean,
}

interface LoginPageDispatchProps {
  signinUser: signinUserAttemptActionCreator,
}

interface LoginPageProps extends LoginPageOwnProps, LoginPageDispatchProps {}

class LoginPage extends React.PureComponent<LoginPageProps, LoginPageState> {
  static propTypes = {
    signinUser: PropTypes.func.isRequired,
    areCredentialsInvalid: PropTypes.bool.isRequired,
    isSigninAttemptInProgress: PropTypes.bool.isRequired,
  };

  state: LoginPageState = {
    username: '',
    password: '',
    usernameValid: true,
    passwordValid: true,
    usernameTouched: false,
    passwordTouched: false,
    passwordVisible: false,
  };

  componentWillUnmount() {
    // this.props.pageReset();
  }

  get isUsernameErrorShown() {
    return !this.state.usernameValid && this.state.usernameTouched;
  }

  get isPasswordErrorShown() {
    return !this.state.passwordValid && this.state.passwordTouched;
  }

  get isSubmitNotAllowed() {
    return !this.state.usernameValid || !this.state.passwordValid || this.props.isSigninAttemptInProgress;
  }

  get areCredentialsInvalid() {
    return this.props.areCredentialsInvalid && !this.state.passwordTouched && !this.state.usernameTouched;
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!FormsValidatorService.isUsernameValid(this.state.username) || this.state.password.length === 0) {
      this.setState({
        usernameValid: FormsValidatorService.isUsernameValid(this.state.username),
        passwordValid: this.state.password.length !== 0,
        usernameTouched: true,
        passwordTouched: true,
      });
    } else {
      this.setState({
        usernameTouched: false,
        passwordTouched: false,
      });
      this.props.signinUser(this.state.username, this.state.password);
    }
  };

  onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
    username: e.target.value,
    usernameValid: FormsValidatorService.isUsernameValid(e.target.value),
    usernameTouched: true,
  });

  onUsernameBlur = (e: React.FocusEvent<HTMLInputElement>) => this.setState({
    username: e.target.value,
    usernameValid: FormsValidatorService.isUsernameValid(e.target.value),
    usernameTouched: true,
  });

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
    password: e.target.value,
    passwordValid: e.target.value.length !== 0,
    passwordTouched: true,
  });

  onPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.type === 'password' || e.target.type === 'text') {
      this.setState({
        password: e.target.value,
        passwordValid: e.target.value.length !== 0,
        passwordTouched: true,
      });
    }
  };

  togglePasswordVisibility = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }))
  };

  render() {
    return (
      <styled.PageWrapper>
        <styled.LoginFormContainer>
          <styled.LoginFormHeader>
            Log in
          </styled.LoginFormHeader>
          <styled.LoginForm
            onSubmit={this.onSubmit}
          >
            <styled.TextFieldLabel>
              <p>Username</p>
              <styled.LoginFormInput
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={this.onUsernameChange}
                onBlur={this.onUsernameBlur}
                error={this.isUsernameErrorShown}
              />
            </styled.TextFieldLabel>
            <styled.ErrorBlock
              visible={this.isUsernameErrorShown}
            >
              ● wrong username
            </styled.ErrorBlock>
            <styled.TextFieldLabel>
              <p>Password</p>
              <styled.LoginFormInput
                type={this.state.passwordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter password"
                value={this.state.password}
                error={this.isPasswordErrorShown}
                onChange={this.onPasswordChange}
                onBlur={this.onPasswordBlur}
              />
              <styled.ShowPasswordEyeButton onClick={this.togglePasswordVisibility}>
                <styled.ShowPasswordEyeIcon/>
              </styled.ShowPasswordEyeButton>
            </styled.TextFieldLabel>
            <styled.ErrorBlock
              visible={this.isPasswordErrorShown}
            >
              ● wrong password
            </styled.ErrorBlock>
            <styled.SubmitButtonContainer>
              <styled.SubmitButton
                type="submit"
                disabled={this.isSubmitNotAllowed}
                value="Log in"
              />
            </styled.SubmitButtonContainer>
            <styled.ErrorBlock
              visible={this.areCredentialsInvalid}
            >
              ● wrong username or password
            </styled.ErrorBlock>
          </styled.LoginForm>
        </styled.LoginFormContainer>
      </styled.PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, LoginPageOwnProps>({
  areCredentialsInvalid: areCredentialsInvalidSelector,
  isSigninAttemptInProgress: isSigninAttemptInProgressSelector,
});

const mapDispatchToProps = {
  signinUser: signinUserAttempt,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(LoginPage);
