import { getRestaurant } from './restaurants';

import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

const ADD_TO_SELECTED = 'ADD_TO_SELECTED';

function addRestaurantToSelected(restaurant) {
  return {
    type: ADD_TO_SELECTED,
    restaurant,
  };
}

// TODO: Make push to Firestore
export function selectRestaurant() {
  return (dispatch, getState) => {
    const restaurant = getRestaurant(dispatch, getState);
    dispatch(checkForMatches(restaurant, dispatch, getState));
    dispatch(addRestaurantToSelected(restaurant));
  };
}

function checkForMatches(restaurant) {
  return async (dispatch, getState) => {
    const { data } = getState().user;
    const partyReference = firestore
      .collection('parties')
      .doc('uFrHg1yH7LplEDh1SkzF');
    const partySnapshot = await partyReference.get();
    const party = partySnapshot.data();

    if (party.liked.includes(restaurant.id)) {
      console.log('YOU MATCHED!!!');
    } else {
      partyReference.update({ liked: [...party.liked, restaurant.id] });
    }
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_SELECTED:
      return [...state, action.restaurant];

    default:
      return state;
  }
}
