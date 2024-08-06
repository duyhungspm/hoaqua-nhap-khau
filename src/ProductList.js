import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái cho giá trị tìm kiếm

  useEffect(() => {
    const fetchProducts = async () => {
      const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMWM0YTEwZC0yNzRkLTQ5MWQtYjAzMy1lNTY1N2M4Njk1OGEiLCJzdWIiOiI2ZmNiMDQ2OC00YTEyLTQ3NGQtYTA1MS0wMzRkZmRkZDUzOTQiLCJpYXQiOjE3MjE1NzY0MDZ9.fc_d-U_fIE9S45ncbodI2YHrT53w0vWg_8uMEtq9OKY';
      try {
        const response = await fetch('https://api.gameshift.dev/nx/items', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'x-api-key': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi lấy danh sách sản phẩm');
        }

        const result = await response.json();
        setProducts(result.data.filter(item => item.type === 'UniqueAsset')); // Lọc chỉ lấy các phần tử có type là 'UniqueAsset'
      } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi lấy danh sách sản phẩm');
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Danh sách sản phẩm</h2>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.item.id}>
            <div className="card h-100">
              <img 
                src={product.item.imageUrl || 'default-image-url.jpg'} 
                className="card-img-top" 
                alt={product.item.name} 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.item.name}</h5>
                <p className="card-text">{product.item.description}</p>
                <p className="card-text">
                  <strong>Giá:</strong> {product.item.attributes?.find(attr => attr.traitType === 'price')?.value || 'N/A'}
                </p>
                <p className="card-text">
                  <strong>Số lượng:</strong> {product.item.attributes?.find(attr => attr.traitType === 'quantity')?.value || 'N/A'}
                </p>
                <p className="card-text">
<strong>Nguồn gốc:</strong> {product.item.attributes?.find(attr => attr.traitType === 'origin')?.value || 'N/A'}
                </p>
                <a
                  href={`https://app.gameshift.dev/games/2e0f70ae-4e3a-472e-96da-21ee50a9268e/collectibles/assets/${product.item.id}`}
                  className="btn btn-success mt-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chi tiết
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;