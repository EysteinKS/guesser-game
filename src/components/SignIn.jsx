import React from "react"
import { withRouter } from "react-router-dom"

import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget"
import { auth } from "../firebase/index"
import * as routes from "../constants/routes"
import TextField from '@material-ui/core/TextField';

const SignInPage = ({history}) =>
  <div>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink/>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInForm extends React.Component {
  constructor(props){
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
        console.log("User Signed In")
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
        console.log("Sign In Failed")
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === "" ||
      email === "";

    return (
      <form onSubmit={this.onSubmit}>
          <TextField className="logInInputEmail"
          id="name"
          label="Email"
          type="text"
          value={email}
          onChange={event => this.setState(byPropKey("email", event.target.value))}
          margin="normal"
          disabled={this.state.edit}
          autoComplete="off"
          className="profile-grid-b"
        />
        <br/>
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={event => this.setState(byPropKey("password", event.target.value))}
          margin="normal"
          disabled={this.state.edit}
          autoComplete="off"
          className="profile-grid-b"
        />
        <br/>
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}

      </form>
    )
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};