import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, NotificationContext } from '../App';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const notification = useContext(NotificationContext);
  
  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
      
      if (change > 0) {
        notification.showToast(
          `➕ ${item.name} ditambah (${newQuantity})`,
          'success'
        );
      } else {
        notification.showToast(
          `➖ ${item.name} dikurangi (${newQuantity})`,
          'info'
        );
      }
    }
  };
  
  const handleRemove = () => {
    notification.showModal(
      'Konfirmasi Hapus',
      `Apakah Anda yakin ingin menghapus "${item.name}" dari keranjang?`,
      'warning'
    );
    
    // In real app, you would wait for user confirmation
    // For now, we'll proceed immediately
    setTimeout(() => {
      removeFromCart(item.id);
    }, 100);
  };
  
  const itemTotal = item.price * item.quantity;
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="cart-item-details">
        <h3>
          <Link to={`/product/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="cart-item-category">{item.category}</p>
        <div className="cart-item-price">
          Rp {item.price.toLocaleString('id-ID')}
        </div>
        
        <div className="cart-item-actions">
          <div className="quantity-control">
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={item.quantity <= 1}
              aria-label="Kurangi jumlah"
            >
              −
            </button>
            <span className="quantity">{item.quantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
              aria-label="Tambah jumlah"
            >
              +
            </button>
          </div>
          
          <button 
            className="btn btn-outline btn-small"
            onClick={handleRemove}
            aria-label="Hapus item"
          >
            🗑️ Hapus
          </button>
        </div>
      </div>
      
      <div className="cart-item-total">
        <div className="total-price highlight">
          Rp {itemTotal.toLocaleString('id-ID')}
        </div>
        {itemTotal > 500000 && (
          <div className="discount-badge">
            🎁 Gratis Ongkir!
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;