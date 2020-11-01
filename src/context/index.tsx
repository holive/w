import React, { useState } from 'react';
import State, { initialState } from './state';

export const StateContext = React.createContext({
  state: initialState,
  actions: {
    setUserCoordinates: (_data: { longitude: number; latitude: number }) => {},
  },
});

export const AppContext = (props: { children: React.ReactNode }) => {
  const [state, _setState] = useState(initialState);

  const setState = (_state: State) => {
    const newState = { ...state, ..._state };
    _setState(newState);
  };

  const actions = {
    setUserCoordinates: setUserCoordinates.bind(null, state, setState),
  };

  return (
    <StateContext.Provider value={{ state, actions }}>
      {props.children}
    </StateContext.Provider>
  );
};

const setUserCoordinates = (
  _state: State,
  setState: Function,
  coords: { longitude: number; latitude: number },
) => {
  setState({ userCoordinates: { coords } });
};
