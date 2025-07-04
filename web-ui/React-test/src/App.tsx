import { Link, Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import ProductList from "./Layout/productList";
import ProductDetail from "./Layout/productDetail";
import AddProduct from "./Layout/addProduct";
import UpdateProduct from "./Layout/updateProduct/index,";
import DeleteProduct from "./Layout/deleteProduct";
import NotFound from "./Layout/notfound";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/">Danh sách sản phẩm</Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/products/add">Thêm mới</Link>
          </li>
        </ul>
      </nav>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Routes>
          <Route index path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<UpdateProduct />} />
          <Route path="/products/delete/:id" element={<DeleteProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
