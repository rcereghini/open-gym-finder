import React from "react";
import "./signIn.css";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      alertText: "",
      isModalActive: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      this.setState({
        alertText:
          error.message +
          " If account was created via Sign In With Google, please use that login method.",
        isModalActive: true
      });
    }

    this.setState({ email: "", password: "" });
  };

  render() {
    return (
      <div className="form-wrap">
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <div className="submit-button-wrap">
            <input className="submit-button" type="submit" value="Submit" />
            <button className="google-button" onClick={signInWithGoogle}>
              Sign In With Google
            </button>
          </div>
          <Link
            to="/signup"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: ".8em",
              borderBottom: "1px solid gold",
              paddingBottom: "1px",
              cursor: "pointer"
            }}
          >
            New to this? Get Started Now!
          </Link>
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

export default SignIn;
