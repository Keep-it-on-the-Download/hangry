import { getRestaurant } from './restaurants';

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
    dispatch(addRestaurantToSelected(restaurant));
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
