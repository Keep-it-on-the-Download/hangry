import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default function createActivePartiesForUsersInFirestore(partyId) {
  const partyMembersRef = firestore
    .collection('parties')
    .doc(partyId)
    .collection('members');

  partyMembersRef
    .where('ref', '!=', false)
    .get()
    .then((querySnapshot) => {
      console.log('querysnapshot.docs.length: ', querySnapshot.docs.length);
      querySnapshot.forEach((doc) => {
        const userRef = firestore.collection('users').doc(doc.id);
        const activePartiesRef = userRef.collection('activeParties');
        activePartiesRef
          .add({
            partyRef: `/parties/${partyId}`,
          })
          .then(console.log('DOC DATA ,', doc.data()));
      });
    });
}
