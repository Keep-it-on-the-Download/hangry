import axios from 'axios';

let BATCH_NUM = 1;

const ADD_TO_SELECTED = 'ADD_TO_SELECTED';
const ADD_TO_UNSELECTED = 'ADD_TO_UNSELECTED';

const FETCH_RESTAURANTS_SUCCESS = 'FETCH_RESTAURANTS_SUCCESS';
// const FETCH_WORKERS_FAILURE = 'FETCH_WORKERS_FAILURE';

function getMoreRestaurantsSuccess(inventory) {
  return {
    type: FETCH_RESTAURANTS_SUCCESS,
    inventory,
  };
}

export function getMoreRestaurants(batch) {
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
          latitude: 40.73108511040957,
          longitude: -73.98939547296847,
          categories: 'food',
        },
      }
    );
    dispatch(getMoreRestaurantsSuccess(data.businesses));
  };
}

export function getRestaurant(dispatch, getState) {
  const { inventory } = getState().restaurants;

  if (inventory.length === 5) dispatch(getMoreRestaurants(BATCH_NUM++));

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

    case FETCH_RESTAURANTS_SUCCESS:
      return {
        ...state,
        inventory: [...state.inventory, ...action.inventory],
      };

    default:
      return state;
  }
}
