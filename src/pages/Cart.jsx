import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, cartTotal } = useContext(CartContext);
  
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-state">
            <h2>🛒 Keranjang Kosong</h2>
            <p>Tambahkan produk ke keranjang belanja Anda</p>
            <Link to="/products" className="btn btn-primary">Mulai Belanja</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart">
      <div className="container">
        <h1>Keranjang Belanja</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-summary">
            <h3>Ringkasan Belanja</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Total Harga ({cart.reduce((total, item) => total + item.quantity, 0)} item)</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="summary-row">
                <span>Ongkos Kirim</span>
                <span>Rp {cartTotal > 500000 ? '0' : '25.000'}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total Pembayaran</span>
                <span>Rp {(cartTotal + (cartTotal > 500000 ? 0 : 25000)).toLocaleString('id-ID')}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn btn-primary btn-block">
              Lanjut ke Checkout
            </Link>
            <Link to="/products" className="btn btn-outline btn-block">
              Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;