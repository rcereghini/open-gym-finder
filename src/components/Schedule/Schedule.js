import React from "react";

const Schedule = props => {
  const { currentUser } = props;
  console.log("currentUser ===>", currentUser);
  return (
    <div style={{ color: "white", fontSize: "2em", marginTop: "1em" }}>
      {currentUser.schedule.map((entry, i) => {
        return (
          <p className="gym-item" key={i + 1}>
            {entry}
          </p>
        );
      })}
    </div>
  );
};

export default Schedule;
