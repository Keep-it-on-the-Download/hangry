// Action Types
const GOT_DISTANCE = 'GOT_DISTANCE';

// Action Creators
const gotDistance = (distance) => ({
  type: GOT_DISTANCE,
  distance,
});

export const getDistance = (destination) => {
  return async (dispatch, getState) => {
    const position = await getPosition();

    const { longitude, latitude } = position.coords;
    const r = 6371;
    const p = Math.PI / 180;
    const a =
      0.5 -
      Math.cos((destination.latitude - latitude) * p) / 2 +
      Math.cos(latitude * p) *
        Math.cos(destination.latitude * p) *
        ((1 - Math.cos((destination.longitude - longitude) * p)) / 2);
    let distance = 2 * r * Math.asin(Math.sqrt(a));

    distance *= 0.6213712;
    distance = distance.toFixed(2);

    if (distance !== getState().location.distance) {
      dispatch(gotDistance(distance));
    }
  };
};

const getPosition = () => {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });
};

// Initial State and Reducer
const initialState = { currentPos: 0, distance: 0, isLoading: true };

const parties = (state = initialState, action) => {
  switch (action.type) {
    case GOT_DISTANCE:
      return { ...state, distance: action.distance, isLoading: false };

    default:
      return state;
  }
};

export default parties;
