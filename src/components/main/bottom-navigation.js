import React from 'react'
import { Link } from 'gatsby'

const BottomNavigation = () => {
  return (
    <nav className="bottom-navigation">
      <ul className="links">
        <li><Link to="/" activeClassName="active" className="menu-link button-2">Home</Link></li>
        <li><Link to="/stories/" activeClassName="active" className="menu-link button-2">Stories</Link></li>
        <li><Link to="/creatives/" activeClassName="active" className="menu-link button-2">Creatives</Link></li>
        <li><Link to="/about/" activeClassName="active" className="menu-link button-2">About</Link></li>
      </ul>
    </nav>
  )
}

export default BottomNavigation;