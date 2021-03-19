import axios from 'axios';
import '../secrets';

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
            Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          },
          params: {
            location: 'NYC',
            categories: 'breakfast_brunch',
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
