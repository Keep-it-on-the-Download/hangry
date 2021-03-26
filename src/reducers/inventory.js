import data from '../data';

let BATCH_NUM = 10;

const ADD_TO_SELECTED = 'ADD_TO_SELECTED';
const ADD_TO_UNSELECTED = 'ADD_TO_UNSELECTED';

const FETCH_WORKERS_SUCCESS = 'FETCH_WORKERS_SUCCESS';
const FETCH_WORKERS_FAILURE = 'FETCH_WORKERS_FAILURE';

function fetchMoreWorkersSuccess(workers) {
  return {
    type: FETCH_WORKERS_SUCCESS,
    payload: { workers },
  };
}

export function fetchMoreWorkers(batch) {
  return (dispatch) => {
    fetch('/data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((data) => data.json())
      .then((workers) => {
        dispatch(
          fetchMoreWorkersSuccess(workers.slice(batch * 5, batch * 5 + 5))
        );
      })
      .catch((err) => console.error('ERROR FETCHING WORKERS', err));
  };
}

export function getWorker(dispatch, getState) {
  const { workers } = getState().inventory;

  if (workers.length === 5) dispatch(fetchMoreWorkers(BATCH_NUM++));

  return workers[0];
}

const INITIAL_STATE = {
  isFetching: false,
  workers: data.slice(0, 10),
  error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TO_SELECTED:
      return Object.assign(state, { workers: state.workers.slice(1) });

    case ADD_TO_UNSELECTED:
      return Object.assign(state, { workers: state.workers.slice(1) });

    case FETCH_WORKERS_SUCCESS:
      return Object.assign(state, {
        workers: [...state.workers, ...action.payload.workers],
      });

    default:
      return state;
  }
}
