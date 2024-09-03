import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetchPizzas = (activeCategory, activeSort, sortOrder, searchValue, currentPage) => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(3);

  const API_URL = 'https://665d6310e88051d604065b54.mockapi.io/items';

  const getFilterParams = () => ({
    category: activeCategory !== 0 ? activeCategory : undefined,
    sortBy: activeSort.sort,
    order: sortOrder,
    search: searchValue,
    page: currentPage + 1,
    limit: 4,
  });

  const fetchPizzas = useCallback(async () => {
    setIsLoaded(false);

    try {
      const params = getFilterParams();

      // Получаем данные для отображаемых элементов
      const [{ data }, { data: totalItems }] = await Promise.all([
        axios.get(API_URL, { params }),
        axios.get(API_URL, {
          params: {
            category: activeCategory !== 0 ? activeCategory : undefined,
            search: searchValue,
          },
        }),
      ]);

      // Устанавливаем количество страниц на основе отфильтрованных данных
      setItems(data);
      setPageCount(Math.ceil(totalItems.length / 4));
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
