import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export const Pagination = ({onChangePage}) => {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={e => onChangePage(e.selected + 1)}
    pageRangeDisplayed={5}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}
