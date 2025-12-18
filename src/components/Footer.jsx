import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🛒 ShopEasy</h3>
            <p>Toko online terpercaya dengan produk berkualitas dan pelayanan terbaik.</p>
          </div>
          
          <div className="footer-section">
            <h3>Tautan Cepat</h3>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/products">Produk</Link></li>
              <li><Link to="/cart">Keranjang</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Kategori</h3>
            <ul>
              <li><Link to="/products?category=Electronics">Elektronik</Link></li>
              <li><Link to="/products?category=Fashion">Fashion</Link></li>
              <li><Link to="/products?category=Home">Rumah Tangga</Link></li>
              <li><Link to="/products?category=Books">Buku</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Kontak</h3>
            <ul>
              <li>📧 support@shopeasy.com</li>
              <li>📞 (021) 1234-5678</li>
              <li>📍 Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          <p>© 2025 ShopEasy - UAS Front-End Development. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;