const actionShowLoader = {
  type: 'show_loader'
};

const actionHideLoader = {
  type: 'hide_loader'
};

const reducer = (state = false, action) => {
  if (action.type === 'show_loader') {
    return {loading: true};
  }
  else if (action.type === 'hide_loader') {
    return {loading: false};
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

const store = createStore([reducer], {loading: false});

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
