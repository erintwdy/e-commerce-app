import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="home">
      <Banner />
      
      <section className="featured-products">
        <div className="container">
          <h2>Produk Unggulan</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all">
            <Link to="/products" className="btn">Lihat Semua Produk</Link>
          </div>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Gratis Ongkir</h3>
              <p>Untuk pembelian di atas Rp 500.000</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Pembayaran Aman</h3>
              <p>100% transaksi terlindungi</p>
            </div>
            <div className="feature">
              <div className="feature-icon">↩️</div>
              <h3>Garansi 30 Hari</h3>
              <p>Pengembalian mudah</p>
            </div>
            <div className="feature">
              <div className="feature-icon">☎️</div>
              <h3>Bantuan 24/7</h3>
              <p>Customer service siap membantu</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;