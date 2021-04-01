import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

export default function createActivePartiesForUsersInFirestore(partyId) {
  const partyMembersCollectionRef = firestore
    .collection('parties')
    .doc(partyId)
    .collection('members');

  partyMembersCollectionRef.get().then((querySnapshot) => {
    console.log('querysnapshot.docs. ', querySnapshot.docs);
    const user1 = querySnapshot.docs[0].id;
    const user2 = querySnapshot.docs[1].id;

    console.log('USER 1:::::::', user1);
    console.log('USER 2::::::', user2);

    querySnapshot.forEach((doc) => {
      const userRef = firestore.collection('users').doc(doc.id);

      console.log('THIS IS USER REF ID::::', userRef.id);
      console.log('DOCC::::', doc);
      const activePartiesRef = userRef.collection('activeParties');
      activePartiesRef
        .doc(`Eat with ${userRef.id}`)
        .set({
          partyRef: `/parties/${partyId}`,
        })
        .then(console.log('DOC DATA ,', doc.data()));
    });
  });
}
