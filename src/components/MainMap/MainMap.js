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
      selectedPlace: {}
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
  }

  onMarkerClick = (props, marker, e) => {
    console.log("props, marker, e", props, marker, e);
    !this.state.showingInfoWindow || marker.name != this.state.currentMarker
      ? this.setState({
          selectedPlace: props,
          activeMarker: marker,
          currentMarker: marker.name,
          showingInfoWindow: true
        })
      : this.setState({
          selectedPlace: props,
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
            return marker ? (
              <Marker
                key={i + 1}
                onClick={this.onMarkerClick}
                name={i + 1}
                position={{
                  lat: marker.lat,
                  lng: marker.lng
                }}
              />
            ) : null;
          })}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            style={{ width: "100%", border: "1px solid gold" }}
          >
            <MarkerModal />
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC5_YmwrvVnI11fY_3WE3JynwbyWcrEdl4"
})(MainMap);
