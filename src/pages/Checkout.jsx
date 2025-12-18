import React, { useContext, useState } from 'react';
import { CartContext, NotificationContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal } = useContext(CartContext);
  const notification = useContext(NotificationContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card'
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nama wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email tidak valid';
    if (!formData.phone.trim()) newErrors.phone = 'Telepon wajib diisi';
    if (!formData.address.trim()) newErrors.address = 'Alamat wajib diisi';
    if (!formData.city.trim()) newErrors.city = 'Kota wajib diisi';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Kode pos wajib diisi';
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      notification.showModal(
        'Form Tidak Valid',
        'Harap periksa kembali data yang Anda masukkan.',
        'error'
      );
      return;
    }
    
    // Show confirmation modal
    notification.showModal(
      'Konfirmasi Pesanan',
      `Apakah Anda yakin ingin memesan ${cart.length} item dengan total Rp ${cartTotal.toLocaleString('id-ID')}?`,
      'cart'
    );
    
    // Simulate order processing
    setTimeout(() => {
      // Show success modal
      notification.showModal(
        '🎉 Pesanan Berhasil!',
        `Terima kasih ${formData.name}, pesanan Anda sedang diproses. Anda akan menerima email konfirmasi di ${formData.email}.`,
        'success'
      );
      
      // Clear cart and redirect
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1000);
  };
  
  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <div className="container">
          <div className="empty-state">
            <h2>Keranjang kosong</h2>
            <p>Tambahkan produk sebelum checkout</p>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Belanja Sekarang
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const shippingCost = cartTotal > 500000 ? 0 : 25000;
  const totalPayment = cartTotal + shippingCost;
  
  return (
    <div className="checkout">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-layout">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              <h3>Informasi Pengiriman</h3>
              
              <div className="form-group">
                <label htmlFor="name">Nama Lengkap *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'error' : ''}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="email@contoh.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Telepon *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="081234567890"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Alamat Lengkap *</label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="Jl. Contoh No. 123, RT/RW 001/002"
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Kota *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                    placeholder="Jakarta Selatan"
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="postalCode">Kode Pos *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={errors.postalCode ? 'error' : ''}
                    placeholder="12345"
                  />
                  {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                </div>
              </div>
              
              <h3>Metode Pembayaran</h3>
              
              <div className="form-group">
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="credit-card">Kartu Kredit</option>
                  <option value="debit-card">Kartu Debit</option>
                  <option value="bank-transfer">Transfer Bank</option>
                  <option value="cod">COD (Bayar di Tempat)</option>
                  <option value="e-wallet">E-Wallet</option>
                </select>
              </div>
              
              <button type="submit" className="btn btn-primary btn-block">
                Bayar Rp {totalPayment.toLocaleString('id-ID')}
              </button>
            </form>
          </div>
          
          <div className="checkout-summary">
            <h3>Ringkasan Pesanan</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <span className="order-item-name">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="order-item-price">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="summary-row">
                <span>Ongkos Kirim</span>
                <span>{shippingCost === 0 ? 'GRATIS' : `Rp ${shippingCost.toLocaleString('id-ID')}`}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>Rp {totalPayment.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; // ✅ Pastikan ada ini