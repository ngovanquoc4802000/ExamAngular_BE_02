import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './add.module.css';

interface NewProductState {
  title: string;
  price: string;
  description: string;
}

function AddProduct() {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState<NewProductState>({
    title: '',
    price: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post('http://localhost:3000/products', newProduct);
      setSubmitSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.log(" thêm sản phẩm không thành công" + error)
      setError('Thêm sản phẩm thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Thêm sản phẩm mới</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>Tên sản phẩm:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProduct.title}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>Giá:</label>
            <input
              type="text"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Mô tả:</label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              rows={4}
              className={styles.textarea}
              required
            />
          </div>

          {error && <p className={styles.errorText}>{error}</p>}
          {submitSuccess && <p className={styles.successText}>Thêm sản phẩm thành công! Đang chuyển hướng...</p>}

          <div className={styles.buttonGroup}>
            <button type="submit" className={`${styles.button} ${styles.submitButton}`} disabled={isSubmitting}>
              {isSubmitting ? 'Đang thêm...' : 'Thêm sản phẩm'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`${styles.button} ${styles.cancelButton}`}
              disabled={isSubmitting}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
