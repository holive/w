import React from 'react';
import Map from '../map';
import Sidebar from '@/components/sidebar';
import styles from './index.module.css';
import { AppContext } from '@/context';

const App = () => {
  return (
    <AppContext>
      <div className={styles.container}>
        <Sidebar />
        <Map />
      </div>
    </AppContext>
  );
};

export default App;
