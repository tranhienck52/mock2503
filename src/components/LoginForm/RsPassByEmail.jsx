import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RsPassByEmail() {
  // ====== State lưu dữ liệu form ======
  const [password, setPassword] = useState(""); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Xác nhận mật khẩu
  const [errors, setErrors] = useState({}); // Lưu lỗi validate
  const [apiError, setApiError] = useState(""); // Lỗi trả về từ API
  const [showPopup, setShowPopup] = useState(false); // Hiển thị popup thành công
  const [searchParams] = useSearchParams(); // Lấy query param token từ URL
  const navigate = useNavigate(); // Dùng để chuyển hướng

  const token = searchParams.get("token"); // Token reset password từ email link

  // ====== Hàm validate form ======
  const validate = () => {
    const newErrors = {};
    if (!password) newErrors.password = "Mật khẩu không được để trống";
    else if (password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";

    if (confirmPassword !== password)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";

    return newErrors; // Trả về object lỗi
  };

  // ====== Xử lý submit form ======
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    const newErrors = validate(); // Kiểm tra validate
    setErrors(newErrors); // Hiển thị lỗi validate
    setApiError(""); // Reset lỗi API cũ

    if (Object.keys(newErrors).length === 0) {
      try {
        // Gọi API reset password với token và mật khẩu mới
        const response = await axios.post(
          "http://localhost:8080/api/auth/reset-password",
          {
            token,
            newPassword: password,
          }
        );

        // Nếu API trả về 200 thì hiện popup thành công
        if (response.status === 200) {
          setShowPopup(true);
        }
      } catch (error) {
        // Lấy lỗi từ API nếu có, hoặc thông báo lỗi chung
        setApiError(error.response?.data?.error || "Có lỗi xảy ra");
      }
    }
  };

  // ====== Xử lý khi nhấn xác nhận popup ======
  const handleConfirm = () => {
    setShowPopup(false); // Ẩn popup
    navigate("/login"); // Chuyển về trang login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-medium text-gray-700 mb-4">
          ĐỔI MẬT KHẨU
        </h2>

        {/* ====== Form đổi mật khẩu ====== */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nhập mật khẩu mới:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nhập lại mật khẩu mới:
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

          {/* Hiển thị lỗi API */}
          {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-2 my-2 rounded-md hover:bg-[#8B4513] transition"
          >
            Gửi
          </button>
        </form>

        {/* Link quay lại login */}
        <div className="mt-4 text-center text-sm">
          <Link to="/login" className="text-blue-500 hover:underline">
            Quay lại trang đăng nhập
          </Link>
        </div>

        {/* ====== Popup thông báo thành công ====== */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Thay đổi mật khẩu thành công!
              </h3>
              <button
                onClick={handleConfirm} // Nhấn xác nhận đóng popup và chuyển login
                className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#8B4513] transition"
              >
                Xác nhận
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
