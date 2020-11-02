import React from 'react';
import styles from './pin.module.css';
import pinStyles from '@/components/pin/pin.module.css';
import { max768 } from '../../../lib/max768';

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
  let dCallback = callback;
  let mCallback = (e: any) => {};

  if (max768()) {
    dCallback = () => {};
    mCallback = (e: any) => {
      e.preventDefault();
      callback();
    };
  }

  return (
    <div
      className={styles.cityPin}
      onClick={() => dCallback()}
      onTouchEnd={(e) => mCallback(e)}
    />
  );
};

export const preventChangeUserPinLocation = (coords: OnClickMapProps) => {
  return max768() && coords?.event?.target?.className === pinStyles.cityPin;
};

export interface OnClickMapProps {
  lat: number;
  lng: number;
  event?: any;
}
