import { auth, firestore } from "./firebase"
import { Store, UserStore } from "../store/Store"

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

export const getUserData = () => {
  console.log("Getting user data")
  let user = firestore.collection("Users").doc(getUser().uid)
  user.get()
    .then((snapshot) => {
      const data = snapshot.data()
      UserStore.set({ ["Username"]: data.username, ["Permission"]: data.permission, ["userDataLoaded"]: "true", })
      console.log("User data stored")
    })
    .catch((error) => 
      console.log("error = ", error))
}