import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Products = ({ searchTerm }) => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  useEffect(() => {
    let result = products;
    
    // Filter berdasarkan kategori
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter berdasarkan search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchTerm]);
  
  useEffect(() => {
    // Handle category from URL query
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [location.search]);
  
  return (
    <div className="products-page">
      <div className="container">
        <h1>Semua Produk</h1>
        
        <div className="products-controls">
          <div className="categories-filter">
            <span>Filter Kategori:</span>
            <div className="category-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Semua' : category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="products-count">
            Menampilkan {filteredProducts.length} produk
          </div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <h3>Produk tidak ditemukan</h3>
            <p>Coba gunakan kata kunci lain atau pilih kategori yang berbeda</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;