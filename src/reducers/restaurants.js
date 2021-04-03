import axios from 'axios';

import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

const BATCH_SIZE = 10;
const LIMIT = 5;

let LOCAL_POINTER = 0;
let BATCH_NUM = 1;
let STORAGE = [];

const YELP_API_KEY =
  process.env.NODE_ENV === 'production'
    ? '6Lwcjhdx5TnC8ihWU5XGbb-APaK9Lnl1_ZLHujY_p3CrToR89CBnFztzU8I-rza_Eh35DKUHRPv7K3OWe1KztJvqg0xMyJmbGr0G8ECqLrvGIYi5Hn4SHiA4acBkYHYx'
    : process.env.REACT_APP_YELP_API_KEY;

const FOUND_MATCH = 'FOUND_MATCH';

const ADD_TO_SELECTED = 'ADD_TO_SELECTED';
const ADD_TO_UNSELECTED = 'ADD_TO_UNSELECTED';

const GOT_RESTAURANTS = 'GOT_RESTAURANTS';
const GOT_INITIAL_RESTAURANTS = 'GOT_INITIAL_RESTAURANTS';
const GOT_RESTAURANTS_FROM_STORAGE = 'GOT_RESTAURANTS_FROM_STORAGE';

function gotRestaurantsFromStorage() {
  return {
    type: GOT_RESTAURANTS_FROM_STORAGE,
  };
}

function gotInitialRestaurants(inventory) {
  return {
    type: GOT_INITIAL_RESTAURANTS,
    inventory,
  };
}

function gotMoreRestaurants(inventory) {
  return {
    type: GOT_RESTAURANTS,
    inventory,
  };
}

export function getInitialRestaurants(userId, partyRef) {
  return async (dispatch) => {
    const partyReference = firestore.doc(partyRef);
    const memberReference = partyReference.collection('members').doc(userId);

    const partySnapshot = await partyReference.get();
    const memberSnapshot = await memberReference.get();

    const party = partySnapshot.data();
    const member = memberSnapshot.data();

    LOCAL_POINTER = member.pointer;

    if (LOCAL_POINTER === party.sharedRestaurants.length) {
      const { data } = await axios.get(
        `${'https://cors.bridged.cc/'}https://api.yelp.com/v3/businesses/search`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
          params: {
            limit: BATCH_SIZE * 2,
            latitude: 40.73108511040957,
            longitude: -73.98939547296847,
            categories: 'food',
            // location: partySnapshot.location
          },
        }
      );

      partyReference.update({ sharedRestaurants: data.businesses });

      dispatch(gotInitialRestaurants(data.businesses));
    } else {
      const data = party.sharedRestaurants.slice(LOCAL_POINTER, BATCH_SIZE * 2);
      dispatch(gotInitialRestaurants(data));
    }
  };
}

export function getMoreRestaurants(partyRef) {
  return async (dispatch) => {
    const partyReference = firestore.doc(partyRef);
    const partySnapshot = await partyReference.get();
    const partyData = partySnapshot.data();

    const sharedRestaurants = partyData.sharedRestaurants;

    const limitIndex = sharedRestaurants.length - BATCH_SIZE - LIMIT - 1;

    if (LOCAL_POINTER >= limitIndex) {
      const { data } = await axios.get(
        `${'https://cors.bridged.cc/'}https://api.yelp.com/v3/businesses/search`,
        {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
          params: {
            limit: BATCH_SIZE,
            offset: BATCH_SIZE * BATCH_NUM,
            latitude: 40.73108511040957,
            longitude: -73.98939547296847,
            categories: 'food',
          },
        }
      );
      partyReference.update({
        sharedRestaurants: [...sharedRestaurants, ...data.businesses],
      });
      dispatch(gotMoreRestaurants(data.businesses));
    } else {
      const data = sharedRestaurants.slice(
        LOCAL_POINTER,
        LOCAL_POINTER + BATCH_SIZE + 1
      );
      dispatch(gotMoreRestaurants(data));
    }
  };
}

export function getRestaurant(dispatch, getState) {
  const { inventory } = getState().restaurants;
  const { activeParty } = getState().user;

  LOCAL_POINTER++;

  if (inventory.length <= LIMIT) {
    BATCH_NUM++;
    dispatch(gotRestaurantsFromStorage());
    dispatch(getMoreRestaurants(activeParty));
  }

  return inventory[0];
}

export function syncPointer(userId, partyRef) {
  return async (dispatch) => {
    const partyReference = firestore.doc(partyRef);
    const memberReference = partyReference.collection('members').doc(userId);

    memberReference.update({ pointer: LOCAL_POINTER });
  };
}

const INITIAL_STATE = {
  inventory: [],
  isLoading: false,
  foundMatch: false,
  matchedRestaurant: {},
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_SELECTED:
      return { ...state, inventory: state.inventory.slice(1) };

    case ADD_TO_UNSELECTED:
      return { ...state, inventory: state.inventory.slice(1) };

    case GOT_INITIAL_RESTAURANTS:
      const midpoint = Math.floor(action.inventory.length / 2);
      STORAGE = action.inventory.slice(midpoint, action.inventory.length);
      return {
        ...state,
        inventory: [...action.inventory.slice(0, midpoint)],
      };

    case GOT_RESTAURANTS_FROM_STORAGE:
      return {
        ...state,
        inventory: [...state.inventory, ...STORAGE],
      };

    case GOT_RESTAURANTS:
      STORAGE = [...action.inventory];
      return state;

    case FOUND_MATCH:
      return {
        ...state,
        foundMatch: true,
        matchedRestaurant: action.restaurant,
      };

    default:
      return state;
  }
}
