import React, { Component } from "react";
import { Map, InfoWindow, GoogleApiWrapper, Marker } from "google-maps-react";
import MarkerModal from "../MarkerModal/MarkerModal";
import { firestore } from "../../firebase/firebase.utils";

import "./mainMap.css";

export class MainMap extends Component {
  constructor() {
    super();

    this.state = {
      markers: [],
      selectedMarker: {}
    };
  }

  componentDidMount() {
    const GYMS = [];
    document.getElementById("main").parentElement.style.width = "100%";
    firestore
      .collection("gym")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(doc => {
          let gymInfo = doc.data();
          GYMS.push(gymInfo);
        });
      })
      .then(() => {
        this.setState({ markers: [...GYMS] });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    let address = {
      address1: "6407 s mcallister",
      address2: "ave",
      city: "tempe",
      state: "az",
      zip: "85283"
    };

    // firestore
    //   .collection("gym")
    //   .doc()
    //   .set({
    //     name: "Gym of Bob",
    //     description: "A really great place.",
    //     challengeRemainingCount: 3,
    //     nextOpenMat: {
    //       time: "Monday, June 15th, 5:30PM",
    //       attendeeCount: 1337
    //     },
    //     location: {
    //       lat: 33.40371,
    //       lng: 111.97223
    //     }
    //   });
  }

  onMarkerClick = (props, marker, e) => {
    console.log("props, marker, e", props, marker, e, this);
    console.log();
    console.log("this.selectedMarker ===>", this.state.selectedMarker);
    !this.state.showingInfoWindow || marker.name != this.state.currentMarker
      ? this.setState({
          selectedMarker: this.state.markers[props.name - 1],
          activeMarker: marker,
          currentMarker: marker.name,
          showingInfoWindow: true
        })
      : this.setState({
          selectedMarker: props,
          activeMarker: null,
          showingInfoWindow: false
        });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    console.log("this.state.markers ===>", this.state.markers);
    return (
      <div id="main" style={{ width: "100%" }}>
        <Map
          id="mapComponent"
          google={this.props.google}
          zoom={10}
          disableDefaultUI={true}
          style={{ height: "80vh", position: "static" }}
          initialCenter={{
            lat: 33.373332,
            lng: -111.940023
          }}
        >
          {this.state.markers.map((marker, i) => {
            return marker.coordinates ? (
              <Marker
                key={i + 1}
                onClick={this.onMarkerClick}
                name={i + 1}
                position={{
                  lat: marker.coordinates.results[0].geometry.location.lat,
                  lng: marker.coordinates.results[0].geometry.location.lng
                }}
              />
            ) : null;
          })}

          {}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            style={{ width: "100%", border: "1px solid gold" }}
          >
            <MarkerModal
              gym={{
                name: this.state.selectedMarker.gymName,
                description: this.state.selectedMarker.description,
                challengeRemainingCount: 3,
                nextOpenMat: {
                  time: "Monday, June 15th, 5:30PM",
                  attendeeCount: 1337
                }
              }}
              user={{ challenges: { remainingChallenges: 4 } }}
            />
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC5_YmwrvVnI11fY_3WE3JynwbyWcrEdl4"
})(MainMap);
