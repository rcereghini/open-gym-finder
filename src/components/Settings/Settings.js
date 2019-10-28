import React from "react";

import "./settings.css";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

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
    // let address = { ...this.state };

    // let coordinates = await getAddressCoordinates(address).then(response => {
    //   return response;
    // });

    // const { phone, website, description, type, gymName } = this.state;

    // firestore
    //   .collection("gym")
    //   .add({ phone, website, type, gymName, description, coordinates });
  }

  render() {
    return (
      <div className="settings-main">
        <h2>Settings</h2>
        <hr />
        <label className="settings-label" style={{}}>
          Disable Messaging:
          <select>
            <option>Disabled</option>
            <option>Enable</option>
          </select>
        </label>
        <br></br>
        <label className="settings-label">
          Share Schedule:
          <select>
            <option>Disabled</option>
            <option>Enable</option>
          </select>
        </label>
        <br></br>
        <label className="settings-label">
          Push Notifications:
          <select>
            <option>Disabled</option>
            <option>Enable</option>
          </select>
        </label>
      </div>
    );
  }
}

export default Settings;
