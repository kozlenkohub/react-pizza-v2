import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ pageCount, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    onPageChange(event.selected);
  };

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      pageCount={pageCount} // Adjust this dynamically based on total number of pages
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination} // Custom styling
      activeClassName={styles.active} // Custom styling for the active page
    />
  );
};

export default Pagination;
