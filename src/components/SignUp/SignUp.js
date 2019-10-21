import React from "react";

import {
  auth,
  createUserProfileDocument,
  signInWithGoogle
} from "../../firebase/firebase.utils";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="form-wrap">
        <form onSubmit={this.handleSubmit}>
          <label>
            Display Name:
            <input
              name="displayName"
              type="text"
              value={displayName}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={email}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={password}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <div className="submit-button-wrap">
            <input className="submit-button" type="submit" value="Submit" />
            <button className="google-button" onClick={signInWithGoogle}>
              Sign In With Google
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
