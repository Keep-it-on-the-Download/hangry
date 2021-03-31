import { getRestaurant } from './restaurants';

const ADD_TO_UNSELECTED = 'ADD_TO_UNSELECTED';

function addRestaurantToUnselected(restaurant) {
  return {
    type: ADD_TO_UNSELECTED,
    restaurant,
  };
}

export function unselectRestaurant() {
  return (dispatch, getState) => {
    const restaurant = getRestaurant(dispatch, getState);
    dispatch(addRestaurantToUnselected(restaurant));
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_UNSELECTED:
      return [...state, action.restaurant];

    default:
      return state;
  }
}
