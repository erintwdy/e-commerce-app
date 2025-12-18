import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Banner from './components/Banner';
import ProductCard from './components/ProductCard';
import CartItem from './components/CartItem';
import SearchBar from './components/SearchBar';
import Modal from './components/Modal';
import ToastContainer from './components/ToastContainer';
import { useNotification } from './hooks/useNotification';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import products from './data/products';
import './App.css';
import './index.css';

export const CartContext = createContext();
export const NotificationContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use notification hook
  const notification = useNotification();

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      // Show notification
      notification.showToast(
        `✅ ${product.name} ditambahkan ke keranjang!`,
        'success'
      );

      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id === productId);
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    
    // Show notification
    if (product) {
      notification.showToast(
        `🗑️ ${product.name} dihapus dari keranjang`,
        'info'
      );
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    const product = cart.find(item => item.id === productId);
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    // Show notification for significant quantity changes
    if (product && Math.abs(quantity - product.quantity) >= 3) {
      notification.showToast(
        `🔄 Jumlah ${product.name} diubah menjadi ${quantity}`,
        'info'
      );
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <NotificationContext.Provider value={notification}>
      <CartContext.Provider value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        cartCount, 
        cartTotal 
      }}>
        <Router>
          <div className="App">
            <Header 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              cartCount={cartCount} 
            />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/products" 
                  element={<Products searchTerm={searchTerm} />} 
                />
                <Route 
                  path="/product/:id" 
                  element={<ProductDetail products={products} />} 
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Toast Notifications */}
            <ToastContainer 
              toasts={notification.toasts}
              removeToast={notification.removeToast}
            />
            
            {/* Modal */}
            <Modal
              isOpen={notification.modal.isOpen}
              onClose={notification.hideModal}
              title={notification.modal.title}
              type={notification.modal.type}
            >
              <p>{notification.modal.message}</p>
            </Modal>
          </div>
        </Router>
      </CartContext.Provider>
    </NotificationContext.Provider>
  );
}

export default App;