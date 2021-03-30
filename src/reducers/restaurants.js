import axios from 'axios';

let BATCH_SIZE = 10;
let BATCH_NUM = 1;
let STORAGE = [];

const ADD_TO_SELECTED = 'ADD_TO_SELECTED';
const ADD_TO_UNSELECTED = 'ADD_TO_UNSELECTED';

const GOT_RESTAURANTS = 'GOT_RESTAURANTS';
const GOT_INITIAL_RESTAURANTS = 'GOT_INITIAL_RESTAURANTS';
const GOT_RESTAURANTS_FROM_STORAGE = 'GOT_RESTAURANTS_FROM_STORAGE';

function gotRestaurantsFromSotrage() {
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

export function getInitialRestaurants() {
  // Get double restaurant batch assign first half to inventory
  // assign second half to storage
  return async (dispatch) => {
    // Check Firestore for available shared workers
    // Query Yelp using shared parameters and correct offset
    // push next set of restaurants to FireStore
    const { data } = await axios.get(
      `${'https://cors.bridged.cc/'}https://api.yelp.com/v3/businesses/search`,
      {
        headers: {
          Authorization: `Bearer ${'X4WiSe_RRFmQewagsdvv74hIJ_10rCbnsXzgreokPG3WIYEJ2sNmgtYAFVI44lKI1MEhAHv6CcljzhsHh5mEZB8gSrHm1mBCuyJ0okP_iq08TQCx8c60BOVgTwFVYHYx'}`,
        },
        params: {
          limit: BATCH_SIZE * 2,
          latitude: 40.73108511040957,
          longitude: -73.98939547296847,
          categories: 'food',
        },
      }
    );
    dispatch(gotInitialRestaurants(data.businesses));
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
          Authorization: `Bearer ${'X4WiSe_RRFmQewagsdvv74hIJ_10rCbnsXzgreokPG3WIYEJ2sNmgtYAFVI44lKI1MEhAHv6CcljzhsHh5mEZB8gSrHm1mBCuyJ0okP_iq08TQCx8c60BOVgTwFVYHYx'}`,
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
    dispatch(gotMoreRestaurants(data.businesses));
  };
}

export function getRestaurant(dispatch, getState) {
  const { inventory } = getState().restaurants;

  if (inventory.length <= 5) {
    dispatch(gotRestaurantsFromSotrage());
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
