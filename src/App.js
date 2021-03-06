import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./components/Header/Header";
import MainMap from "./components/MainMap/MainMap";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import GymPage from "./components/GymPage/GymPage";
import GymEventList from "./components/GymEventList/GymEventList";
import Modal from "./components/Modal/Modal";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BottomNavigation from "./components/BottomNavigation/BottomNavigation";
import "./App.css";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Achievements from "./components/Achievements/Achievements";
import Schedule from "./components/Schedule/Schedule";
import Settings from "./components/Settings/Settings";
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  unsubscribeFromAuth = null;
  constructor() {
    super();

    this.state = {
      menuModalVisible: false,
      mailModalVisible: false,
      isModalActive: true,
      alertText:
        "Please view this application on mobile display using dev tools, as this is being developed with a mobile first approach. Styling is a work in progress."
    };
  }

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

      console.log("userAuth ===>", userAuth);
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log("this.props.currentUser ===>", this.props.currentUser);
    return (
      <div className="App">
        <link
          href="https://fonts.googleapis.com/css?family=Shojumaru&display=swap"
          rel="stylesheet"
        ></link>
        {this.props.currentUser ? (
          <div
            className="header-wrap"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr 1fr",
              borderBottom: "3px solid gold"
            }}
          >
            {this.state.menuModalVisible ? (
              <div className="menu-modal-wrap">
                <div
                  className="menu-modal"
                  style={{
                    position: "fixed",
                    top: "25vh",
                    left: "10vw",
                    height: "50vh",
                    width: "80vw",
                    border: "3px solid gold",
                    zIndex: 10
                  }}
                >
                  <Link
                    to={"/settings"}
                    onClick={() => this.setState({ menuModalVisible: false })}
                  >
                    <p>Settings</p>
                  </Link>
                  <p onClick={() => auth.signOut()}>Logout</p>
                </div>
              </div>
            ) : null}

            {this.state.mailModalVisible ? (
              <div className="mail-modal-wrap">
                <div
                  className="mail-modal"
                  style={{
                    position: "fixed",
                    top: "15vh",
                    left: "5vw",
                    height: "70vh",
                    width: "90vw",
                    border: "3px solid gold",
                    zIndex: 10
                  }}
                >
                  <p>Messages</p>
                  <hr></hr>
                  <p>None</p>
                </div>
              </div>
            ) : null}

            <Header currentUser={this.props.currentUser} />

            <div
              style={{
                fontSize: "16px",
                color: "white",
                justifySelf: "flex-end",
                alignSelf: "center"
              }}
              onClick={() =>
                this.setState({
                  mailModalVisible: !this.state.mailModalVisible
                })
              }
            >
              {this.props.currentUser ? (
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="bars-icon-styles"
                ></FontAwesomeIcon>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "white",
                justifySelf: "flex-end",
                alignSelf: "center"
              }}
              onClick={() =>
                this.setState({
                  menuModalVisible: !this.state.menuModalVisible
                })
              }
            >
              {this.props.currentUser ? (
                <FontAwesomeIcon
                  icon={faBars}
                  className="bars-icon-styles"
                ></FontAwesomeIcon>
              ) : (
                ""
              )}
            </div>
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
              this.props.currentUser ? (
                <UserDashboard currentUser={this.props.currentUser} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/achievements"
            render={() =>
              this.props.currentUser ? <Achievements /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/schedule"
            render={() =>
              this.props.currentUser ? (
                <Schedule currentUser={this.props.currentUser} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/settings"
            render={() =>
              this.props.currentUser ? <Settings /> : <Redirect to="/" />
            }
          />
          <Route
            exact
            path="/user/gym"
            render={() =>
              this.props.currentUser ? (
                <GymPage currentUser={this.props.currentUser} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/roam"
            render={() =>
              this.props.currentUser ? (
                <MainMap
                  currentUser={this.props.currentUser}
                  userId={this.props.currentUser.id}
                  schedule={this.props.currentUser.schedule}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/roam/:gym"
            render={params =>
              this.props.currentUser ? (
                <GymEventList
                  match={params.match}
                  //   currentUser={this.props.currentUser}
                  //   userId={this.props.currentUser.id}
                  //   schedule={this.props.currentUser.schedule}
                />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          {/* component={MainMap}  */}
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? (
                <MainMap
                  currentUser={this.props.currentUser}
                  userId={this.props.currentUser.id}
                  schedule={this.props.currentUser.schedule}
                />
              ) : (
                <SignIn />
              )
            }
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
