import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4 rounded-lg p-2 bg-white shadow-lg">
        404
      </h1>
      <p className="text-2xl font-semibold mb-6 text-center">
        Ôi không! Trang bạn tìm không tồn tại.
      </p>
      <p className="text-lg text-center max-w-md mb-8">
        Có vẻ như bạn đã đi lạc. Đừng lo lắng, điều đó xảy ra với những người
        tốt nhất.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Về trang chủ
      </Link>
    </div>
  );
}

export default NotFound;
