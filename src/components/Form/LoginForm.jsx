import { useState } from "react";
// import { FaFacebook, FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
// import { FaFacebook } from "react-icons/fa";
// import { FaGoogle } from "react-icons/fa";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống";
    } else if (username.length < 6) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 6 ký tự";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Thông tin đăng nhập:", { username, password });
      alert("Đăng nhập thành công!");

      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-full max-w-sm">
        <h2 className="text-center text-2xl font-semibold text-[#A0522D] mb-6">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 ">
              Tên đăng nhập
            </label>
            <input
              type="text"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-brown-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brown-400"
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
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

          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#8B4513] transition"
          >
            ĐĂNG NHẬP
          </button>
        </form>
        {/* 
        <div className="flex justify-center gap-4 my-6">
          <a href="#" className="text-blue-600 hover:scale-110 transition">
            <FaFacebook size={22} />
          </a>
          <a href="#" className="text-red-600 hover:scale-110 transition">
            <FaGoogle size={22} />
          </a>
          <a href="#" className="text-gray-800 hover:scale-110 transition">
            <FaGithub size={22} />
          </a>
          <a href="#" className="text-sky-500 hover:scale-110 transition">
            <FaTwitter size={22} />
          </a>
        </div> */}

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
