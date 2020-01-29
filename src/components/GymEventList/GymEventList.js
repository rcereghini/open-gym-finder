import React from "react";
import EventCard from "../EventCard/EventCard";
import "./gymEventList.css";

const GymEventList = ({ match }, props) => {
  console.log("props ===>", props);
  console.log("match ===>", match);
  return (
    <div>
      <h2>GymEventList</h2>
      <p>{match.params.gym}</p>
      <p>UNDER CONSTRUCTION - PLANNED COMPLETION BY 1/29/2020</p>
    </div>
  );
};

export default GymEventList;
