import React from 'react';

import { Categories } from '../Categories';
import { PizzaBlock } from '../PizzaBlock';
import { Sort } from '../Sort';
import '../../scss/app.scss';
import { Skeleton } from '../PizzaBlock/Skeleton';

export function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortBy: 'price'
  })

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? categoryId : '';
    const sort = sortType.sortBy.includes('-') ? sortType.sortBy.replace('-', '') : sortType.sortBy
    const order = sortType.sortBy.includes('-') ? 'desc' : 'ask';
    fetch(`https://6446c25d0431e885f01b1ea8.mockapi.io/items?category=${category}&sortBy=${sort}&order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);
  return (
    <div className='container'>
    <div className='content__top'>
      <Categories value={categoryId} onClickCategory={setCategoryId}/>
      <Sort value={sortType} onChangeSort={setSortType}/>
    </div>
    <h2 className='content__title'>Все пиццы</h2>
    <div className='content__items'>
      {isLoading
        ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
        : items.map((pizza) => (
            <PizzaBlock key={pizza.id} {...pizza} />
          ))}
    </div>
  </div>
  )
}