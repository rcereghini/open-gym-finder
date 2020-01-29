import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import MarkerModal from "../MarkerModal/MarkerModal";
import InfoWindowEx from "./InfoWindowEx/InfoWindowEx";
import { firestore } from "../../firebase/firebase.utils";

import "./mainMap.css";
import { thisExpression } from "@babel/types";

export class MainMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      selectedMarker: {},
      redirect: false,
      currentUser: this.props.currentUser
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
    // console.log("props, marker, e", props, "marker", marker, e, this);
    // console.log("props marker click", this.props);

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
    console.log("props in render", this.props);
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
            console.log("marker ==>", marker);
            return marker.coordinates ? (
              <Marker
                key={i + 1}
                onClick={this.onMarkerClick}
                name={i + 1}
                eventIds={marker.eventIds}
                description={marker.description}
                position={{
                  lat: marker.coordinates.results[0]
                    ? marker.coordinates.results[0].geometry.location.lat
                    : null,
                  lng: marker.coordinates.results[0]
                    ? marker.coordinates.results[0].geometry.location.lng
                    : null
                }}
              />
            ) : null;
          })}

          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            style={{ width: "100%", border: "1px solid gold" }}
            currentUser={this.props.currentUser}
          >
            <MarkerModal
              gym={{
                challengeRemainingCount: 3,
                nextOpenMat: {
                  time: "Monday, June 15th, 5:30PM",
                  attendeeCount: 1337
                },
                ...this.state.selectedMarker
              }}
              eventIds={
                this.state.selectedMarker.eventIds
                  ? this.state.selectedMarker.eventIds
                  : []
              }
              userId={this.props.userId}
              schedule={this.props.schedule}
              selectedMarker={this.state.selectedMarker}
              gymListRedirect={() => this.setState({ redirect: true })}
            />
          </InfoWindowEx>
        </Map>
        {this.state.redirect ? (
          <Redirect push to={`/roam/${this.state.selectedMarker.gymName}`} />
        ) : null}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC5_YmwrvVnI11fY_3WE3JynwbyWcrEdl4"
})(MainMap);
