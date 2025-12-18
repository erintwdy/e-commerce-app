import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../App';

const ProductDetail = ({ products }) => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <div className="product-not-found">
        <div className="container">
          <h2>Produk tidak ditemukan</h2>
          <Link to="/products" className="btn btn-primary">
            Kembali ke Produk
          </Link>
        </div>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${quantity} ${product.name} ditambahkan ke keranjang!`);
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  return (
    <div className="product-detail">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Beranda</Link> / <Link to="/products">Produk</Link> / <span>{product.name}</span>
        </div>
        
        <div className="product-detail-layout">
          <div className="product-images">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
          
          <div className="product-info">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1>{product.name}</h1>
              <div className="product-rating">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
                <span>({product.rating})</span>
              </div>
            </div>
            
            <div className="product-price-section">
              <div className="price">Rp {product.price.toLocaleString('id-ID')}</div>
              <div className="stock-status">
                {product.stock > 0 ? (
                  <span className="in-stock">✓ Stok tersedia ({product.stock} unit)</span>
                ) : (
                  <span className="out-of-stock">✗ Stok habis</span>
                )}
              </div>
            </div>
            
            <div className="product-description">
              <h3>Deskripsi Produk</h3>
              <p>{product.description}</p>
            </div>
            
            <div className="product-actions-section">
              <div className="quantity-selector">
                <button 
                  className="quantity-btn" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              
              <button 
                className="btn btn-primary btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
              </button>
              
              <Link to="/cart" className="btn btn-outline">
                Lihat Keranjang
              </Link>
            </div>
            
            <div className="product-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <div>
                  <strong>Gratis Ongkir</strong>
                  <p>Untuk pembelian di atas Rp 500.000</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <div>
                  <strong>Garansi 30 Hari</strong>
                  <p>Pengembalian mudah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;