import axios from 'axios';

// if (process.env.NODE_ENV !== 'production') {
//   import '../secrets';
// }

const GOT_RESTAURANTS = 'GOT_RESTAURANTS';

const gotRestaurants = (restaurants) => ({
  type: GOT_RESTAURANTS,
  restaurants,
});

export const getRestaurants = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search`,
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
      console.log('RESTAURANTS IN THUNK', data);
      dispatch(gotRestaurants(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = { data: [], isLoading: true };

const restaurants = (state = initialState, action) => {
  switch (action.type) {
    case GOT_RESTAURANTS:
      return { ...state, data: action.restaurants, isLoading: false };
    default:
      return state;
  }
};

export default restaurants;
