import React from "react";
import "./markerModal.css";

import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import avatar03 from "../../assets/avatar03.png";
import { firestore } from "../../firebase/firebase.utils";
import firebase from "firebase/app";

class MarkerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rsvpButton: "RSVP"
    };

    this.rsvpClickHandler = this.rsvpClickHandler.bind(this);
  }

  componentDidMount() {
    console.log("props ==>", this.props.userId);
    if (this.props.userId && this.props.schedule)
      this.props.schedule.includes(this.props.gym.name)
        ? this.setState({ rsvpButton: "Cancel" }, () => {
            console.log("state set");
          })
        : console.log("false", this.props.schedule, this.props.gym.name);
  }

  rsvpClickHandler = props => {
    let userRef = firestore.collection("users").doc(this.props.userId);

    userRef.update({
      schedule: firebase.firestore.FieldValue.arrayUnion(this.props.gym.name)
    });
  };

  render() {
    return (
      <div
        onClick={this.rsvpClickHandler}
        style={{ backgroundColor: "#242a2f" }}
        className="marker-modal-main-div"
      >
        <div className="marker-modal-inner-div">
          <div className="gym-details">
            <p>
              Next Open Mat: <span>{this.props.gym.nextOpenMat.time}</span>
            </p>
            <h1>{this.props.gym.name}</h1>
            <p>⭐⭐⭐⭐⭐</p>
            <p>{this.props.gym.description}</p>
            <div className="rsvp-details">
              <div className="rsvp-attendees">
                <div className="avatars">
                  <img style={{ height: "30px" }} src={avatar01} alt={""} />
                  <img style={{ height: "30px" }} src={avatar02} alt={""} />
                  <img style={{ height: "30px" }} src={avatar03} alt={""} />
                </div>
                <p className="attendee-count">
                  +{this.props.gym.nextOpenMat.attendeeCount}
                </p>
              </div>
              <button id="rsvpButton" onClick={this.rsvpClickHandler}>
                {this.state.rsvpButton}
              </button>
            </div>
          </div>
          <div className="gym-challenges">
            Gym Challenges
            <span style={{ float: "right" }}>(0) v</span>
          </div>
        </div>
      </div>
    );
  }
}

export default MarkerModal;
