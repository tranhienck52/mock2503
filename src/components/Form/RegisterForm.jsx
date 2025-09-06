import { useState } from "react";
import { FaFacebook, FaGoogle, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Tên đăng nhập không được để trống";
    } else if (username.length < 6) {
      newErrors.username = "Tên đăng nhập phải có ít nhất 6 ký tự";
    }

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (!phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{9,11}$/.test(phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form đăng ký hợp lệ:", {
        username,
        fullname,
        dob,
        email,
        password,
        phone,
      });
      alert("Đăng ký thành công!");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-md">
        <h2 className="text-center text-2xl font-semibold text-[#A0522D] mb-6">
          Đăng ký tài khoản
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Nhập họ và tên"
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
          </div>

          <div>
            <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
              Ngày sinh
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
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
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#A0522D]"
            />

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />

            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />

            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#8B4513] transition"
          >
            ĐĂNG KÝ
          </button>
        </form>

        {/* Social login */}
        {/* <div className="flex justify-center gap-4 my-6">
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
            Quay lại trang{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              ĐĂNG NHẬP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
