import React from 'react';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';
import './scss/app.scss';
import { Skeleton } from './components/PizzaBlock/Skeleton';

function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    fetch('https://6446c25d0431e885f01b1ea8.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
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
        </div>
      </div>
    </>
  );
}

export default App;
