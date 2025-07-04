import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './delete.module.css';

interface ProductState {
  id: number;
  title: string;
  price: string;
  description: string;
}

function DeleteProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

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
        console.error("Lỗi khi fetch chi tiết sản phẩm để xóa:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDeleteConfirm = async () => {
    if (!id || !product) return;
    setIsDeleting(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setDeleteSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError("Xóa sản phẩm thất bại. Vui lòng thử lại.");
      console.error("Lỗi khi xóa sản phẩm:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className={styles.centeredPage}>
        <p className={styles.loadingText}>Đang tải thông tin sản phẩm để xóa...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centeredPage}>
        <p className={styles.errorText}>{error}</p>
        <button onClick={handleCancel} className={styles.primaryButton}>Về danh sách</button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.centeredPage}>
        <p className={styles.errorText}>Không tìm thấy sản phẩm với ID: {id}</p>
        <button onClick={handleCancel} className={styles.primaryButton}>Về danh sách</button>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Xác nhận xóa sản phẩm</h2>
        <p className={styles.confirmText}>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>

        <div className={styles.productInfo}>
          <p className={styles.label}>Tên sản phẩm:</p>
          <p className={styles.value}>{product.title}</p>
          <p className={styles.label}>Giá:</p>
          <p className={styles.value}>{product.price}</p>
        </div>

        {deleteSuccess && (
          <p className={styles.successMessage}>Sản phẩm đã được xóa thành công! Đang chuyển hướng...</p>
        )}

        {error && (
          <p className={styles.errorText}>{error}</p>
        )}

        <div className={styles.buttonGroup}>
          <button
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isDeleting}
          >
            Hủy
          </button>
          <button
            onClick={handleDeleteConfirm}
            className={styles.deleteButton}
            disabled={isDeleting}
          >
            {isDeleting ? 'Đang xóa...' : 'Xác nhận xóa'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
