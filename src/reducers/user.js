import firebase from '../Firebase';
import 'firebase/firestore';

const db = firebase.firestore();

const GOT_USER = 'GOT_USER';

const gotUser = (user) => ({
  type: GOT_USER,
  user,
});

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const userRef = db.collection('users').doc(id);
      const doc = await userRef.get();
      dispatch(gotUser(doc.data()));
    } catch (err) {
      console.log('Error getting document:', err);
    }
  };
};

const initialState = { data: {}, isLoading: true };

const user = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state, data: action.user, isLoading: false };
    default:
      return state;
  }
};

export default user;

/*

const db = firebase.firestore();
    const alanFriendsRef = db
      .collection('users')
      .doc('abielik')
      .collection('friends');

    console.log(('ALANSFRIENDSREF', alanFriendsRef));

    alanFriendsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());

        const friendRef = db.doc(doc.data().ref.path);
        console.log('FriendRef', friendRef);

        friendRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      });
    });

*/
