import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import "./userDashboard.css";
import avatar01 from "../../assets/avatar01.png";

class UserDashboard extends React.Component {
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

  handleSubmit(event) {
    firestore.collection("gym").add({
      ...this.state
    });
    event.preventDefault();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            border: "2px solid gold",
            borderRadius: "5px",
            padding: ".7em",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",

            marginTop: ".7em"
          }}
        >
          <img style={{ height: "32vw" }} src={avatar01} />
          <div
            style={{
              color: "white",
              margin: "1em",
              borderBox: "content-box",
              fontSize: "14px"
            }}
          >
            BcFighter<br></br> Robert Cereghini<br></br> rcereghini@gmail.com
          </div>
        </div>
        <div
          style={{
            width: "100%",
            marginTop: ".7em",
            color: "white",
            display: "grid",
            height: "16vh",
            gridTemplateColumns: "1fr 1fr"
          }}
        >
          <div
            style={{
              height: "16vh",
              border: "2px solid gold",
              borderRadius: "5px",
              marginRight: ".2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Set Home Gym
          </div>
          <div
            className="addNewGym"
            style={{
              height: "16vh",
              border: "2px solid gold",
              borderRadius: "5px",
              marginLeft: ".2em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            Add New Gym
          </div>
        </div>
        <div
          style={{
            border: "2px solid gold",
            borderRadius: "5px",
            width: "100%",
            height: "100%",
            marginTop: ".7em",
            color: "white",
            marginBottom: ".7em"
          }}
        >
          <h2>Settings</h2>
          <hr style={{ margin: "1em", backgroundColor: "gold" }}></hr>
          <label
            style={{
              textAlign: "right",
              display: "grid",
              gridTemplateColumns: "1.75fr 1fr",
              marginRight: "1em"
            }}
          >
            Disable Messaging:
            <select style={{ marginLeft: "2em", backgroundColor: "white" }}>
              <option>Disabled</option>
              <option>Enable</option>
            </select>
          </label>
          <br></br>
          <label
            style={{
              display: "grid",
              gridTemplateColumns: "1.75fr 1fr",
              marginRight: "1em",
              textAlign: "right"
            }}
          >
            Share Schedule:
            <select style={{ marginLeft: "2em", backgroundColor: "white" }}>
              <option>Disabled</option>
              <option>Enable</option>
            </select>
          </label>
          <br></br>
          <label
            style={{
              display: "grid",
              gridTemplateColumns: "1.75fr 1fr",
              marginRight: "1em",
              textAlign: "right"
            }}
          >
            Push Notifications:
            <select style={{ marginLeft: "2em", backgroundColor: "white" }}>
              <option>Disabled</option>
              <option>Enable</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default UserDashboard;
