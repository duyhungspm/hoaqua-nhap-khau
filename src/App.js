import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import các component của bạn
import Footer from './Footer';
import Navbar from './Navbar'; 
import ProductService from './ProductService';
import ProductList from './ProductList'; // Import trang ProductList
import UpdateProduct from './UpdateProduct'; 
import ProductListService from './ProductListService';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const handleWalletConnect = (address) => {
    setWalletAddress(address);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onWalletConnect={handleWalletConnect} /> {/* Truyền hàm callback */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product-service" element={<ProductService />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/product-listservice" element={<ProductListService />} />
            <Route path="/product-update/:id" element={<UpdateProduct />} />
          </Routes>
        </div>
        <Footer /> {/* Sử dụng component Footer */}
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Trang Chủ</h2>;
}

export default App;