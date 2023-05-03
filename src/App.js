import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import { Header } from './components/Header';
import { Home } from './components/pages/Home';
import { Cart } from './components/pages/Cart';
import { Page404 } from './components/pages/Page404';
import { SearchContext } from './context/SearchContext';



function App() {
  const [searchValue, setSearchValue] = React.useState('');
  
  return (
    <>
    <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<Page404/>}/>
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
    </>
  );
}

export default App;
