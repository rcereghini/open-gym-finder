import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import firebase from "firebase/app";

import "./addEventForm.css";
// import { getAddressCoordinates } from "../../geo/googleMaps";

class AddEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      startTime: "",
      endTime: "",
      description: "",
      gymId: props.gymId,
      createdBy: props.userId
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

    // let coordinates = await getAddressCoordinates(address).then(response => {
    //   return response;
    // });
    const { title, startTime, endTime, description, gymId } = this.state;

    const eventCollection = firestore.collection("event");
    const gymCollection = firestore.collection("gym");

    //Add event then update ID
    let userRef = firestore.collection("users").doc(this.props.userId);

    eventCollection
      .add({ title, startTime, endTime, description, gymId })
      .then(res => {
        eventCollection
          .doc(res.id)
          .update({ id: res.id })
          .then(() => {
            userRef.update({
              schedule: firebase.firestore.FieldValue.arrayUnion(res.id)
            });
            gymCollection.doc(gymId).update({
              eventIds: firebase.firestore.FieldValue.arrayUnion(res.id)
            });
            this.props.addEventCallback(res.id);
          });
      });
  }

  render() {
    return (
      <form className="add-event-form" onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Start Time:
          <input
            name="startTime"
            type="date"
            value={this.state.startTime}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          End Time:
          <input
            name="endTime"
            type="date"
            value={this.state.endTime}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
        </label>
        <br />

        <div className="submit-button-wrap">
          <input className="submit-button" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default AddEventForm;
