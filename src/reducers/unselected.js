import { getWorker } from './inventory';

const ADD_TO_UNSELECTED = 'ADD_TO_UNSELECTED';

function addWorkerToUnselected(worker) {
  return {
    type: ADD_TO_UNSELECTED,
    payload: { worker },
  };
}

export function unselectWorker() {
  return (dispatch, getState) => {
    const worker = getWorker(dispatch, getState);
    dispatch(addWorkerToUnselected(worker));
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_UNSELECTED:
      return [...state, action.payload.worker];

    default:
      return state;
  }
}
