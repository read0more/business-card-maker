import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { decode as jwtDecode } from "jsonwebtoken";
import {
  setLocalStorageJWT,
  getLoggedInUser,
  removeLoggedInUser,
} from "../utils";

class Firebase {
  database;
  loggedInUser;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    };

    firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.loggedInUser = getLoggedInUser();
  }

  async handleLogin(provider) {
    const result = await firebase.auth().signInWithPopup(provider);
    const idToken = await result.user.getIdToken();
    setLocalStorageJWT(idToken);
    this.loggedInUser = jwtDecode(idToken);
  }

  async loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.handleLogin(provider);
  }

  async loginGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    await this.handleLogin(provider);
  }

  async signOut() {
    await firebase.auth().signOut();
    removeLoggedInUser();
    this.loggedInUser = null;
  }

  getUserDatabaseRef() {
    return this.database.ref(`users/${this.loggedInUser.user_id}`);
  }

  getUserCardDatabaseRef(cardId) {
    return this.database.ref(`users/${this.loggedInUser.user_id}/${cardId}`);
  }
}

export default Firebase;
