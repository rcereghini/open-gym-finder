import React from "react";

import { firestore } from "../../firebase/firebase.utils";
import UserCalendar from "../UserCalendar/UserCalendar";
import Modal from "../Modal/Modal";
import AddEventForm from "../AddEventForm/AddEventForm";
import EventCard from "../EventCard/EventCard";

import "./schedule.css";

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
      eventView: "list",
      isModalActive: false,
      alertText: "You must be a member of a gym to create an event."
    };

    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    const querySchedule = this.props.currentUser.schedule;

    console.log("querySchedule ===>", querySchedule);

    if (querySchedule.length)
      firestore
        .collection("event")
        .where("id", "in", querySchedule)
        .get()
        .then(res => {
          let unpackedEvents = [];

          console.log("response ===>", res);
          res.forEach(event => {
            unpackedEvents.push(event.data());
          });

          this.setState({
            schedule: unpackedEvents
          });
        });
  }

  componentDidUpdate() {}

  removeItem = itemIndex => {
    const currentUser = this.props;
    let newCurrentUser = { ...currentUser };
    newCurrentUser.schedule.splice(itemIndex, 1);
    firestore
      .collection("users")
      .doc(currentUser.id)
      .set({
        ...newCurrentUser
      });
  };

  render() {
    return (
      <div style={{ color: "white", fontSize: "2em", marginTop: ".3em" }}>
        <div style={{ marginBottom: ".3em" }}>
          <button onClick={() => this.setState({ eventView: "list" })}>
            List
          </button>
          <button onClick={() => this.setState({ eventView: "calendar" })}>
            Calendar
          </button>
          <button
            style={{ marginLeft: "3em" }}
            onClick={() => {
              console.log("entry ===>", this.props.currentUser);

              if (!this.props.currentUser.homeGym.id) {
                this.setState({ isModalActive: true });
                return;
              }
              this.setState({ eventView: "addEventForm" });
            }}
          >
            Add
          </button>
        </div>
        {console.log(this.state.schedule, this.state.eventView)}
        {this.state.schedule && this.state.eventView === "list"
          ? this.state.schedule.map((entry, i) => {
              console.log("entry ===>", entry);
              let { id, description, title, startTime, endTime, gymId } = entry;
              return (
                <EventCard
                  entryId={id}
                  currentUser={this.props.currentUser}
                  description={description}
                  title={title}
                  startTime={startTime}
                  endTime={endTime}
                  gymId={gymId}
                  key={i + 1}
                  eventCardCallback={() => {
                    let events = this.props.currentUser.schedule.filter(
                      item => item !== id
                    );
                    console.log("hiiii22333");

                    if (events.length) {
                      console.log("hiiii22");

                      firestore
                        .collection("event")
                        .where("id", "in", events)
                        .get()
                        .then(res => {
                          console.log("hiiii");
                          let events = [];

                          res.docs.forEach(event => {
                            events.push(event.data());
                          });

                          this.setState({
                            schedule: events
                          });
                        });
                    } else {
                      this.setState({
                        schedule: []
                      });
                    }
                  }}
                ></EventCard>
              );
            })
          : null}
        {this.state.eventView === "calendar" ? (
          <UserCalendar schedule={this.state.schedule}></UserCalendar>
        ) : null}

        {this.state.eventView === "addEventForm" ? (
          <AddEventForm
            gymId={
              this.props.currentUser.homeGym
                ? this.props.currentUser.homeGym.id
                : ""
            }
            userId={this.props.currentUser.id ? this.props.currentUser.id : ""}
            addEventCallback={entryId => {
              let events = [...this.props.currentUser.schedule];
              events.push(entryId);

              firestore
                .collection("event")
                .where("id", "in", events)
                .get()
                .then(res => {
                  let events = [];

                  res.docs.forEach(event => {
                    events.push(event.data());
                  });

                  this.setState({
                    schedule: events,
                    eventView: "list"
                  });
                });
            }}
          ></AddEventForm>
        ) : null}

        {this.state.isModalActive ? (
          <Modal
            innerText={this.state.alertText}
            setInactive={() => this.setState({ isModalActive: false })}
          ></Modal>
        ) : null}
      </div>
    );
  }
}

export default Schedule;
