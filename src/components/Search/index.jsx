import React, { useState } from 'react';
import styles from './Search.module.scss';
import { DeleteIcon, Search as SearchIcon } from 'lucide-react';

const Search = ({ setSearchValue, searchValue }) => {
  return (
    <div className={styles.root}>
      <SearchIcon size="24" color="gray" />
      <input
        className={styles.input}
        placeholder="Search Pizza"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      {searchValue && <DeleteIcon size="24" color="gray" onClick={() => setSearchValue('')} />}
    </div>
  );
};

export default Search;
