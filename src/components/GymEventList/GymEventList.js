import React from "react";
import EventCard from "../EventCard/EventCard";
import { Route } from "react-router-dom";
import "./gymEventList.css";

const GymEventList = ({ match }, props) => {
  console.log("props ===>", props);
  console.log("match ===>", match);
  return (
    <div>
      GymEventList
      {}
    </div>
  );
};

export default GymEventList;
