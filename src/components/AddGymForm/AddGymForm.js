import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import "./addGymForm.css";
import { getAddressCoordinates } from "../../geo/googleMaps";

class AddGymForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      website: "",
      type: "",
      gymName: "",
      description: ""
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
    let address = { ...this.state };

    let coordinates = await getAddressCoordinates(address).then(response => {
      return response;
    });

    const { phone, website, description, type, gymName } = this.state;

    firestore
      .collection("gym")
      .add({ phone, website, type, gymName, description, coordinates });
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
            name="address1"
            type="text"
            value={this.state.address1}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Address 2:
          <input
            name="address2"
            type="text"
            value={this.state.address2}
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
        <label style={{ marginTop: "1em" }}>
          Description:
          <textarea
            name="description"
            type="text"
            rows="5"
            value={this.state.description}
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
