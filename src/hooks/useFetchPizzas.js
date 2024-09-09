import { useState, useEffect, useCallback, useRef } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';

const useFetchPizzas = (activeCategory, activeSort, sortOrder, searchValue, currentPage) => {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageCount, setPageCount] = useState(3);
  const dispatch = useDispatch();

  const isFirstRender = useRef(true);

  const API_URL = 'https://665d6310e88051d604065b54.mockapi.io/items';

  const getFilterParams = useCallback(
    () => ({
      category: activeCategory !== 0 ? activeCategory : undefined,
      sortBy: activeSort.sort,
      order: sortOrder,
      search: searchValue || undefined,
      page: currentPage + 1,
      limit: 4,
    }),
    [activeCategory, activeSort, sortOrder, searchValue, currentPage],
  );

  const updateURLParams = useCallback(() => {
    if (isFirstRender.current) {
      return;
    }
    const params = getFilterParams();
    const queryString = qs.stringify(params, { skipNulls: true });
    window.history.pushState(null, '', `?${queryString}`);
  }, [getFilterParams]);

  const fetchPizzas = useCallback(async () => {
    setIsLoaded(false);

    try {
      const params = getFilterParams();
      const [{ data }, { data: totalItems }] = await Promise.all([
        axios.get(API_URL, { params }),
        axios.get(API_URL),
      ]);

      setItems(data);
      setPageCount(Math.ceil(totalItems.length / 4));
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, [getFilterParams]);

  const syncFiltersWithURL = useCallback(() => {
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    const filters = {
      activeCategory: params.category ? Number(params.category) : 0,
      activeSort: {
        name: params.sortBy || 'Rating',
        sort: params.sortBy || 'rating',
      },
      sortOrder: params.order || 'asc',
      searchValue: params.search || '',
      currentPage: params.page ? Number(params.page) - 1 : 0,
    };

    dispatch(setFilters(filters));
  }, [dispatch]);

  useEffect(() => {
    syncFiltersWithURL();
  }, [syncFiltersWithURL]);

  useEffect(() => {
    if (!isFirstRender.current) {
      updateURLParams();
    }
    fetchPizzas();
  }, [fetchPizzas, updateURLParams]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return { items, isLoaded, pageCount };
};

export default useFetchPizzas;
