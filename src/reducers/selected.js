import { getRestaurant } from './restaurants';

import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

const FOUND_MATCH = 'FOUND_MATCH';
const ADD_TO_SELECTED = 'ADD_TO_SELECTED';

function addRestaurantToSelected(restaurant) {
  return {
    type: ADD_TO_SELECTED,
    restaurant,
  };
}

function foundMatch(restaurant) {
  return {
    type: FOUND_MATCH,
    restaurant,
  };
}

export function selectRestaurant() {
  return (dispatch, getState) => {
    const restaurant = getRestaurant(dispatch, getState);
    dispatch(checkForMatches(restaurant, dispatch, getState));
    dispatch(addRestaurantToSelected(restaurant));
  };
}

function checkForMatches(restaurant) {
  return async (dispatch, getState) => {
    const { activeParty } = getState().user;
    const partyReference = firestore.doc(activeParty);
    const partySnapshot = await partyReference.get();
    const party = partySnapshot.data();

    if (party.liked.includes(restaurant.id)) {
      dispatch(foundMatch(restaurant));
      partyReference.update({
        matchedRestaurant: restaurant,
        foundMatch: true,
      });
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
