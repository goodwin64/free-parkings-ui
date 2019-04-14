import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import * as loginPageStyled from '../LoginPage/LoginPage.styled';
import UrlService from '../../services/Url.service';
import FormsValidatorService from '../../services/FormsValidator.service';
import {
  signupUserAttempt,
  signupUserAttemptActionCreator,
} from '../../store/userState/actions';
import { createStructuredSelector } from 'reselect';
import { RootReducer } from '../../store/rootReducer';
import * as selectors from '../../store/userState/selectors';
import { Link } from 'react-router-dom';


interface SignupPageState {
  username: string,
  password1: string,
  password2: string,
  usernameValid: boolean,
  password1Valid: boolean,
  password2Valid: boolean,
  usernameTouched: boolean,
  password1Touched: boolean,
  password2Touched: boolean,
  password1Visible: boolean,
  password2Visible: boolean,
  isSignupSubmitted: boolean,
  isSignupSuccessfulMessageShown: boolean,
}

interface SignupPageOwnProps {
  signupError: string | null,
  isSignupInProgress: boolean,
}

interface SignupPageDispatchProps {
  signupUser: signupUserAttemptActionCreator,
}

interface SignupPageProps extends SignupPageOwnProps, SignupPageDispatchProps {}

class SignupPage extends React.PureComponent<SignupPageProps, SignupPageState> {
  static propTypes = {};

  state: SignupPageState = {
    username: '',
    password1: '',
    password2: '',
    usernameValid: true,
    password1Valid: true,
    password2Valid: false,
    usernameTouched: false,
    password1Touched: false,
    password2Touched: false,
    password1Visible: false,
    password2Visible: false,
    isSignupSubmitted: false,
    isSignupSuccessfulMessageShown: false,
  };

  componentWillReceiveProps(nextProps: Readonly<SignupPageProps>, nextContext: any): void {
    const isSignupSubmitSuccessful = this.state.isSignupSubmitted && !nextProps.signupError && !nextProps.isSignupInProgress;
    if (isSignupSubmitSuccessful) {
      this.setState({ isSignupSuccessfulMessageShown: true });
    }
  }

  get isUsernameErrorShown() {
    return !this.state.usernameValid && this.state.usernameTouched;
  }

  get isPassword1ErrorShown() {
    return !this.state.password1Valid && this.state.password1Touched;
  }

  get isPassword2ErrorShown() {
    return !this.state.password2Valid && this.state.password2Touched;
  }

