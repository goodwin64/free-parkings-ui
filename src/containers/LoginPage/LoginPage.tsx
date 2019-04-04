import React, { FormEvent } from 'react';

import FormsValidatorService from '../../services/FormsValidator.service';
import * as styled from './LoginPage.styled';


interface LoginPageState {
  email: string,
  password: string,
  emailValid: boolean,
  passwordValid: boolean,
  emailTouched: boolean,
  passwordTouched: boolean,
  passwordVisible: boolean,
}

class LoginPage extends React.PureComponent<any, LoginPageState> {
  static propTypes = {
    // signinUser: PropTypes.func.isRequired,
    // inProgress: PropTypes.bool.isRequired,
  };

  state: LoginPageState = {
    email: '',
    password: '',
    emailValid: true,
    passwordValid: true,
    emailTouched: false,
    passwordTouched: false,
    passwordVisible: false,
  };

  componentWillUnmount() {
    // this.props.pageReset();
  }

  get isEmailErrorShown() {
    return !this.state.emailValid && this.state.emailTouched;
  }

  get isPasswordErrorShown() {
    return !this.state.passwordValid && this.state.passwordTouched;
  }

  get isSubmitNotAllowed() {
    return !this.state.emailValid || !this.state.passwordValid || (!this.state.emailTouched && !this.state.passwordTouched);
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!FormsValidatorService.isEmailValid(this.state.email) || this.state.password.length === 0) {
      this.setState({
        emailValid: FormsValidatorService.isEmailValid(this.state.email),
        passwordValid: this.state.password.length !== 0,
        emailTouched: true,
        passwordTouched: true,
      });
    } else {
      this.setState({
        emailTouched: false,
        passwordTouched: false,
      });
      // this.props.signinUser(this.state.email, this.state.password);
      console.log('signinUser', this.state.email, this.state.password);
    }
  };

  onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
    email: e.target.value,
    emailValid: FormsValidatorService.isEmailValid(e.target.value),
  });

  onEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => this.setState({
    email: e.target.value,
    emailValid: FormsValidatorService.isEmailValid(e.target.value),
    emailTouched: true,
  });

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
    password: e.target.value,
    passwordValid: e.target.value.length !== 0,
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

  togglePasswordVisibility = (e: FormEvent) => {
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
          <styled.LoginForm onSubmit={this.onSubmit}>
            <styled.TextFieldLabel>
              <p>Email</p>
              <styled.LoginFormInput
                type="email"
                autoComplete="username"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.onEmailChange}
                onBlur={this.onEmailBlur}
                error={this.isEmailErrorShown}
              />
            </styled.TextFieldLabel>
            <styled.ErrorBlock
              visible={this.isEmailErrorShown}
            >
              ● wrong email
            </styled.ErrorBlock>
            <styled.TextFieldLabel>
              <p>Password</p>
              <styled.LoginFormInput
                type={this.state.passwordVisible ? 'text' : 'password'}
                name="password"
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
          </styled.LoginForm>
        </styled.LoginFormContainer>
      </styled.PageWrapper>
    );
  }
}

export default LoginPage;
