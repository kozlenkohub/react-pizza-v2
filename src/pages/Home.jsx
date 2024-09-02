import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import NotFound from './NotFound';
import Pagination from '../components/Pagination';
import useFetchPizzas from '../hooks/useFetchPizzas';
import { setCurrentPage } from '../redux/slices/filterSlice'; // Импорт экшена

const Home = ({ searchValue }) => {
  const { activeSort, activeCategory, currentPage } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const [sortOrder, setSortOrder] = useState('asc');

  // Используем хук для получения данных пицц
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
    dispatch(setCurrentPage(selectedPage)); // Диспатчем новое значение страницы в Redux
  };

  const renderPizzas = () => {
    if (!isLoaded) {
      return Array(6)
        .fill(0)
        .map((_, index) => <Skeleton key={index} />);
    }

    if (items.length === 0) {
      return <NotFound />;
    }

    return items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort order={sortOrder} onClickOrder={handleOrderChange} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{renderPizzas()}</div>
      <Pagination pageCount={pageCount} /> {/* handlePageChange больше не нужен */}
    </div>
  );
};

export default Home;
