import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMWM0YTEwZC0yNzRkLTQ5MWQtYjAzMy1lNTY1N2M4Njk1OGEiLCJzdWIiOiI2ZmNiMDQ2OC00YTEyLTQ3NGQtYTA1MS0wMzRkZmRkZDUzOTQiLCJpYXQiOjE3MjE1NzY0MDZ9.fc_d-U_fIE9S45ncbodI2YHrT53w0vWg_8uMEtq9OKY';


const ProductListService = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
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
        setError('Có lỗi xảy ra khi lấy danh sách sản phẩm');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Danh sách sản phẩm</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Nguồn gốc</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.item.id}>
                <td>
                  <img 
                    src={product.item.imageUrl || 'default-image-url.jpg'} 
                    alt={product.item.name || 'Hình ảnh sản phẩm'} 
                    style={{ height: '100px', width: '100px', objectFit: 'cover' }} 
                  />
                </td>
                <td>{product.item.name || 'N/A'}</td>
                <td>{product.item.description || 'N/A'}</td>
                <td>
                  {product.item.attributes?.find(attr => attr.traitType === 'price')?.value || 'N/A'}
                </td>
                <td>
                  {product.item.attributes?.find(attr => attr.traitType === 'quantity')?.value || 'N/A'}
                </td>
                <td>
                  {product.item.attributes?.find(attr => attr.traitType === 'origin')?.value || 'N/A'}
                </td>
                <td>
                <Link to={`/product-update/${product.item.id}`} className="btn btn-success mt-auto">
                  Cập nhật</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Không có sản phẩm</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListService;