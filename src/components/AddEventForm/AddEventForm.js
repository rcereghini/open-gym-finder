import React from "react";
import { firestore } from "../../firebase/firebase.utils";
import "./addEventForm.css";
// import { getAddressCoordinates } from "../../geo/googleMaps";

class AddEventForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: null,
      startTime: null,
      endTime: null,
      description: null,
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

    let eventDetails = { ...this.state };

    // let coordinates = await getAddressCoordinates(address).then(response => {
    //   return response;
    // });

    const { title, startTime, endTime, description, gymId } = this.state;

    const eventCollection = firestore.collection("event");

    //Add event then update ID
    eventCollection
      .add({ title, startTime, endTime, description, gymId })
      .then(res => {
        eventCollection
          .doc(res.id)
          .update({ id: res.id })
          .then(() => {
            console.log("CLOSE OUT THIS HERE");
          });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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