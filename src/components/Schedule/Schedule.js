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

  useEffect(() => {
    let { schedule } = props.currentUser;

    firestore
      .collection("event")
      .where("id", "in", schedule)
      .get()
      .then(res => {
        let unpackedEvents = [];
        res.forEach(event => {
          unpackedEvents.push(event.data());
        });
        setSchedule(unpackedEvents);
      });
  });

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
        ? schedule.map((entry, i) => {
            // console.log("entry +++>", entry);
            let { id, description, title, startTime, endTime, gymId } = entry;
            return (
              <EventCard
                entryId={id}
                description={description}
                title={title}
                startTime={startTime}
                endTime={endTime}
                gymId={gymId}
                key={i + 1}
              ></EventCard>
            );
          })
        : null}
      {eventView === "calendar" ? (
        <UserCalendar schedule={schedule}></UserCalendar>
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
