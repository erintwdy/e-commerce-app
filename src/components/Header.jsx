import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Header = ({ searchTerm, setSearchTerm, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">🛒 ShopEasy</Link>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Beranda</Link></li>
              <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Produk</Link></li>
              <li><Link to="/cart" onClick={() => setIsMenuOpen(false)}>Keranjang ({cartCount})</Link></li>
            </ul>
          </nav>
          
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span>{isMenuOpen ? '✕' : '☰'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;