import React from "react";
import AddGymForm from "../AddGymForm/AddGymForm";
import GymList from "../GymList/GymList";
import { firestore } from "../../firebase/firebase.utils";
import "./userDashboard.css";
import avatar01 from "../../assets/avatar01.png";
import { isFlowBaseAnnotation } from "@babel/types";

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewGymVisible: false,
      addNewGymConfirm: false,
      findGymVisible: false
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

  toggleAddNewGym = () => {
    this.setState({
      addNewGymVisible: !this.state.addNewGymVisible,
      addNewGymConfirm: false,
      findGymVisible: false
    });
  };

  toggleFindGym = () => {
    this.setState({
      addNewGymVisible: false,
      addNewGymConfirm: false,
      findGymVisible: !this.state.findGymVisible
    });
  };

  addNewGymConfirm = () => {
    this.setState({
      addNewGymConfirm: !this.state.addNewGymConfirm
    });
  };

  render() {
    return (
      <div className="user-dashboard-main">
        {!this.state.addNewGymVisible && !this.state.findGymVisible ? (
          <div className="user-stats">
            <img className="avatar-image" src={avatar01} />
            <div className="user-stats-details">
              BcFighter<br></br>
              Robert Cereghini<br></br>
              rcereghini@gmail.com
            </div>
          </div>
        ) : null}
        {this.state.findGymVisible ? <GymList gyms={[1, 2, 3, 4]} /> : null}
        {this.state.addNewGymVisible && !this.state.addNewGymConfirm ? (
          <div className="gym-add-confirm" style={{ height: "100%" }}>
            <h2>
              NOTICE: Your gym must be verified before listing open mats. This
              may take up to 48 hours.
            </h2>
            <button onClick={this.addNewGymConfirm}>Continue</button>
          </div>
        ) : null}
        {this.state.addNewGymVisible && this.state.addNewGymConfirm ? (
          <AddGymForm />
        ) : null}
        <div
          className="gym-set-add-wrap"
          style={
            !this.state.addNewGymVisible && !this.state.findGymVisible
              ? { height: "16vh" }
              : { height: "10vh" }
          }
        >
          <div
            className="gym-set-add-button"
            onClick={this.toggleFindGym}
            style={
              !this.state.addNewGymVisible && !this.state.findGymVisible
                ? { height: "16vh" }
                : { height: "10vh" }
            }
          >
            {!this.state.findGymVisible ? "Set Home Gym" : "Back To Profile"}
          </div>
          <div
            className="gym-set-add-button"
            onClick={this.toggleAddNewGym}
            style={
              !this.state.addNewGymVisible && !this.state.findGymVisible
                ? { height: "16vh" }
                : { height: "10vh" }
            }
          >
            {!this.state.addNewGymVisible ? "Add New Gym" : "Back To Profile"}
          </div>
        </div>
        {!this.state.addNewGymVisible && !this.state.findGymVisible ? (
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
        ) : null}
      </div>
    );
  }
}

export default UserDashboard;
