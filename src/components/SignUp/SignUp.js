import React from "react";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      alertText: "",
      isModalActive: false
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
      console.log("creating user ");
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      console.log("user ===>>>>", user);
      await createUserProfileDocument(user, { displayName, homeGym: {} });

      this.setState({
        displayName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    } catch (error) {
      this.setState({
        alertText:
          error.message +
          " If account was created via Sign In With Google, please use that login method.",
        isModalActive: true
      });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      firstName,
      lastName,
      displayName,
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <div className="form-wrap">
        <Link
          to="/"
          style={{
            position: "fixed",
            top: "1em",
            right: "1em",
            fontSize: 24,
            color: "white",
            textDecoration: "none"
          }}
        >
          Back
        </Link>
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
            First Name:
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              name="lastName"
              type="text"
              value={lastName}
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
        {this.state.isModalActive ? (
          <Modal
            innerText={this.state.alertText}
            setInactive={() => this.setState({ isModalActive: false })}
          ></Modal>
        ) : null}
      </div>
    );
  }
}

export default SignUp;
