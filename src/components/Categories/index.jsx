import React from 'react';

export function Categories({value, onClickCategory}) {
  // const [activeIndex, setActiveIndex] = React.useState(0)
  const list = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']


  return (
    <div className='categories'>
      <ul>
        {list.map((item, index)=> {
          return (
            <li onClick={()=> {
              // setActiveIndex(index);
              onClickCategory(index);
            }} key={index} className={index === value ? 'active' : ''}>{item}</li>
          )
        })}
      </ul>
    </div>
  );
}
