import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import "./addGymForm.css";

class AddGymForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressOne: "",
      addressTwo: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      website: "",
      type: "",
      gymName: ""
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

  handleSubmit(event) {
    firestore.collection("gym").add({
      ...this.state
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            name="gymName"
            type="text"
            value={this.state.gymName}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            name="phone"
            type="text"
            value={this.state.phone}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Website:
          <input
            name="website"
            type="text"
            value={this.state.website}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Address 1:
          <input
            name="addressOne"
            type="text"
            value={this.state.addressOne}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Address 2:
          <input
            name="addressTwo"
            type="text"
            value={this.state.addressTwo}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          City:
          <input
            name="city"
            type="text"
            value={this.state.city}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          State:
          <input
            name="state"
            type="text"
            value={this.state.state}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Zip:
          <input
            name="zip"
            type="text"
            value={this.state.zip}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Type:
          <input
            name="type"
            type="text"
            value={this.state.type}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Stars:
          <input
            name="stars"
            type="number"
            value={this.state.stars}
            onChange={this.handleInputChange}
          />
        </label>
        <div className="submit-button-wrap">
          <input className="submit-button" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default AddGymForm;
