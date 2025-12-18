import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="banner">
      <div className="container">
        <div className="banner-content">
          <h1>Selamat Datang di ShopEasy</h1>
          <p>Temukan produk terbaik dengan harga terjangkau dan kualitas terjamin</p>
          <Link to="/products" className="btn btn-primary">Mulai Belanja</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;