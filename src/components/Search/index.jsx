import React, { useState, useContext, useRef, useCallback } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { DeleteIcon, Search as SearchIcon } from 'lucide-react';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = useState('');
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef(null);
  const testRef = useRef(null);

  const debouncedSearch = useCallback(
    debounce((inputValue) => {
      setSearchValue(inputValue);
    }, 500),
    [],
  );

  const onChangeInput = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    debouncedSearch(inputValue);
  };

  const clearSearch = () => {
    setValue('');
    setSearchValue('');
    inputRef.current.focus();
  };

  return (
    <div ref={testRef} className={styles.root}>
      <SearchIcon size="24" color="gray" />
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Search Pizza"
        value={value}
        onChange={onChangeInput}
      />
      {searchValue && <DeleteIcon size="24" color="gray" onClick={clearSearch} />}
    </div>
  );
};

export default Search;
