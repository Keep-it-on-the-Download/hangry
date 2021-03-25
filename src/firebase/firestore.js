import firebase from './index';

import 'firebase/firestore';
import 'firebase/auth';

const firestore = firebase.firestore();
const auth = firebase.auth();

// check if user exists in firestore
async function checkUserExists(userRef) {
  // grab the user doc
  const userDoc = await userRef.get();
  // return true/false
  return userDoc.exists;
}

// add new user to FIRESTORE that have signed up using Google
export async function addGoogleUserToFirestore() {
  // using AUTH, grab the current logged in user
  const currentUser = auth.currentUser;
  // using FIRESTORE, grab currentUser's email address to use as reference
  const userRef = firestore.collection('users').doc(currentUser.email);
  // check if user exists as a doc in FIRESTORE
  const existingUser = await checkUserExists(userRef);

  if (!existingUser) {
    const { email, displayName, photoURL } = currentUser;
    // since user doc doesn't exist, set them up in FIRESTORE
    userRef
      .set({
        email,
        displayName,
        photoURL,
      })
      .then(() => {
        window.location.href = '/';
      });
  }
}

// same function as above but for users who create account with email/password
export async function addUserToFirestore(user) {
  const currentUser = auth.currentUser;
  // COLLECTION/DOCUMENT
  // USERS    /USER.EMAIL
  const userRef = firestore.collection('users').doc(currentUser.email);
  const existingUser = await checkUserExists(userRef);

  if (!existingUser) {
    const { email, firstName, lastName } = user;
    userRef
      .set({
        email,
        displayName: `${firstName} ${lastName}`,
      })
      .then(() => {
        window.location.href = '/';
      });
  }
}
