import React from "react";
import "./markerModal.css";

import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import avatar03 from "../../assets/avatar03.png";

const MarkerModal = props => {
  return (
    <div
      style={{ backgroundColor: "#242a2f" }}
      className="marker-modal-main-div"
    >
      <div className="marker-modal-inner-div">
        <div className="gym-details">
          <p>
            Next Open Mat: <span>{props.nextOpenMat.time}</span>
          </p>
          <h1>{props.gym.name}</h1>
          <p>⭐⭐⭐⭐⭐</p>
          <p>{props.gym.description}</p>
          <div className="rsvp-details">
            <div className="rsvp-attendees">
              <div className="avatars">
                <img style={{ height: "30px" }} src={avatar01} />
                <img style={{ height: "30px" }} src={avatar02} />
                <img style={{ height: "30px" }} src={avatar03} />
              </div>
              <p className="attendee-count">
                +{props.gym.nextOpenMat.attendeeCount}
              </p>
            </div>
            <button>RSVP</button>
          </div>
        </div>
        <div className="gym-challenges">
          Gym Challenges
          <span style={{ float: "right" }}>
            ({props.gym.challenges.remainingChallenges}) v
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarkerModal;
