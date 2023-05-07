import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';

import { Categories } from '../Categories';
import { PizzaBlock } from '../PizzaBlock';
import { Sort } from '../Sort';
import '../../scss/app.scss';
import { Skeleton } from '../PizzaBlock/Skeleton';
import { SearchContext } from '../../context/SearchContext';
import { Pagination } from '../Pagination';
import { setCategoryId } from '../../redux/slices/filterSlice';
import axios from 'axios';

export function Home() {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
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
    const sort = sortType.includes('-') ? sortType.replace('-', '') : sortType;
    const order = sortType.includes('-') ? 'desc' : 'ask';
    axios
      .get(
        `https://6446c25d0431e885f01b1ea8.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sort}&order=${order}`
      )
      .then((res)=> {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
