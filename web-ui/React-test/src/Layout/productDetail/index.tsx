import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Detail.module.css';

interface ProductState {
  id: number;
  title: string;
  price: string;
  description: string;
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className={styles.centeredPage}>
        <p className={styles.loadingText}>Đang tải thông tin chi tiết sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centeredPage}>
        <p className={styles.errorText}>{error}</p>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Về danh sách
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.centeredPage}>
        <p className={styles.errorText}>Không tìm thấy sản phẩm với ID: {id}</p>
        <button onClick={() => navigate('/')} className={styles.backButton}>
          Về danh sách
        </button>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Chi tiết sản phẩm</h2>

        <div className={styles.section}>
          <p className={styles.label}>Tên sản phẩm:</p>
          <p className={styles.value}>{product.title}</p>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Giá:</p>
          <p className={styles.value}>{product.price}</p>
        </div>

        <div className={styles.section}>
          <p className={styles.label}>Mô tả:</p>
          <p className={styles.description}>{product.description}</p>
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={() => navigate('/')} className={styles.backButton}>
            Về danh sách
          </button>
          <button
            onClick={() => navigate(`/products/edit/${product.id}`)}
            className={styles.editButton}
          >
            Chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;