import React from 'react';
import styles from './pin.module.css';

export const Pin = ({ lat, lng }) => {
  return (
    <div className={styles.pin}>
      <img src="/marker.svg" />
    </div>
  );
};
