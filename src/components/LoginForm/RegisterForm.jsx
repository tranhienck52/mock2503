import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
  // ====== State lưu dữ liệu form ======
  const [userName, setUserName] = useState(""); // Tên đăng nhập
  const [fullName, setFullName] = useState(""); // Họ và tên
  const [email, setEmail] = useState(""); // Email
  const [dateOfBirth, setDateOfBirth] = useState(""); // Ngày sinh
  const [password, setPassword] = useState(""); // Mật khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Xác nhận mật khẩu
  const [phoneNumber, setPhoneNumber] = useState(""); // Số điện thoại
  const [address, setAddress] = useState(""); // Địa chỉ
  const [gender, setGender] = useState("Nam"); // Giới tính mặc định Nam
  const [errors, setErrors] = useState({}); // Lưu lỗi validate

  // ====== Hàm validate dữ liệu đầu vào ======
  const validate = () => {
    const newErrors = {};

    // Username
    if (!userName.trim())
      newErrors.userName = "Tên đăng nhập không được để trống";
    else if (userName.length < 6)
      newErrors.userName = "Tên đăng nhập phải có ít nhất 6 ký tự";

    // Full Name
    if (!fullName.trim()) newErrors.fullName = "Họ và tên không được để trống";

    // Email
    if (!email.trim()) newErrors.email = "Email không được để trống";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      newErrors.email = "Email không hợp lệ";

    // Password
    if (!password) newErrors.password = "Mật khẩu không được để trống";
    else if (password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

    // Confirm Password
    if (confirmPassword !== password)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

    // Phone Number
    if (!phoneNumber.trim())
      newErrors.phoneNumber = "Số điện thoại không được để trống";
    else if (!/^[0-9]{10}$/.test(phoneNumber))
      newErrors.phoneNumber = "Số điện thoại phải đủ 10 chữ số";

    // Date of Birth
    if (!dateOfBirth) newErrors.dateOfBirth = "Ngày sinh không được để trống";

    // Address
    if (!address.trim()) newErrors.address = "Địa chỉ không được để trống";

    return newErrors; // Trả về object lỗi
  };

  // ====== Xử lý submit form ======
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    const newErrors = validate(); // Validate form
    setErrors(newErrors); // Hiển thị lỗi nếu có

    if (Object.keys(newErrors).length > 0) return; // Nếu có lỗi thì dừng

    try {
      // Tạo payload gửi lên backend
      const payload = {
        userName,
        fullName,
        email,
        password,
        phoneNumber,
        address,
        gender, // enum "Nam" hoặc "Nữ"
        dateOfBirth, // yyyy-MM-dd
      };

      // Gọi API đăng ký
      const res = await axios.post(
        "http://localhost:8080/api/auth/regist",
        payload
      );
      console.log("Đăng ký thành công:", res.data);
      alert("Đăng ký thành công!");

      // ====== Clear form sau khi đăng ký thành công ======
      setUserName("");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhoneNumber("");
      setAddress("");
      setDateOfBirth("");
      setGender("Nam");
      setErrors({});
    } catch (err) {
      console.error("Đăng ký thất bại:", err.response?.data || err.message);
      alert(
        "Đăng ký thất bại: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-md">
        <h2 className="text-center text-2xl font-semibold text-[#A0522D] mb-6">
          Đăng ký tài khoản
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* ====== Username ====== */}
          <div>
            <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm">{errors.userName}</p>
            )}
          </div>

          {/* ====== Full Name ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          {/* ====== Date of Birth ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Ngày sinh
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* ====== Email ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* ====== Password ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* ====== Confirm Password ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* ====== Phone Number ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          {/* ====== Address ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Địa chỉ
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* ====== Gender ====== */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          {/* ====== Submit Button ====== */}
          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#8B4513] transition"
          >
            ĐĂNG KÝ
          </button>
        </form>

        {/* ====== Link chuyển sang Login ====== */}
        <div className="mt-4 text-center text-sm">
          Quay lại trang{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            ĐĂNG NHẬP
          </Link>
        </div>
      </div>
    </div>
  );
}
