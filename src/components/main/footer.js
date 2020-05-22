import React from 'react'
import { Link } from 'gatsby'

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="container flex-col-center">
        <Link to="/" className="logo-white">Mark2 Swag</Link>

        <nav className="nav-main">
          <Link to="/stories/" className="menu-link button-1">Stories</Link>
          <Link to="/creatives/" className="menu-link button-1">Creatives</Link>
        </nav>

        <div className="social-links">
          <a href="https://www.facebook.com/mk2swag/" className="link facebook">Facebook</a>
          <a href="https://www.instagram.com/mk2swag/" className="link instagram">Instagram</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;