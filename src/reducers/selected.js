import { getWorker } from './inventory';

const ADD_TO_SELECTED = 'ADD_TO_SELECTED';

function addWorkerToSelected(worker) {
  return {
    type: ADD_TO_SELECTED,
    payload: { worker },
  };
}

export function selectWorker() {
  return (dispatch, getState) => {
    const worker = getWorker(dispatch, getState);
    dispatch(addWorkerToSelected(worker));
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_SELECTED:
      return [...state, action.payload.worker];

    default:
      return state;
  }
}
