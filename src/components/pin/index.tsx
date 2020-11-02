import React from 'react';
import styles from './pin.module.css';

export const Pin = ({ lat, lng }) => {
  return (
    <div className={styles.pin}>
      <img src="/marker.svg" />
    </div>
  );
};

export const SelectedCityPin = ({ lat, lng }) => {
  return <div className={styles.selectedCityPin} />;
};

export const CityPin = ({ lat, lng, callback }) => {
  return <div className={styles.cityPin} onClick={() => callback()} />;
};
