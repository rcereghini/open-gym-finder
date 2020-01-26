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
      rsvpButtonDisabled: true,
      eventInfo: {}
    };

    this.rsvpClickHandler = this.rsvpClickHandler.bind(this);
    this.viewAllClickHandler = this.viewAllClickHandler.bind(this);
  }

  componentDidMount() {
    //GET EVENTS WHERE EQUALS THIS.PROPS.CURRENTUSER.SCHEDULE

    console.log("props ==>", this.props);
    if (this.props.userId && this.props.schedule)
      this.props.schedule.includes(this.props.gym.name)
        ? this.setState({ rsvpButton: "Cancel" }, () => {
            console.log("state set");
          })
        : console.log("false", this.props.schedule, this.props.gym.name);
  }

  componentDidUpdate() {
    // if (this.props.eventIds)
    //   if (this.props.eventIds.length) {
    //     firestore
    //       .collection("event")
    //       .where("id", "in", this.props.eventIds)
    //       .orderBy("startDate")
    //       .get()
    //       .then(res => {
    //         console.log("res =+>", res);
    //         let unpackedEvents = [];
    //         res.forEach(event => {
    //           unpackedEvents.push(event.data());
    //         });
    //         console.log("unpacked events ===>", unpackedEvents);
    //         // unpacked;
    //         this.setState({ eventInfo: unpackedEvents });
    //       });
    //   }
  }

  rsvpClickHandler = props => {
    let userRef = firestore.collection("users").doc(this.props.userId);

    userRef.update({
      schedule: firebase.firestore.FieldValue.arrayUnion(this.props.gym.name)
    });
  };

  viewAllClickHandler = props => {
    console.log("view all");
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
              {/* Next Open Mat: <span>{this.props.gym.nextOpenMat.time}</span> */}
              Next Open Mat:{" "}
              <span>
                {this.props.eventIds ? this.props.eventIds[0] : "None"}
              </span>
            </p>
            <h1>{this.props.gym.name}</h1>
            <p>⭐⭐⭐⭐⭐</p>
            <p>{this.props.gym.description}</p>
            <div className="rsvp-details">
              {this.props.eventIds ? (
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
              ) : null}

              {!this.props.eventIds ? (
                <p style={{ width: "100%" }}>
                  No upcoming events.<br></br> Check Again Soon!
                </p>
              ) : (
                <div className="marker-modal-buttons">
                  <button
                    id="rsvpButton"
                    onClick={this.rsvpClickHandler}
                    disabled={this.state.rsvpButtonActive}
                    className="rsvp-button"
                  >
                    RSVP NOW
                  </button>
                  <button
                    id="viewAllButton"
                    onClick={this.viewAllClickHandler}
                    disabled={this.state.rsvpButtonActive}
                    className="rsvp-button"
                  >
                    VIEW ALL
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* <div className="gym-challenges">
            Gym Challenges
            <span style={{ float: "right" }}>(0) v</span>
          </div> */}
        </div>
      </div>
    );
  }
}

export default MarkerModal;
