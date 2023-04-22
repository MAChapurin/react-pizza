import React from 'react';

export function Categories() {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const list = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  return (
    <div className='categories'>
      <ul>
        {list.map((item, index)=> {
          return (
            <li onClick={()=> {
              setActiveIndex(index)
            }} key={index} className={index === activeIndex ? 'active' : ''}>{item}</li>
          )
        })}
      </ul>
    </div>
  );
}
