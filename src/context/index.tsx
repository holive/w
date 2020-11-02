import React, { useState } from 'react';
import State, { initialState } from './state';
import { City } from '@/openweather';

export const StateContext = React.createContext({
  state: initialState,
  actions: {
    setUserCoordinates: (_data: { longitude: number; latitude: number }) => {},
    setCities: (_cities: Array<City>) => {},
    setSelectedCity: (_id: number) => {},
    setMapCenter: (_coords: Array<number>) => {},
    setAllState: (_state: State) => {},
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
    setCities: setCities.bind(null, state, setState),
    setSelectedCity: setSelectedCity.bind(null, state, setState),
    setMapCenter: setMapCenter.bind(null, state, setState),
    setAllState: setAllState.bind(null, state, setState),
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

const setCities = (_state: State, setState: Function, cities: Array<City>) => {
  setState({ cities });
};

const setSelectedCity = (_state: State, setState: Function, id: number) => {
  setState({ selectedCity: { id } });
};

const setMapCenter = (
  _state: State,
  setState: Function,
  coords: Array<number>,
) => {
  setState({ mapCenter: coords });
};

const setAllState = (_state: State, setState: Function, newState: State) => {
  setState(newState);
};
