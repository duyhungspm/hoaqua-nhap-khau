import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    origin: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmMWM0YTEwZC0yNzRkLTQ5MWQtYjAzMy1lNTY1N2M4Njk1OGEiLCJzdWIiOiI2ZmNiMDQ2OC00YTEyLTQ3NGQtYTA1MS0wMzRkZmRkZDUzOTQiLCJpYXQiOjE3MjE1NzY0MDZ9.fc_d-U_fIE9S45ncbodI2YHrT53w0vWg_8uMEtq9OKY';


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.gameshift.dev/nx/items/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'x-api-key': apiKey,
          },
        });
  
        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi lấy thông tin sản phẩm');
        }
  
        const result = await response.json();
        console.log('Phản hồi API:', result); 
        
       
        const item = result.item;
        
        if (item) {
          setProduct({
            name: item.name || '',
            description: item.description || '',
            price: item.attributes?.find(attr => attr.traitType === 'price')?.value || '',
            quantity: item.attributes?.find(attr => attr.traitType === 'quantity')?.value || '',
            origin: item.attributes?.find(attr => attr.traitType === 'origin')?.value || '',
            imageUrl: item.imageUrl || ''
          });
          setLoading(false);
        } else {
          setError('Sản phẩm không tồn tại hoặc phản hồi không đúng định dạng');
          setLoading(false);
        }
      } catch (error) {
        console.error('Lỗi:', error);
        setError('Có lỗi xảy ra khi lấy thông tin sản phẩm');
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://api.gameshift.dev/nx/unique-assets/${id}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          name: product.name,
          imageUrl: product.imageUrl,
          description: product.description,
          attributes: [
            {
              traitType: 'price',
              value: product.price
            },
            {
              traitType: 'origin',
              value: product.origin
            },
            {
              traitType: 'quantity',
              value: product.quantity
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi cập nhật thông tin sản phẩm');
      }

      const result = await response.json();
      console.log('Sản phẩm đã được cập nhật:', result);
      alert('Sản phẩm đã được cập nhật thành công');
      navigate('/product-listservice'); 
    } catch (error) {
      console.error('Lỗi:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin sản phẩm');
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cập nhật thông tin sản phẩm</h2>
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
        <div className="form-group mb-3">
          <label htmlFor="origin">Nguồn gốc:</label>
          <input
            type="text"
            className="form-control"
            id="origin"
            name="origin"
            value={product.origin}
            onChange={handleChange}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdate}>
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;