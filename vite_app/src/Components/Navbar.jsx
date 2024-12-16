import "./Navbar.css"
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='navbar' >
      <div className="item">
      <Link to = '/' className="link">Home</Link>
      <Link to = '/Meal' className="link">Meal</Link>
      <Link to = '/Cocktail' className="link">Cocktail</Link>
      <Link to = '/HomePage' className="link">Harry Potter</Link>
      <Link to = 'Bank' className="link">Bank</Link>
      </div>
    </nav>
  )
}

export default Navbar