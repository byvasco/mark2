import React from 'react'
import { Link } from 'gatsby'

const Header = () => {
  return (
    <header className="header-main">
      <div className="container grid-3">
        <nav className="nav-main">
          <Link to="/stories/" className="menu-link button-1">Stories</Link>
          <Link to="/creatives/" className="menu-link button-1">Creatives</Link>
        </nav>

        <Link to="/" className="logo">Mark2 Swag</Link>

        <nav className="nav-secondary">
          <Link to="/about/" className="menu-link button-1">About</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header;