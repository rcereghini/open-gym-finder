import React from "react";

import { firestore } from "../../firebase/firebase.utils";
import "./gymList.css";

// let gyms = [1, 2, 3, 4, 5, 6, 7];

class GymList extends React.Component {
  constructor() {
    super();

    this.state = {
      gyms: [],
      gymSearchFilter: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    let instance = this;
    firestore
      .collection("gym")
      .get()
      .then(function(querySnapshot) {
        const GYM_DATA = [];
        querySnapshot.forEach(doc => {
          GYM_DATA.push(doc.data());
        });

        instance.setState({ gyms: GYM_DATA });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log("name ===>", name);
    console.log("value ===>", value);

    this.setState({
      [name]: value
    });
  }

  render() {
    let gyms = this.state.gyms.filter(gym => {
      return gym.gymName
        .toLowerCase()
        .startsWith(this.state.gymSearchFilter.toLowerCase());
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
              <p className="gym-item" key={i + 1}>
                {gym.gymName}
                <br></br>
                {results.address_components[3].long_name +
                  ", " +
                  results.address_components[5].long_name}
              </p>
            );
          })}
        </div>
      </div>
    );
  }
}

export default GymList;
