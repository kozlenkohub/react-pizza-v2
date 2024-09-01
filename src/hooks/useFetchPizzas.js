import { useState, useEffect, useCallback } from 'react';

const useFetchPizzas = (activeCategory, activeSort, sortOrder, searchValue, currentPage) => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(3);

  const fetchPizzas = useCallback(async () => {
    setIsLoaded(false);

    try {
      const categoryQuery = activeCategory !== 0 ? `category=${activeCategory}&` : '';
      const apiUrl = `https://665d6310e88051d604065b54.mockapi.io/items?page=${
        currentPage + 1
      }&limit=4&${categoryQuery}sortBy=${activeSort.sort}&order=${sortOrder}&search=${searchValue}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setItems(Array.isArray(data) ? data : []);
      setPageCount(Math.ceil(12 / 4)); // Заменить на динамическое значение при наличии
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, [activeCategory, activeSort, sortOrder, searchValue, currentPage]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  return { items, isLoaded, pageCount };
};

export default useFetchPizzas;
