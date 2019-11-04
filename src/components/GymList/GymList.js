import React from "react";

import { firestore } from "../../firebase/firebase.utils";
import "./gymList.css";

class GymList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gyms: [],
      gymSearchFilter: ""
    };

    console.log("this.props.currentUser ===>", this.props.currentUser);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGymItemClick = this.handleGymItemClick.bind(this);
  }

  componentDidMount() {
    let instance = this;
    firestore
      .collection("gym")
      .get()
      .then(function(querySnapshot) {
        const GYM_DATA = [];
        querySnapshot.forEach(doc => {
          let data = { id: doc.ref.id, ...doc.data() };
          GYM_DATA.push(data);
        });

        instance.setState({ gyms: GYM_DATA });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  handleGymItemClick(gym) {
    firestore
      .collection("users")
      .doc(this.props.currentUser.id)
      .set({
        ...this.props.currentUser,
        homeGym: {
          name: gym.gymName,
          id: gym.id
        }
      });
    this.props.handleGymStateChange();
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let gyms = this.state.gyms.filter(gym => {
      // console.log("gym ===,", gym);
      return gym.gymName
        ? gym.gymName
            .toLowerCase()
            .startsWith(this.state.gymSearchFilter.toLowerCase())
        : false;
    });

    return (
      <div style={{ height: "100%" }}>
        <input
          style={{
            margin: "1em 0em",
            width: "100vw",
            padding: "1em 2em",
            fontSize: "14px"
          }}
          placeholder="Search Gyms"
          name="gymSearchFilter"
          type="text"
          value={this.state.gymSearchFilter}
          onChange={this.handleInputChange}
        ></input>
        <div className="gym-list">
          {gyms.map((gym, i) => {
            let results = gym.coordinates.results[0];
            return (
              <p
                className="gym-item"
                key={i + 1}
                onClick={() => this.handleGymItemClick(gym)}
              >
                {gym.gymName}
                <br></br>
                {results
                  ? results.address_components[3].long_name +
                    ", " +
                    results.address_components[5].long_name
                  : null}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GymList;
