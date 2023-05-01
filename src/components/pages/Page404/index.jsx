import {Link} from 'react-router-dom'

export function Page404() {
  return (
    <div>
      <h2>
      Извините, страница не найдена!
      </h2>
      <Link to='/'> На главную </Link>
    </div>
    
  )
}