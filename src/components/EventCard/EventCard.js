import React from "react";
import "./eventCard.css";
import { firestore } from "../../firebase/firebase.utils";
import firebase from "firebase/app";

import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import avatar03 from "../../assets/avatar03.png";

const EventCard = props => {
  console.log("props", props);
  return (
    <div>
      <div className="gym-item">
        <span style={{ fontSize: "1.5em" }}>{props.title}</span>
        <br></br>
        {props.startTime} - {props.endTime}
        <br></br>
        <div className="avatars">
          <div>
            <img style={{ height: "30px" }} src={avatar01} alt={""} />
            <img style={{ height: "30px" }} src={avatar02} alt={""} />
            <img style={{ height: "30px" }} src={avatar03} alt={""} />
            +1337
          </div>
          <button
            onClick={() => {
              let userRef = firestore
                .collection("users")
                .doc(props.currentUser.id);
              userRef.update({
                schedule: firebase.firestore.FieldValue.arrayRemove(
                  props.entryId
                )
              });
              props.eventCardCallback(props.entryId);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
