import React from 'react';
import styles from './NotFoundBlock.module.scss';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../App';
import { StepBackIcon } from 'lucide-react';

const NotFoundBlock = () => {
  const { setSearchValue } = React.useContext(SearchContext);
  // create notfound page with emoji
  return (
    <div className={styles.root}>
      <div className={styles.emoji}>😢</div>
      <div className={styles.title}>Page not found</div>
      <div className={styles.text}>Sorry, we can't find the page you're looking for</div>
      <Link to="/" className={styles.link} onClick={() => setSearchValue('')}>
        <StepBackIcon size="24" color="gray" />
        Go back to home
      </Link>
    </div>
  );
};

export default NotFoundBlock;
