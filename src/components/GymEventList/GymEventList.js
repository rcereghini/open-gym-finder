import React, { useState } from "react";
import EventCard from "../EventCard/EventCard";
import { firestore } from "../../firebase/firebase.utils";
import "./gymEventList.css";

const GymEventList = ({ match }, props) => {
  console.log("props ===>", props);
  console.log("match ===>", match);

  let instance = this;
  const [eventNodes, setEventNodes] = useState("");
  let eventIds = [];
  firestore
    .collection("gym")
    .doc(match.params.gym)
    .get()
    .then(res => {
      console.log("res ==>", res.data());
      eventIds = res.data().eventIds;
      setEventNodes(
        eventIds.map(event => {
          return <p>{event}</p>;
        })
      );
      //     function(querySnapshot) {
      //   const GYM_DATA = [];
      //   querySnapshot.forEach(doc => {
      //     console.log("qsnap doc ==>", doc);
      //     let data = { id: doc.ref.id, ...doc.data() };
      //     GYM_DATA.push(data);
      //   });

      //   instance.setState({ gyms: GYM_DATA });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });

  return (
    <div>
      <h2>GymEventList</h2>
      <p>Gym Id: {match.params.gym}</p>
      <p>UNDER CONSTRUCTION - PLANNED COMPLETION BY 1/30/2020</p>
      <br></br>
      <h2 style={{ marginTop: "2em" }}>Event Ids (TEMP):</h2>
      {eventNodes}
    </div>
  );
};

export default GymEventList;
