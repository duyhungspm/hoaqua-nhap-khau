import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductService() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '' // Thêm trường imageUrl vào state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSave = async () => {
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMWM0YTEwZC0yNzRkLTQ5MWQtYjAzMy1lNTY1N2M4Njk1OGEiLCJzdWIiOiI2ZmNiMDQ2OC00YTEyLTQ3NGQtYTA1MS0wMzRkZmRkZDUzOTQiLCJpYXQiOjE3MjE1NzY0MDZ9.fc_d-U_fIE9S45ncbodI2YHrT53w0vWg_8uMEtq9OKY'; // Thay bằng API key của bạn
    const collectionId = 'acc31758-a134-4bb0-a05c-b4911048ff33'; 
    const userReferenceId = '123'; 

    try {
      const response = await fetch('https://api.gameshift.dev/nx/unique-assets', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          details: {
            collectionId: collectionId,
            description: product.description,
            imageUrl: product.imageUrl, // Sử dụng giá trị imageUrl từ state
            name: product.name,
            attributes: [
              {
                traitType: 'price',
                value: product.price
              },
              {
                traitType: 'quantity',
                value: product.quantity
              }
            ]
          },
          destinationUserReferenceId: userReferenceId
        }),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi lưu thông tin sản phẩm');
      }

      const result = await response.json();
      console.log('Sản phẩm đã được lưu:', result);
      alert('Sản phẩm đã được lưu thành công');
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi lưu thông tin sản phẩm');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Nhập thông tin sản phẩm</h2>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="name">Tên sản phẩm:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Mô tả:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Giá tiền:</label>
<input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="quantity">Số lượng:</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="imageUrl">URL ảnh:</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
        >
          Lưu
        </button>
      </form>
    </div>
  );
}

export default ProductService;