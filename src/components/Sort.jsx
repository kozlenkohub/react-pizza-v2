import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSort } from '../redux/slices/filterSlice';

const sortOptions = [
  { name: 'Rating', sort: 'rating' },
  { name: 'Price', sort: 'price' },
  { name: 'Alphabetic', sort: 'alphabetic' },
];

const Sort = ({ order, onClickOrder }) => {
  const dispatch = useDispatch();
  const activeSort = useSelector((state) => state.filters.activeSort);
  const [visiblePopup, setVisiblePopup] = React.useState(false);

  const sortRef = React.useRef(); // Corrected typo from softRef to sortRef

  const onClickSorted = (obj) => {
    dispatch(setActiveSort(obj));
    setVisiblePopup(false);
  };

  const toggleOrder = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    onClickOrder(newOrder); // Function from props to change the order
  };

  const handleClickOutside = (e) => {
    if (sortRef.current && !sortRef.current.contains(e.target)) {
      setVisiblePopup(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          onClick={toggleOrder}
          className={order === 'asc' ? '' : 'rotated'}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sorting by:</b>
        <span onClick={() => setVisiblePopup(!visiblePopup)}>{activeSort.name}</span>
      </div>

      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((obj, index) => (
              <li
                key={`${obj.name}_${index}`}
                onClick={() => onClickSorted(obj)}
                className={activeSort.sort === obj.sort ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
