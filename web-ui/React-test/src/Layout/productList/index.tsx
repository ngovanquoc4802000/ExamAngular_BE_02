import { Link } from "react-router-dom";
import { useProductList } from "../../Hook/useProductList";
import styles from "./styles.module.css";

function ProductList() {
  const {
    handleDelete,
    handleEdit,
    handleShowDetail,
    cancelDelete,
    confirmDelete,
    products,
    loading,
    error,
    showConfirmModal,
  } = useProductList();

  if (loading) {
    return (
      <div className={styles.loadingMessage}>
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Danh sách sản phẩm</h2>
        <div className={styles.addButtonContainer}>
          <Link to="/products/add" className={styles.addButton}>
            Thêm mới
          </Link>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeadTh}>#</th>
                <th className={styles.tableHeadTh}>Tên sản phẩm</th>
                <th className={styles.tableHeadTh}>Mô tả</th>
                <th className={styles.tableHeadTh}>Giá</th>
                <th className={styles.tableHeadTh}></th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.id}>
                    <td className={styles.tableBodyTd}>{index + 1}</td>
                    <td
                      className={`${styles.tableBodyTd} ${styles.productNameLink}`}
                    >
                      <Link to={`/products/${product.id}`}>
                        {product.title}
                      </Link>
                    </td>
                    <td className={styles.tableBodyTd}>
                      {product.description}
                    </td>
                    <td className={styles.tableBodyTd}>{product.price}</td>
                    <td
                      className={`${styles.tableBodyTd} ${styles.actionButtons}`}
                    >
                      <button
                        onClick={() => handleShowDetail(product.id)}
                        className={styles.showButton}
                      >
                        Show
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={styles.deleteButton}
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className={styles.editButton}
                      >
                        Sửa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noProducts}>
                    Không có sản phẩm nào để hiển thị.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showConfirmModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Xác nhận xóa</h3>
            <p className={styles.modalMessage}>
              Bạn có chắc chắn muốn xóa sản phẩm này không?
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={cancelDelete}
                className={styles.modalCancelButton}
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className={styles.modalConfirmButton}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
