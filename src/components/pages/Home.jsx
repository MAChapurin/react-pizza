import React from 'react';
import ReactPaginate from 'react-paginate';

import { Categories } from '../Categories';
import { PizzaBlock } from '../PizzaBlock';
import { Sort } from '../Sort';
import '../../scss/app.scss';
import { Skeleton } from '../PizzaBlock/Skeleton';
import { SearchContext } from '../../context/SearchContext';
import { Pagination } from '../Pagination';

export function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortBy: 'price',
  });
  const { searchValue } = React.useContext(SearchContext);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const pizzas = items
    .filter((pizza) =>
      pizza.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? categoryId : '';
    const sort = sortType.sortBy.includes('-')
      ? sortType.sortBy.replace('-', '')
      : sortType.sortBy;
    const order = sortType.sortBy.includes('-') ? 'desc' : 'ask';
    fetch(
      `https://6446c25d0431e885f01b1ea8.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sort}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  );
}
