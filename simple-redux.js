/* names in const */
const SHOW_LOADER = 'SHOW_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';

/* Action Object */
const actionShowLoader = {
  type: SHOW_LOADER
};

/* Action Object */
const actionHideLoader = {
  type: HIDE_LOADER
};

/* Reducer - simple pure function */
const loader = (state = {}, action) => {
  if (action.type === SHOW_LOADER) {
    const loading = {loading: true};
    return {...state, ...loading} ;
  }
  else if (action.type === HIDE_LOADER) {
    const loading = {loading: false};
    return {...state, ...loading} ;
  }
  else {
    return state;
  }
};

const createStore = (reducers, initialStore) => {
  let store = initialStore;

  const listeners = [];

  const getState = () => store;

  const dispatch = action => {
    store = reducers.reduce((accum, item) => {
      accum = item(store, action);
      return accum;
    }, store);

    listeners.forEach(listener => listener(store));
  };

  const subscribe = listener => {
    listeners.push(listener);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

const initialState = {};
const store = createStore([loader], initialState);

const toggleLoader = () => {
  const [loaderEl] = document.getElementsByClassName('loader-wrapper');

  return ({loading}) => {
    console.error('loading', loading);
    loaderEl.classList.toggle('hide');
  }
};

store.subscribe(toggleLoader());

const showLoader = () => store.dispatch(actionShowLoader);
const hideLoader = () => store.dispatch(actionHideLoader);
