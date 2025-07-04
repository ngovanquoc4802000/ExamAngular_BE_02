import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductList from "./Layout/productList";
import ProductDetail from "./Layout/productDetail";
import AddProduct from "./Layout/addProduct";
import UpdateProduct from "./Layout/updateProduct/index,";
import DeleteProduct from "./Layout/deleteProduct";
import NotFound from "./Layout/notfound";

function App() {
  return (
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-8 p-4 bg-white shadow rounded-lg">
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Danh sách sản phẩm
              </Link>
            </li>
            <li>
              <Link
                to="/products/add"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Thêm mới
              </Link>
            </li>
          </ul>
        </nav>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Routes>
            {/* Màn hình 1: Xem danh sách sản phẩm */}
            <Route index path="/" element={<ProductList />} />

            {/* Màn hình 2: Xem chi tiết sản phẩm (sử dụng tham số động :id) */}
            <Route path="/products/:id" element={<ProductDetail />} />
            {/* Màn hình 3: Thêm mới */}
           <Route path="/products/add" element={<AddProduct />} />

            {/* Màn hình 4: Cập nhật (sử dụng tham số động :id) */}
           <Route path="/products/edit/:id" element={<UpdateProduct />} /> 

            {/* Màn hình 5: Xóa (sử dụng tham số động :id) */}
            <Route path="/products/delete/:id" element={<DeleteProduct />} /> 

            {/* Route cho các đường dẫn không khớp */}
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </div>
      </div>
  );
}

export default App;
