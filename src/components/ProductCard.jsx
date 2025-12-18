import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { NotificationContext } from '../App';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const notification = useContext(NotificationContext);
  
  const handleAddToCart = () => {
    if (product.stock === 0) {
      notification.showModal(
        'Stok Habis',
        `Maaf, stok untuk ${product.name} sudah habis.`,
        'error'
      );
      return;
    }
    
    addToCart(product);
    
    // Show confetti effect for expensive items
    if (product.price > 1000000) {
      notification.showModal(
        'Produk Premium Ditambahkan! 🎉',
        `${product.name} telah ditambahkan ke keranjang. Produk premium ini memberikan kualitas terbaik!`,
        'cart'
      );
    }
  };
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.stock < 10 && product.stock > 0 && (
          <span className="stock-badge">Hanya {product.stock} tersisa!</span>
        )}
        {product.stock === 0 && (
          <span className="stock-badge out-of-stock">Stok Habis</span>
        )}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          <span>({product.rating})</span>
        </div>
        <div className="product-price">Rp {product.price.toLocaleString('id-ID')}</div>
        <div className="product-actions">
          <button 
            className="btn btn-primary" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Stok Habis' : '🛒 Tambah ke Keranjang'}
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-outline">
            👁️ Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;