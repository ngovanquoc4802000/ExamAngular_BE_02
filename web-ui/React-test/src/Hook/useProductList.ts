import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface ProductState {
  id: number;
  title: string;
  price: string;
  description: string;
}
export const useProductList = () => {
     const [products, setProducts] = useState<ProductState[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductState[]>(
          "http://localhost:3000/products"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.");
        console.error("Lỗi khi fetch sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = (id: number) => {
    setProductIdToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (productIdToDelete === null) return;

    try {
      await axios.delete(`http://localhost:3000/products/${productIdToDelete}`);
      setProducts(products.filter(product => product.id !== productIdToDelete));
      console.log(`Sản phẩm với ID: ${productIdToDelete} đã được xóa thành công.`);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      setError("Không thể xóa sản phẩm. Vui lòng thử lại.");
    } finally {
      setShowConfirmModal(false);
      setProductIdToDelete(null);
    }
  };
  const cancelDelete = () => {
    setShowConfirmModal(false);
    setProductIdToDelete(null);
  };
  const handleEdit = (id: number) => {
    console.log(`Điều hướng đến trang chỉnh sửa sản phẩm với ID: ${id}`);
    navigate(`/products/edit/${id}`);
  };

  const handleShowDetail = (id: number) => {
    console.log(`Điều hướng đến trang chi tiết sản phẩm với ID: ${id}`);
    navigate(`/products/${id}`);
  };
  return {
    handleDelete,
    handleEdit,
    handleShowDetail,
    cancelDelete,
    confirmDelete,
    products,
   loading,
   error,
   showConfirmModal
  }
}