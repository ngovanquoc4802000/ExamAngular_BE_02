import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductState {
  id: number;
  title: string;
  price: string;
  description: string;
}

function ProductList() {
  const [product, setProduct] = useState<ProductState[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get<ProductState[]>(
        "http://localhost:3000/products"
      );
      setProduct(response.data);
    };
    fetch();
  }, []);
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Danh sách sản phẩm
        </h2>
        <div className="mb-4">
          <Link
            to="/products/add"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
          >
            Thêm mới
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                  #
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                  Tên sản phẩm
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                  Mô tả
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300">
                  Giá
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300"></th>{" "}
              </tr>
            </thead>
            <tbody>
              {product.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 text-sm text-blue-600 hover:underline">
                    <Link to={`/products/${product.id}`}>{product.title}</Link>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {product.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {product.price}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 flex space-x-2">
                    <Link
                      to={`/products/delete/${product.id}`} 
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-md shadow-sm transition duration-300 ease-in-out text-xs"
                    >
                      Xóa
                    </Link>
                    <Link
                      to={`/products/edit/${product.id}`} 
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-md shadow-sm transition duration-300 ease-in-out text-xs"
                    >
                      Sửa
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
