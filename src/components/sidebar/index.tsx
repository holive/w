import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import { StateContext } from '@/context';
import { getWeatherData } from '@/openweather/service';

const Sidebar = () => {
  const [searchButtonEnabled, setSearchButtonEnabled] = useState(true);
  const { state, actions } = useContext(StateContext);

  useEffect(() => {
    if (!state.userCoordinates.coords.latitude) return;

    setSearchButtonEnabled(true);
  }, [state]);

  const searchButton = () => {
    const handleSearch = (e: any) => {
      e.preventDefault();

      setSearchButtonEnabled(!searchButtonEnabled);

      const { latitude, longitude } = state.userCoordinates.coords;
      getWeatherData(latitude, longitude);
    };

    return (
      <button
        className={[
          styles.searchButton,
          searchButtonEnabled ? '' : styles.buttonDisabled,
        ].join(' ')}
        onClick={(e) => handleSearch(e)}
        title="Search for the closest cities"
      >
        <img src="/logo.svg" />

        <p className={styles.text}>Search</p>
      </button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchButtonContainer}>{searchButton()}</div>

      <div className={styles.searchResultContainer}>
        <ul className={styles.list}>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/02n@2x.png"
              alt="clear sky"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
          <li>
            <img
              src="https://openweathermap.org/img/wn/10d@2x.png"
              alt="Niterói"
              className={styles.listIcon}
            />{' '}
            Niterói
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
