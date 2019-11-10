import React from "react";

import { firestore } from "../../firebase/firebase.utils";

import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import avatar03 from "../../assets/avatar03.png";
import "./schedule.css";

const Schedule = props => {
  const { currentUser } = props;

  // const removeItem

  const removeItem = itemIndex => {
    let newCurrentUser = { ...currentUser };
    newCurrentUser.schedule.splice(itemIndex, 1);
    firestore
      .collection("users")
      .doc(currentUser.id)
      .set({
        ...newCurrentUser
      });
  };

  return (
    <div style={{ color: "white", fontSize: "2em", marginTop: ".3em" }}>
      {currentUser.schedule
        ? currentUser.schedule.map((entry, i) => {
            return (
              <div key={i + 1}>
                <div className="gym-item">
                  <span style={{ fontSize: "1.5em" }}>{entry}</span>
                  <br></br>
                  Monday, November 12th - 6:00PM<br></br>
                  <div className="avatars">
                    <div>
                      <img style={{ height: "30px" }} src={avatar01} />
                      <img style={{ height: "30px" }} src={avatar02} />
                      <img style={{ height: "30px" }} src={avatar03} />
                      +1337
                    </div>
                    <button onClick={() => removeItem(i)}>Cancel</button>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Schedule;
