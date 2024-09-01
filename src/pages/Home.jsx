import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import NotFound from './NotFound';
import Pagination from '../components/Pagination';
import useFetchPizzas from '../hooks/useFetchPizzas';

const Home = ({ searchValue }) => {
  const { activeSort, activeCategory } = useSelector((state) => state.filters);

  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);

  // Используем хук для получения данных пицц
  const { items, isLoaded, pageCount } = useFetchPizzas(
    activeCategory, // Динамическое обновление активной категории
    activeSort,
    sortOrder,
    searchValue,
    currentPage,
  );

  const handleOrderChange = (order) => {
    setSortOrder(order);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
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
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
