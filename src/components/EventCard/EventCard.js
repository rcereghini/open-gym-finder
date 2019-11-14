import React from "react";
import "./eventCard.css";

import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import avatar03 from "../../assets/avatar03.png";

const EventCard = props => {
  // console.log("props ++==>", props);
  return (
    <div>
      <div className="gym-item">
        <span style={{ fontSize: "1.5em" }}>ENTRY</span>
        <br></br>
        Monday, November 12th - 6:00PM<br></br>
        <div className="avatars">
          <div>
            <img style={{ height: "30px" }} src={avatar01} />
            <img style={{ height: "30px" }} src={avatar02} />
            <img style={{ height: "30px" }} src={avatar03} />
            +1337
          </div>
          <button onClick={() => console.log("cancel")}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
