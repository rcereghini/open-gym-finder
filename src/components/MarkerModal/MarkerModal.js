import React from "react";
import "./markerModal.css";

import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import avatar03 from "../../assets/avatar03.png";

const MarkerModal = () => {
  return (
    <div
      style={{ backgroundColor: "#242a2f" }}
      className="marker-modal-main-div"
    >
      <div className="marker-modal-inner-div">
        <div className="gym-details">
          <p>
            Next Open Mat: <span>Monday, 1/3/37, 5:00PM</span>
          </p>
          <h1>Robert's Super Gym</h1>
          <p>⭐⭐⭐⭐⭐</p>
          <p>
            Description goes here. It will not expand more than just a few
            lines. Hooray!
          </p>
          <div className="rsvp-details">
            <div className="rsvp-attendees">
              <div className="avatars">
                <img style={{ height: "30px" }} src={avatar01} />
                <img style={{ height: "30px" }} src={avatar02} />
                <img style={{ height: "30px" }} src={avatar03} />
              </div>
              <p className="attendee-count">+42</p>
            </div>
            <button>RSVP</button>
          </div>
        </div>
        <div className="gym-challenges">
          Gym Challenges<span style={{ float: "right" }}>(0) v</span>
        </div>
      </div>
    </div>
  );
};

export default MarkerModal;
