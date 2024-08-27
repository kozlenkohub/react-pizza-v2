import React, { useEffect, useState, useCallback } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import NotFound from './NotFound';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSort, setActiveSort] = useState({ name: 'Rating', sort: 'rating' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(3);

  const fetchPizzas = useCallback(() => {
    setIsLoaded(false);

    const categoryQuery = activeCategory === 0 ? '' : `category=${activeCategory}&`;
    const apiUrl = `https://665d6310e88051d604065b54.mockapi.io/items?page=${
      currentPage + 1
    }&limit=4&${categoryQuery}sortBy=${activeSort.sort}&order=${sortOrder}&search=${searchValue}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        setItems(Array.isArray(json) ? json : []);
        setIsLoaded(true);

        const totalItems = 12;
        setPageCount(Math.ceil(totalItems / 4));
      })
      .catch((error) => {
        console.error('Failed to fetch items:', error);
        setItems([]);
        setIsLoaded(true);
      });
  }, [activeCategory, activeSort, sortOrder, searchValue, currentPage]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  const handleCategoryChange = (index) => {
    setActiveCategory(index);
  };

  const handleSortChange = (sortOption) => {
    setActiveSort(sortOption);
  };

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
        <Categories value={activeCategory} onClickCategory={handleCategoryChange} />
        <Sort
          value={activeSort}
          order={sortOrder}
          onClickSort={handleSortChange}
          onClickOrder={handleOrderChange}
        />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{renderPizzas()}</div>
      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default Home;
