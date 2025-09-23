import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import api from "./Api";

export default function LoginForm() {
  // State lưu dữ liệu form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // Lưu tài khoản
  const [errors, setErrors] = useState({}); // Lưu lỗi validate
  const navigate = useNavigate(); // Dùng để chuyển trang
  const { setUserInfo } = useOutletContext(); // Lấy hàm setUserInfo từ context cha

  // Hàm validate form
  const validate = () => {
    const newErrors = {};

    // Kiểm tra username
    if (!username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống";
    } else if (username.length < 6) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 6 ký tự";
    }

    // Kiểm tra password
    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    return newErrors;
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors); // Hiển thị lỗi nếu có

    // Nếu không có lỗi, gọi API đăng nhập
    if (Object.keys(newErrors).length === 0) {
      try {
        const res = await api.post("/auth/login", { username, password }); // Gọi API login
        const token = res.data.token; // Lấy token trả về
        const user = res.data.user; // Lấy thông tin user từ backend
        setUserInfo(user); // Cập nhật user vào context

        // Lưu token vào localStorage hoặc sessionStorage tùy chọn "remember"
        if (remember) localStorage.setItem("jwt", token);
        else sessionStorage.setItem("jwt", token);

        navigate("/userPage"); // Chuyển sang trang user
      } catch (err) {
        console.error(err);
        alert("Đăng nhập thất bại! Kiểm tra lại tên đăng nhập hoặc mật khẩu.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-full max-w-sm">
        <h2 className="text-center text-2xl font-semibold text-[#A0522D] mb-6">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tên đăng nhập */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 ">
              Tên đăng nhập
            </label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Cập nhật state username
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-brown-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Nhập mật khẩu */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
              placeholder="Nhập mật khẩu"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Checkbox lưu tài khoản & link quên mật khẩu */}
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)} // Cập nhật state remember
                className="h-4 w-4 text-brown-600 focus:ring-brown-500 border-gray-300 rounded"
              />
              <span>Lưu tài khoản</span>
            </div>
            <div>
              <Link to={"/resetpass"} className="text-blue-500 hover:underline">
                Quên mật khẩu
              </Link>
            </div>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#8B4513] transition"
          >
            ĐĂNG NHẬP
          </button>
        </form>

        {/* Link đăng ký & quay lại trang chủ */}
        <div className="mt-4">
          <p className="text-center text-sm">
            Chưa có tài khoản?{"  "}
            <Link to="/register" className="text-blue-500 hover:underline">
              ĐĂNG KÝ
            </Link>
          </p>

          <p className="text-center text-sm">
            <Link to="/" className="text-blue-500 hover:underline">
              Quay lại trang chủ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
