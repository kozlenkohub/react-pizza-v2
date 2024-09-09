import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import NotFound from './NotFound';
import Pagination from '../components/Pagination';
import { setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = ({ searchValue }) => {
  const { activeSort, activeCategory, currentPage } = useSelector((state) => state.filters);
  const { items, isLoaded, pageCount } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    console.log('Fetching pizzas with:', {
      activeCategory,
      activeSort,
      sortOrder,
      searchValue,
      currentPage,
    });
    dispatch(fetchPizzas({ activeCategory, activeSort, sortOrder, searchValue, currentPage }));
  }, [activeCategory, activeSort, sortOrder, searchValue, currentPage, dispatch]);

  const handleOrderChange = (order) => {
    setSortOrder(order);
  };

  const handlePageChange = (selectedPage) => {
    dispatch(setCurrentPage(selectedPage));
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
        ) : items.length === 0 ? (
          <NotFound />
        ) : (
          items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
        )}
      </div>
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
