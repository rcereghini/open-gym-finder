import React, { useState, useEffect } from "react";

import { firestore } from "../../firebase/firebase.utils";
import UserCalendar from "../UserCalendar/UserCalendar";
import AddEventForm from "../AddEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";

import "./schedule.css";

const Schedule = props => {
  const { currentUser } = props;
  const [eventView, setEventView] = useState("list");
  const [schedule, setSchedule] = useState([]);

  // useEffect(() => {
  // .where("capital", "==", true)

  let events = [];
  firestore
    .collection("event")
    .get()
    .then(function(querySnapshot) {
      // console.log(querySnapshot);
    })
    .then(() => {
      console.log("events ===>", events);
      setSchedule(events);
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  // });

  let testEvent = {};
  //may need to do before mount

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
      <div style={{ marginBottom: ".3em" }}>
        <button onClick={() => setEventView("list")}>List</button>
        <button onClick={() => setEventView("calendar")}>Calendar</button>
        <button
          style={{ marginLeft: "3em" }}
          onClick={() => setEventView("addEventForm")}
        >
          Add
        </button>
      </div>
      {currentUser.schedule && eventView === "list"
        ? currentUser.schedule.map((entry, i) => {
            return (
              <EventCard
                entry={entry}
                testEvent={testEvent}
                key={i + 1}
              ></EventCard>
            );
          })
        : null}
      {eventView === "calendar" ? (
        <UserCalendar currentUser={currentUser}></UserCalendar>
      ) : null}

      {eventView === "addEventForm" ? (
        <AddEventForm
          gymId={currentUser.homeGym.id}
          userId={currentUser.id}
        ></AddEventForm>
      ) : null}
    </div>
  );
};

export default Schedule;
