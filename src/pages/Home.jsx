import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import NotFound from './NotFound';
import Pagination from '../components/Pagination';
import useFetchPizzas from '../hooks/useFetchPizzas';
import { setCurrentPage } from '../redux/slices/filterSlice';

const Home = ({ searchValue }) => {
  const { activeSort, activeCategory, currentPage } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch pizza data using the custom hook
  const { items, isLoaded, pageCount } = useFetchPizzas(
    activeCategory,
    activeSort,
    sortOrder,
    searchValue,
    currentPage,
  );

  const handleOrderChange = (order) => {
    setSortOrder(order);
  };

  const handlePageChange = (selectedPage) => {
    dispatch(setCurrentPage(selectedPage)); // Dispatch the new page value to Redux
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort order={sortOrder} onClickOrder={handleOrderChange} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {!isLoaded ? (
          Array(6)
            .fill(0)
            .map((_, index) => <Skeleton key={index} />)
        ) : items.length > 0 ? (
          items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        ) : (
          <NotFound />
        )}
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
