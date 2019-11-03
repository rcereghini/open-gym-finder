import React from "react";
import AddGymForm from "../AddGymForm/AddGymForm";
import GymList from "../GymList/GymList";
import Settings from "../Settings/Settings";
import { firestore } from "../../firebase/firebase.utils";
import "./userDashboard.css";
import avatar01 from "../../assets/avatar01.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addNewGymVisible: false,
      addNewGymConfirm: false,
      findGymVisible: false,
      gymInfoVisible: this.props.currentUser.homeGym.id ? true : false
    };

    console.log("test ===>", this.props.currentUser);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    // console.log("hi", this.props.currentuser.homeGym.id);
    // console.log("hi2", this.state.gymInfoVisible);
    // if (this.props.currentUser.homeGym.id && !this.state.gymInfoVisible) {
    //   this.setState({ gymInfoVisible: false, addNewGymVisible: false }, () =>
    //     console.log("state ==>", this.state)
    //   );
    // }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLeaveGym = () => {
    this.setState({
      findGymVisible: false,
      gymInfoVisible: false,
      addNewGymVisible: false,
      addNewGymConfirm: false
    });
  };

  handleSubmit(event) {
    firestore.collection("gym").add({
      ...this.state
    });
    event.preventDefault();
  }

  toggleAddNewGym = () => {
    this.setState({
      addNewGymVisible: !this.state.addNewGymVisible,
      addNewGymConfirm: false,
      findGymVisible: false
    });
  };

  toggleFindGym = () => {
    this.setState({
      addNewGymVisible: false,
      addNewGymConfirm: false,
      findGymVisible: !this.state.findGymVisible
    });
  };

  addNewGymConfirm = () => {
    this.setState({
      addNewGymConfirm: !this.state.addNewGymConfirm
    });
  };

  render() {
    const { displayName, email } = this.props;

    return (
      <div className="user-dashboard-main">
        {!this.state.addNewGymVisible && !this.state.findGymVisible ? (
          <div className="user-stats">
            <img className="avatar-image" src={avatar01} />
            <div className="user-stats-details">
              <div>
                {this.props.currentUser.displayName}
                <br></br>
                Robert Cereghini<br></br>
                {this.props.currentUser.email}
                <br></br>
              </div>
              <FontAwesomeIcon
                icon={faEdit}
                className="edit-icon-styles"
              ></FontAwesomeIcon>
            </div>
          </div>
        ) : null}
        {this.state.findGymVisible ? (
          <GymList
            currentUser={this.props.currentUser}
            handleGymStateChange={() => {
              this.setState({ findGymVisible: false, gymInfoVisible: true });
            }}
          />
        ) : null}
        {this.state.addNewGymVisible && !this.state.addNewGymConfirm ? (
          <div className="gym-add-confirm" style={{ height: "100%" }}>
            <h2>
              NOTICE: Your gym must be verified before listing open mats. This
              may take up to 48 hours.
            </h2>
            <button onClick={this.addNewGymConfirm}>Continue</button>
          </div>
        ) : null}
        {this.state.addNewGymVisible && this.state.addNewGymConfirm ? (
          <AddGymForm />
        ) : null}

        {!this.state.gymInfoVisible ? (
          <div
            className="gym-set-add-wrap"
            style={
              !this.state.addNewGymVisible && !this.state.findGymVisible
                ? { height: "16vh" }
                : { height: "8vh", marginBottom: ".7em" }
            }
          >
            <div
              className="gym-set-add-button"
              onClick={this.toggleFindGym}
              style={
                !this.state.addNewGymVisible && !this.state.findGymVisible
                  ? { height: "16vh" }
                  : { height: "8vh", marginBottom: ".7em" }
              }
            >
              {!this.state.findGymVisible ? "Set Home Gym" : "Back To Profile"}
            </div>
            <div
              className="gym-set-add-button"
              onClick={this.toggleAddNewGym}
              style={
                !this.state.addNewGymVisible && !this.state.findGymVisible
                  ? { height: "16vh" }
                  : { height: "8vh", marginBottom: ".7em" }
              }
            >
              {!this.state.addNewGymVisible ? "Add New Gym" : "Back To Profile"}
            </div>
          </div>
        ) : null}

        {this.state.gymInfoVisible && this.props.currentUser.homeGym.id ? (
          <div className="gym-info-box">
            <p style={{ color: "white", fontSize: "14px" }}>
              Member of {this.props.currentUser.homeGym.name}
            </p>
            <div>
              <Link to={"/user/gym"}>
                <button style={{ margin: ".7em" }}>Gym Page</button>
              </Link>
            </div>
          </div>
        ) : null}

        {!this.state.addNewGymVisible && !this.state.findGymVisible ? (
          <div className="additional-stats-box">
            <h1 style={{ color: "white", fontSize: "14px" }}>
              Additional stats to go here.
            </h1>
          </div>
        ) : null}
        {/* {!this.state.addNewGymVisible && !this.state.findGymVisible ? (
          <Settings />
        ) : null} */}
      </div>
    );
  }
}

export default UserDashboard;
