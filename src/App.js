import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import các component của bạn
import Footer from './Footer';
import Navbar from './Navbar'; 
import ProductService from './ProductService';
import ProductList from './ProductList'; 
import UpdateProduct from './UpdateProduct'; 
import ProductListService from './ProductListService';

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const handleWalletConnect = (address) => {
    setWalletAddress(address);
    setIsConnected(!!address);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onWalletConnect={handleWalletConnect} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Nếu ví chưa được kết nối, điều hướng người dùng đến trang chủ */}
            <Route path="/product-service" element={isConnected ? <ProductService /> : <Navigate to="/" />} />
            <Route path="/product-list" element={isConnected ? <ProductList /> : <Navigate to="/" />} />
            <Route path="/product-listservice" element={isConnected ? <ProductListService /> : <Navigate to="/" />} />
            <Route path="/product-update/:id" element={isConnected ? <UpdateProduct /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function Home() {
 
  return <h4>Hãy connect ví</h4>;
  <h2>Trang Chủ</h2>;
}

export default App;