import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC9NEr4qvtnJN79a9mGjQ5Z7IQw068IEwg",
  authDomain: "open-mat.firebaseapp.com",
  databaseURL: "https://open-mat.firebaseio.com",
  projectId: "open-mat",
  storageBucket: "open-mat.appspot.com",
  messagingSenderId: "947123760574",
  appId: "1:947123760574:web:1094c7a3eeb780f5179def"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  //Commented until authentication works...
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // const userRef = firestore.doc('users/9HGkgUwVRtItcoF3jC8T');

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    console.log(snapShot.data());
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        tutorialCompleted: false,
        tutorialCurrentPage: 1,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () =>
  auth.signInWithPopup(provider).then(console.log("cooookies!"));

export default firebase;