  get isSubmitNotAllowed() {
    return !this.state.usernameValid || !this.state.password1Valid ||  !this.state.password2Valid || this.props.isSignupInProgress;
  }

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!FormsValidatorService.isUsernameValid(this.state.username) || !FormsValidatorService.isPasswordValid(this.state.password1)) {
      console.warn('hmm, strange.. looks like this subtree is not reachable; kept to prevent bugs');
      this.setState({
        usernameValid: FormsValidatorService.isUsernameValid(this.state.username),
        password1Valid: this.state.password1.length !== 0,
        usernameTouched: true,
        password1Touched: true,
      });
    } else {
      this.setState({
        usernameTouched: false,
        password1Touched: false,
        isSignupSubmitted: true,
      });
      this.props.signupUser(this.state.username, this.state.password1);
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

  onPassword1Change = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
    password1: e.target.value,
    password1Valid: e.target.value.length !== 0,
    password1Touched: true,
  });

  onPassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
    password2: e.target.value,
    password2Valid: e.target.value === this.state.password1,
    password2Touched: true,
  });

  onPassword1Blur = (e: React.FocusEvent<HTMLInputElement>) => {
    // if (e.target.type === 'password' || e.target.type === 'text') {
      this.setState({
        password1: e.target.value,
        password1Valid: e.target.value.length !== 0,
        password1Touched: true,
      });
    // }
  };

  onPassword2Blur = (e: React.FocusEvent<HTMLInputElement>) => {
    // if (e.target.type === 'password' || e.target.type === 'text') {
      this.setState({
        password2: e.target.value,
        password2Valid: e.target.value === this.state.password1,
        password2Touched: true,
      });
    // }
  };

  togglePassword1Visibility = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState((prevState) => ({
      password1Visible: !prevState.password1Visible,
    }))
  };

  togglePassword2Visibility = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState((prevState) => ({
      password2Visible: !prevState.password2Visible,
    }))
  };

  private renderUsername() {
    return (
      <>
        <loginPageStyled.TextFieldLabel>
          <p>Username</p>
          <loginPageStyled.LoginFormInput
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            value={this.state.username}
            onChange={this.onUsernameChange}
            onBlur={this.onUsernameBlur}
            error={this.isUsernameErrorShown}
          />
        </loginPageStyled.TextFieldLabel>
        <loginPageStyled.ErrorBlock
          visible={this.isUsernameErrorShown}
        >
          ● wrong username
        </loginPageStyled.ErrorBlock>
      </>
    );
  }

  private renderPassword1() {
    return (
      <>
        <loginPageStyled.TextFieldLabel>
          <p>Password</p>
          <loginPageStyled.LoginFormInput
            type={this.state.password1Visible ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter password"
            value={this.state.password1}
            error={this.isPassword1ErrorShown}
            onChange={this.onPassword1Change}
            onBlur={this.onPassword1Blur}
          />
          <loginPageStyled.ShowPasswordEyeButton onClick={this.togglePassword1Visibility}>
            <loginPageStyled.ShowPasswordEyeIcon/>
          </loginPageStyled.ShowPasswordEyeButton>
        </loginPageStyled.TextFieldLabel>
        <loginPageStyled.ErrorBlock
          visible={this.isPassword1ErrorShown}
        >
          ● wrong password
        </loginPageStyled.ErrorBlock>
      </>
    );
  }

  private renderPassword2() {
    return (
      <>
        <loginPageStyled.TextFieldLabel>
          <p>Repeat password</p>
          <loginPageStyled.LoginFormInput
            type={this.state.password2Visible ? 'text' : 'password'}
            autoComplete="repeat-password"
            placeholder="Repeat password"
            value={this.state.password2}
            error={this.isPassword2ErrorShown}
            onChange={this.onPassword2Change}
            onBlur={this.onPassword2Blur}
          />
          <loginPageStyled.ShowPasswordEyeButton onClick={this.togglePassword2Visibility}>
            <loginPageStyled.ShowPasswordEyeIcon/>
          </loginPageStyled.ShowPasswordEyeButton>
        </loginPageStyled.TextFieldLabel>
        <loginPageStyled.ErrorBlock
          visible={this.isPassword2ErrorShown}
        >
          ● passwords do not match
        </loginPageStyled.ErrorBlock>
      </>
    );
  }

  private renderSubmit() {
    return (
      <>
        <loginPageStyled.SubmitButtonContainer>
          <loginPageStyled.SubmitButton
            type="submit"
            disabled={this.isSubmitNotAllowed}
            value="Sign up"
          />
        </loginPageStyled.SubmitButtonContainer>
        <loginPageStyled.ErrorBlock
          visible={Boolean(this.props.signupError)}
        >
          ● {this.props.signupError}
        </loginPageStyled.ErrorBlock>
      </>
    );
  }

  private renderSignupForm() {
    return (
      <loginPageStyled.LoginForm
        onSubmit={this.onSubmit}
      >
        {this.renderUsername()}
        {this.renderPassword1()}
        {this.renderPassword2()}
        {this.renderSubmit()}
      </loginPageStyled.LoginForm>
    );
  }

  renderSignupSuccessfulMessage() {
    return (
      <>
        <p>You've signed up successfully!</p>
        <Link to={UrlService.loginPageUrl}>Log in</Link>
      </>
    );
  }

  render() {
    return (
      <loginPageStyled.PageWrapper>
        <loginPageStyled.LoginFormWrapper>
          <loginPageStyled.LoginFormHeader>
            Sign up
          </loginPageStyled.LoginFormHeader>
          <loginPageStyled.LoginFormContainer>
            {
              this.state.isSignupSuccessfulMessageShown
                ? this.renderSignupSuccessfulMessage()
                : this.renderSignupForm()
            }
          </loginPageStyled.LoginFormContainer>
        </loginPageStyled.LoginFormWrapper>
      </loginPageStyled.PageWrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector<RootReducer, SignupPageOwnProps>({
  signupError: selectors.signupErrorSelector,
  isSignupInProgress: selectors.isSignupAttemptInProgressSelector,
});

const mapDispatchToProps = {
  signupUser: signupUserAttempt,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(SignupPage);
