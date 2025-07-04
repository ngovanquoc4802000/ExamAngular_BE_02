import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateProduct.modules.css'; 

interface ProductState {
  id: number;
  title: string;
  price: string;
  description: string;
}

function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductState>({
    id: 0,
    title: '',
    price: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Không tìm thấy ID sản phẩm.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get<ProductState>(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại.");
        console.error("Lỗi khi fetch chi tiết sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      setSubmitSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError("Cập nhật sản phẩm thất bại. Vui lòng kiểm tra lại thông tin.");
      console.error("Lỗi khi cập nhật sản phẩm:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="update-product__loading">
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="update-product__error">
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Về danh sách</button>
      </div>
    );
  }

  return (
    <div className="update-product">
      <div className="update-product__form-wrapper">
        <h2 className="update-product__title">Cập nhật sản phẩm</h2>
        <form onSubmit={handleSubmit} className="update-product__form">
          <div className="update-product__field">
            <label htmlFor="title">Tên sản phẩm:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-product__field">
            <label htmlFor="price">Giá:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="update-product__field">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              required
            ></textarea>
          </div>

          {submitSuccess && (
            <p className="update-product__success">
              Cập nhật sản phẩm thành công! Đang chuyển hướng...
            </p>
          )}

          <div className="update-product__buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
            <button type="button" onClick={() => navigate('/')} disabled={isSubmitting}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;