import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import styles from './Pagination.module.scss';

const Pagination = ({ pageCount }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filters.currentPage);

  const handlePageClick = (event) => {
    dispatch(setCurrentPage(event.selected));
  };

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      forcePage={currentPage}
    />
  );
};

export default Pagination;
