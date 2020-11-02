import React, { useContext, useEffect, useState } from 'react';
import GoogleMap from 'google-map-react';
import { initGeolocation, userPosition } from '@/user';
import { Pin, SelectedCityPin, CityPin } from '@/components/pin';
import { StateContext } from '@/context';
import { initialState } from '@/context/state';
import styles from './index.module.css';

const Map = () => {
  const { state, actions } = useContext(StateContext);
  const { latitude, longitude } = state.userCoordinates.coords;
  const [center, _setCenter] = useState([latitude, longitude]);

  useEffect(() => {
    if (shouldDisplaySelectedCityPin()) {
      _setCenter([state.mapCenter[0], state.mapCenter[1]]);
    }
  }, [state.mapCenter]);

  const changePinLocation = (coords: { lat: number; lng: number }) => {
    actions.setUserCoordinates({ latitude: coords.lat, longitude: coords.lng });
  };

  const setInitialCenter = (userPosition: userPosition) => {
    if (!userPosition?.coords?.longitude) return;

    const { latitude, longitude } = userPosition.coords;

    _setCenter([latitude, longitude]);
    changePinLocation({ lat: latitude, lng: longitude });
  };

  const getUserLocation = () => window && initGeolocation(setInitialCenter);

  const shouldDisplaySelectedCityPin = (): boolean => {
    return (
      state.selectedCity.id !== 0 &&
      state.selectedCity.id !== undefined &&
      state.mapCenter?.length === 2
    );
  };

  const getCitiesPins = () => {
    return state.cities.map((c, i) => {
      return (
        <CityPin
          lat={c.coord.lat}
          lng={c.coord.lon}
          key={i}
          callback={() => actions.setSelectedCity(c.id)}
        />
      );
    });
  };

  return (
    <div className={styles.container}>
      <GoogleMap
        center={center}
        bootstrapURLKeys={{ key: process.env.MAPS_SECRET }}
        defaultCenter={{
          lat: initialState.userCoordinates.coords.latitude,
          lng: initialState.userCoordinates.coords.longitude,
        }}
        defaultZoom={12}
        onGoogleApiLoaded={() => getUserLocation()}
        onClick={changePinLocation}
        yesIWantToUseGoogleMapApiInternals
      >
        <Pin lat={latitude} lng={longitude} />

        {shouldDisplaySelectedCityPin() && (
          <SelectedCityPin lat={state.mapCenter[0]} lng={state.mapCenter[1]} />
        )}

        {state.cities && state.cities?.length && getCitiesPins()}
      </GoogleMap>
    </div>
  );
};

export default Map;
