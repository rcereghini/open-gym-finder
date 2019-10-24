import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header/Header";
import MainMap from "./components/MainMap/MainMap";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";

import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import logo from "./logo.svg";
import "./App.css";
import UserDashboard from "./components/UserDashboard/UserDashboard";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Shojumaru&display=swap"
          rel="stylesheet"
        ></link>
        {this.props.currentUser ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "3px solid gold"
            }}
          >
            <Header currentUser={this.props.currentUser} />

            <p
              style={{ fontSize: "24px", color: "white" }}
              onClick={() => auth.signOut()}
            >
              {this.props.currentUser ? "Logout" : ""}
            </p>
          </div>
        ) : (
          <div></div>
        )}

        <Switch>
          <Route
            exact
            path="/signin"
            // component={SignIn}
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignIn />
            }
            //
          />
          <Route
            exact
            path="/user"
            render={() =>
              this.props.currentUser ? <UserDashboard /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/roam"
            render={() =>
              this.props.currentUser ? <MainMap /> : <Redirect to="/" />
            }
          />
          {/* component={MainMap}  */}
          <Route
            exact
            path="/"
            render={() => (this.props.currentUser ? <MainMap /> : <SignIn />)}
          />

          <Route
            exact
            path="/signup"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignUp />
            }
          />
        </Switch>
        {/* <MainMap />  */}
        {this.props.currentUser ? <BottomNavigation /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
