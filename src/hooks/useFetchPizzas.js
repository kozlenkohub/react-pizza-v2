import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const API_URL = 'https://665d6310e88051d604065b54.mockapi.io/items';
const ITEMS_PER_PAGE = 4;

const useFetchPizzas = (searchValue) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isFirstRender = useRef(true);

  const { activeCategory, activeSort, currentPage } = useSelector((state) => state.filters);

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const buildFilterParams = useCallback(() => {
    const params = {
      category: activeCategory !== 0 ? activeCategory : undefined,
      sortBy: activeSort.sort,
      order: activeSort.order,
      search: searchValue || undefined,
      page: currentPage + 1,
      limit: ITEMS_PER_PAGE,
    };

    return params;
  }, [activeCategory, activeSort, searchValue, currentPage]);

  const fetchPizzas = useCallback(async () => {
    setIsLoaded(false);

    try {
      const params = buildFilterParams();

      const [{ data: itemsData }, { data: allItemsData }] = await Promise.all([
        axios.get(API_URL, { params }),
        axios.get(API_URL, {
          params: {
            category: activeCategory !== 0 ? activeCategory : undefined,
            search: searchValue || undefined,
          },
        }),
      ]);

      setItems(itemsData);
      setPageCount(Math.ceil(allItemsData.length / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Failed to fetch items:', error);
      setItems([]);
    } finally {
      setIsLoaded(true);
    }
  }, [buildFilterParams, activeCategory, searchValue]);

  useEffect(() => {
    if (location.search) {
      const parsedParams = qs.parse(location.search.slice(1));
      const category = parsedParams.category ? Number(parsedParams.category) : 0;
      const sort = { name: parsedParams.sortBy || 'Rating', sort: parsedParams.sortBy || 'rating' };
      const page = parsedParams.page ? Number(parsedParams.page) - 1 : 0;

      dispatch(
        setFilters({
          activeCategory: category,
          activeSort: sort,
          currentPage: page,
        }),
      );
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  useEffect(() => {
    if (!isFirstRender.current) {
      const queryString = qs.stringify(buildFilterParams());
      navigate(`?${queryString}`);
    } else {
      isFirstRender.current = false;
    }
  }, [buildFilterParams, navigate]);

  return { items, isLoaded, pageCount };
};

export default useFetchPizzas;
