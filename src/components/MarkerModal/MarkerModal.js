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
    this.state = {};

    this.rsvpClickHandler = this.rsvpClickHandler.bind(this);
  }

  rsvpClickHandler = props => {
    console.log("this.props", this.props);
    let userRef = firestore.collection("users").doc(this.props.currentUser.id);

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
                  <img style={{ height: "30px" }} src={avatar01} />
                  <img style={{ height: "30px" }} src={avatar02} />
                  <img style={{ height: "30px" }} src={avatar03} />
                </div>
                <p className="attendee-count">
                  +{this.props.gym.nextOpenMat.attendeeCount}
                </p>
              </div>
              <button id="rsvpButton" onClick={this.rsvpClickHandler}>
                RSVP
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
