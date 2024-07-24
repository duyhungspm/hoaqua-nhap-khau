import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMWM0YTEwZC0yNzRkLTQ5MWQtYjAzMy1lNTY1N2M4Njk1OGEiLCJzdWIiOiI2ZmNiMDQ2OC00YTEyLTQ3NGQtYTA1MS0wMzRkZmRkZDUzOTQiLCJpYXQiOjE3MjE1NzY0MDZ9.fc_d-U_fIE9S45ncbodI2YHrT53w0vWg_8uMEtq9OKY'; // Thay bằng API key của bạn
      try {
        const response = await fetch(`https://api.gameshift.dev/nx/items/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'x-api-key': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi lấy chi tiết sản phẩm');
        }

        const result = await response.json();
        setProduct(result.data);
      } catch (error) {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra khi lấy chi tiết sản phẩm');
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMWM0YTEwZC0yNzRkLTQ5MWQtYjAzMy1lNTY1N2M4Njk1OGEiLCJzdWIiOiI2ZmNiMDQ2OC00YTEyLTQ3NGQtYTA1MS0wMzRkZmRkZDUzOTQiLCJpYXQiOjE3MjE1NzY0MDZ9.fc_d-U_fIE9S45ncbodI2YHrT53w0vWg_8uMEtq9OKY'; // Thay bằng API key của bạn
    try {
      const response = await fetch(`https://api.gameshift.dev/nx/items/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi cập nhật sản phẩm');
      }

      alert('Cập nhật sản phẩm thành công');
      navigate('/product-list'); // Quay lại trang danh sách sản phẩm
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cập nhật sản phẩm</h2>
      <div className="form-group">
        <label>Tên sản phẩm</label>
        <input
          type="text"
          className="form-control"
          value={product.item.name}
          onChange={(e) => setProduct({ ...product, item: { ...product.item, name: e.target.value } })}
        />
      </div>
      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          className="form-control"
          value={product.item.description}
onChange={(e) => setProduct({ ...product, item: { ...product.item, description: e.target.value } })}
        />
      </div>
      {/* Thêm các trường khác tương tự */}
      <button type="button" className="btn btn-primary" onClick={handleUpdate}>
        Cập nhật
      </button>
    </div>
  );
}

export default UpdateProduct;