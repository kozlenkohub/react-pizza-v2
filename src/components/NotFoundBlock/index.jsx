import React from 'react';
import styles from './NotFoundBlock.module.scss';
import { Link } from 'react-router-dom';

const index = () => {
  // create notfound page with emoji
  return (
    <div className={styles.root}>
      <div className={styles.emoji}>😢</div>
      <div className={styles.title}>Page not found</div>
      <div className={styles.text}>Sorry, we can't find the page you're looking for</div>
    </div>
  );
};

export default index;
