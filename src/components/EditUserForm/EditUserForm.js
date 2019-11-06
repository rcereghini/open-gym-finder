import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import "./editUserForm.css";

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: ""
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

  async handleSubmit(event) {
    event.preventDefault();

    // const { phone, website, description, type, gymName } = this.state;

    // firestore
    //   .collection("gym")
    //   .add({ phone, website, type, gymName, description, coordinates });
  }

  render() {
    return (
      <form className="edit-user-form" onSubmit={this.handleSubmit}>
        <label>
          Display Name:
          <input
            name="displayName"
            type="text"
            value={this.state.displayName}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>Avatar:</label>
        <br />

        <div className="submit-button-wrap">
          <input className="submit-button" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default EditUserForm;
