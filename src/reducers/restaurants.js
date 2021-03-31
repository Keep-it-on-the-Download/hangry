import axios from 'axios';

import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

let BATCH_SIZE = 10;
let BATCH_NUM = 1;
let STORAGE = [];

const YELP_API_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.YELP_API_KEY
    : process.env.REACT_APP_YELP_API_KEY;

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

export function getInitialRestaurants(userId, partyId) {
  return async (dispatch) => {
    console.log('USERID --> ', userId);
    console.log('PARTYID --> ', partyId);

    const partyReference = firestore.collection('parties').doc(partyId);
    const memberReference = partyReference.collection('members').doc(userId);

    const partySnapshot = await partyReference.get();
    const memberSnapshot = await memberReference.get();

    const party = partySnapshot.data();
    const member = memberSnapshot.data();

    console.log('PARTY -->', party);

    if (member.pointer === party.sharedRestaurants.length) {
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
      const data = party.sharedRestaurants.slice(
        member.pointer,
        BATCH_SIZE * 2
      );
      dispatch(gotInitialRestaurants(data));
    }
  };
}

export function getMoreRestaurants(batch) {
  return async (dispatch) => {
    // Check Firestore for available shared workers
    // Query Yelp using shared parameters and correct offset
    // push next set of restaurants to FireStore
    console.log('OFFSET --> ', BATCH_SIZE * BATCH_NUM);
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

    // const currArr = partySnapshot.sharedRestaurants;

    // partySnapshot.update({
    //   sharedRestaurants: [...currArr, ...data.businesses],
    // });

    // dispatch(gotMoreRestaurants(data.businesses));

    // const data = partySnapshot.sharedRestaurants.slice(
    //   pointer + 1,
    //   pointer + BATCH_SIZE + 1
    // );
  };
}

export function getRestaurant(dispatch, getState) {
  const { inventory } = getState().restaurants;

  if (inventory.length <= 5) {
    dispatch(gotRestaurantsFromStorage());
    dispatch(getMoreRestaurants(BATCH_NUM++));
  }

  return inventory[0];
}

const INITIAL_STATE = {
  inventory: [],
  isLoading: false,
  error: null,
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

    default:
      return state;
  }
}
