import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import { StateContext } from '@/context';

const Sidebar = () => {
  const [searchButtonEnabled, setSearchButtonEnabled] = useState(true);
  const { state, actions } = useContext(StateContext);

  useEffect(() => {
    if (!state.userCoordinates.coords.latitude) return;

    console.log('sidebar', state.userCoordinates.coords);
    setSearchButtonEnabled(true);
  }, [state]);

  const searchButton = () => {
    const handleSearch = (e: any) => {
      e.preventDefault();

      setSearchButtonEnabled(!searchButtonEnabled);
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
    </div>
  );
};

export default Sidebar;
