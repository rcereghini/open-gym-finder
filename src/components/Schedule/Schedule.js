import React from "react";
import avatar01 from "../../assets/avatar01.png";
import avatar02 from "../../assets/avatar02.png";
import avatar03 from "../../assets/avatar03.png";

const Schedule = props => {
  const { currentUser } = props;

  // const removeItem

  console.log("currentUser ===>", currentUser);
  return (
    <div style={{ color: "white", fontSize: "2em", marginTop: ".3em" }}>
      {currentUser.schedule.map((entry, i) => {
        return (
          <div key={i + 1}>
            <p className="gym-item">
              <span style={{ fontSize: "1.5em" }}>{entry}</span>
              <br></br>
              Monday, November 12th - 6:00PM<br></br>
              <div
                className="avatars"
                style={{
                  marginTop: "1.5em",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <img style={{ height: "30px" }} src={avatar01} />
                  <img style={{ height: "30px" }} src={avatar02} />
                  <img style={{ height: "30px" }} src={avatar03} />
                  +1337
                </div>
                <button>Cancel</button>
              </div>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;
