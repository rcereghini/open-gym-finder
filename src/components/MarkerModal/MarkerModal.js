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

    let nextEvent = this.getNextEvent();
    console.log("nextEvent", nextEvent);

    this.state = {
      rsvpButtonDisabled: true,
      eventInfo: {},
      nextEvent: nextEvent
    };

    this.rsvpClickHandler = this.rsvpClickHandler.bind(this);
    this.viewAllClickHandler = this.viewAllClickHandler.bind(this);
  }

  componentDidMount() {
    //GET EVENTS WHERE EQUALS THIS.PROPS.CURRENTUSER.SCHEDULE

    let nextEvent = this.getNextEvent();

    if (this.props.userId && this.props.schedule)
      this.props.schedule.includes(this.props.gym.name)
        ? this.setState({ rsvpButton: "Cancel" }, () => {
            console.log("state set");
          })
        : console.log("false", this.props.schedule, this.props.gym.name);

    this.setState({
      nextEvent: nextEvent
    });
  }

  componentDidUpdate() {
    // this.getNextEvent();
    console.log("componentDidUpdate");
  }

  rsvpClickHandler = props => {
    //Also update event with addition to userId array
    let userRef = firestore.collection("users").doc(this.props.userId);

    if (this.props.eventIds.length)
      userRef.update({
        schedule: firebase.firestore.FieldValue.arrayUnion(
          this.props.eventIds[0]
        )
      });
  };

  viewAllClickHandler = props => {
    console.log("view all", this.props);
    this.props.gymListRedirect();
  };

  getNextEvent = props => {
    let events = [];
    if (this.props.schedule.length) {
      if (this.props.schedule.length > 10) {
        let queryTenCap = this.props.schedule.slice(0, 10);
        firestore
          .collection("event")
          .where("id", "in", queryTenCap)
          .get()
          .then(res => {
            res.docs.forEach(event => {
              events.push(event.data());
            });
          })
          .then(() => {
            let { startTime } = events[0];
            this.setState({ nextEvent: events[0].startTime });
            return startTime;
          });
      } else {
        firestore
          .collection("event")
          .where("id", "in", this.props.schedule)
          .get()
          .then(res => {
            res.docs.forEach(event => {
              events.push(event.data());
            });
            if (events[0]) {
              this.setState(
                { nextEvent: events[0].startTime },
                () => events[0].startTime
              );
              return events[0].startTime;
            } else return "None.";
          });
      }
    } else {
      this.setState({ nextEvent: "None." });
      return "None.";
    }
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
              Next Open Mat: <span>{this.state.nextEvent}</span>
            </p>
            <h1>{this.props.selectedMarker.gymName}</h1>
            <p>⭐⭐⭐⭐⭐</p>
            <p>{this.props.selectedMarker.description}</p>
            <div className="rsvp-details">
              {this.props.eventIds[0] ? (
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
              {console.log("proproproprs", this.props)}
              {!this.props.eventIds[0] ? (
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
