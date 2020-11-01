import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import { StateContext } from '@/context';
import { getWeatherData } from '@/openweather/service';
import { weatherIconUrl } from '../../../app/variables';

const Sidebar = () => {
  const [searchButtonEnabled, setSearchButtonEnabled] = useState(true);
  const { state, actions } = useContext(StateContext);

  useEffect(() => {
    if (!state.userCoordinates.coords.latitude) return;

    setSearchButtonEnabled(true);
  }, [state.userCoordinates]);

  const searchCities = (e: any) => {
    e.preventDefault();

    if (!searchButtonEnabled) return;
    setSearchButtonEnabled(false);

    const { latitude, longitude } = state.userCoordinates.coords;
    getWeatherData(latitude, longitude, actions.setCities);
  };

  const searchButton = () => {
    return (
      <button
        className={[
          styles.searchButton,
          searchButtonEnabled ? '' : styles.buttonDisabled,
        ].join(' ')}
        onClick={(e) => searchCities(e)}
      >
        <img alt="Search for the closest cities" src="/logo.svg" />

        <p className={styles.text}>Search</p>
      </button>
    );
  };

  const getCityList = () => {
    const newCities = state.cities.map((v, i) => {
      let icon = '/03d.png';
      let description = '';

      if (v.weather.length) {
        icon = v.weather[0].icon;
        description = v.weather[0].description;
      }

      return (
        <li key={i}>
          <img
            src={weatherIconUrl(icon)}
            alt={description}
            className={styles.listIcon}
          />
          {v.name}
        </li>
      );
    });

    return <ul className={styles.list}>{newCities}</ul>;
  };

  const emptyCities = (): boolean => !state.cities || !state.cities.length;

  return (
    <div className={styles.container}>
      <div className={styles.searchButtonContainer}>{searchButton()}</div>

      <div
        className={[
          styles.searchResultContainer,
          emptyCities() ? styles.hideScrollbar : '',
        ].join(' ')}
      >
        {emptyCities() ? null : getCityList()}
      </div>
    </div>
  );
};

export default Sidebar;
