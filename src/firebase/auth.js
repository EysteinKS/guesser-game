import { auth, firestore } from "./firebase"
import { Store } from "../store/Store"

//Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

//Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//Sign Out
export const doSignOut = () =>
  auth.signOut();

export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

export const getUser = () =>
  auth.currentUser;

export const getUserData = (uid) => {
  let user = firestore.collection("Users").doc(uid)
  user.get()
}

export const getUserName = () => {
  let user = firestore.collection("Users").doc(getUser().uid)
  user.get()
    .then((snapshot) => {
      //CREATE JAVASCRIPT OBJECT
      const data = snapshot.data()
      const username = data.username
      //QUERY OBJECT FOR USERNAME
      console.log("Auth Username = " + username)
      console.log("User Data Loaded")
      Store.set({ ["currentUsername"]: username, ["userDataLoaded"]: "true", ["userDataLoadingMessage"]: "User Data Loaded!"})
    })
    .catch((error) =>
      console.log("error =" + error))
}