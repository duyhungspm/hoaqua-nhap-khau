import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as web3 from '@solana/web3.js';
import { Link } from 'react-router-dom';

function Navbar({ onWalletConnect }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const isWalletConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Đã tìm thấy ví Phantom");
          const connected = await solana.connect({ onlyIfTrusted: false });
          if (connected) {
            const publicKey = connected.publicKey.toString();
            console.log("Địa chỉ công khai:", publicKey);
            setWalletAddress(publicKey);
            setIsConnected(true);
            onWalletConnect(publicKey);
            alert(`Đã kết nối với ví Phantom: ${publicKey}`);
          } else {
            alert("Kết nối thất bại");
          }
        } else {
          alert("Vui lòng cài đặt ví Phantom");
        }
      } else {
        alert("Không phát hiện ví Phantom");
      }
    } catch (error) {
      console.error("Lỗi khi kết nối ví:", error);
      alert("Đã xảy ra lỗi khi kết nối ví");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setIsConnected(false);
    onWalletConnect('');
    alert("Đã ngắt kết nối với ví Phantom");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
       
          <li className="nav-item">
            <Link className="nav-link" to="/product-service">Product Service</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/product-listservice">Product Update</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/product-list">Danh sách sản phẩm</Link>
          </li>
        </ul>
        {!isConnected ? (
          <button className="btn btn-success ml-auto my-2 my-sm-0" type="button" onClick={isWalletConnected}>Connect Wallet</button>
        ) : (
          <button className="btn btn-danger ml-auto my-2 my-sm-0" type="button" onClick={disconnectWallet}>Disconnect Wallet</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;