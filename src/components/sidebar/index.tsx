import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import stylesCityDetails from './cityDetails.module.css';
import { StateContext } from '@/context';
import { getWeatherData } from '@/openweather/service';
import { weatherIconUrl } from '../../../app/variables';
import { City } from '@/openweather';

const Sidebar = () => {
  const [searchButtonEnabled, setSearchButtonEnabled] = useState(true);
  const [detailActive, setDetailActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { state, actions } = useContext(StateContext);

  useEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  useEffect(() => {
    if (state.cities === undefined) setSearchButtonEnabled(true);
  }, [state.cities]);

  useEffect(() => {
    if (state.selectedCity.id !== 0 && state.selectedCity.id !== undefined) {
      selectCity(getCurrentCity());
    }
  }, [state.selectedCity]);

  useEffect(() => {
    if (!state.userCoordinates.coords.latitude) return;

    setSearchButtonEnabled(true);
  }, [state.userCoordinates]);

  const searchCities = (e: any) => {
    e.preventDefault();

    if (!searchButtonEnabled) return;
    setSearchButtonEnabled(false);
    setDetailActive(false);

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

  const getIconAndDescription = (
    v: City,
  ): { icon: string; description: string } => {
    let icon = '/03d.png';
    let description = '';

    if (v.weather.length) {
      icon = v.weather[0].icon;
      description = v.weather[0].description;
    }

    return { icon, description };
  };

  const selectCity = (city: City) => {
    setDetailActive(true);

    const newState = { ...state };
    newState.selectedCity.id = city.id;
    newState.mapCenter = [city.coord.lat, city.coord.lon];

    actions.setAllState(newState);
  };

  const getCityList = () => {
    const newCities = state.cities?.map((v, i) => {
      const { icon, description } = getIconAndDescription(v);

      return (
        <li key={i} onClick={() => selectCity(v)}>
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

  const getCurrentCity = (): City => {
    return state.cities?.find((el) => el.id === state.selectedCity.id);
  };

  const cityDetails = () => {
    const back = (e: any) => {
      e.preventDefault();

      setDetailActive(false);
      actions.setSelectedCity(0);
    };

    const width = detailActive
      ? 0
      : document.querySelector('.' + styles.container)?.getBoundingClientRect()
          .width;

    const currentCity = getCurrentCity();
    if (!currentCity) return null;

    const { icon, description } = getIconAndDescription(currentCity);

    return (
      <div
        className={stylesCityDetails.cityDetails}
        style={{ transform: `translate(-${width}px, 0)` }}
      >
        <div className={stylesCityDetails.container}>
          <h3 className={stylesCityDetails.cityName}>{currentCity.name}</h3>

          <div className={stylesCityDetails.titleContainer}>
            <img
              src={weatherIconUrl(icon)}
              alt={description}
              className={stylesCityDetails.listIcon}
            />
            <p>{description}</p>
          </div>

          <div className={stylesCityDetails.temp}>
            <span>min</span> {currentCity.main.temp_min}°
          </div>
          <div className={stylesCityDetails.temp}>
            <span>max</span> {currentCity.main.temp_max}°
          </div>

          <button className={stylesCityDetails.back} onClick={(e) => back(e)}>
            &#xab; back
          </button>

          <button className={stylesCityDetails.backM} onClick={(e) => back(e)}>
            x
          </button>
        </div>
      </div>
    );
  };

  const emptyCities = (): boolean => !state.cities || !state.cities.length;

  const shouldHideScrollbar = (): boolean => emptyCities() || detailActive;

  return (
    <div
      className={[
        styles.container,
        emptyCities() ? styles.emptyListMobile : '',
      ].join(' ')}
    >
      <div className={styles.searchButtonContainer}>{searchButton()}</div>

      <div
        className={[
          styles.searchResultContainer,
          shouldHideScrollbar() ? styles.hideScrollbar : '',
        ].join(' ')}
      >
        {emptyCities() ? null : getCityList()}

        {isClient && cityDetails()}
      </div>
    </div>
  );
};

export default Sidebar;
