import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default function createActivePartiesForUsersInFirestore(partyId) {
  const partyMembersCollectionRef = firestore
    .collection('parties')
    .doc(partyId)
    .collection('members');

  partyMembersCollectionRef.get().then((querySnapshot) => {
    const user1 = querySnapshot.docs[0].id;
    const user2 = querySnapshot.docs[1].id;

    querySnapshot.forEach((doc) => {
      const userRef = firestore.collection('users').doc(doc.id);
      const activePartiesRef = userRef.collection('activeParties');

      if (userRef.id === user1) {
        activePartiesRef.doc(partyId).set({
          partyRef: `/parties/${partyId}`,
          title: `Feast with ${user2}`,
        });
      } else {
        activePartiesRef.doc(partyId).set({
          partyRef: `/parties/${partyId}`,
          title: `Feast with ${user1}`,
        });
      }
    });
  });
}
