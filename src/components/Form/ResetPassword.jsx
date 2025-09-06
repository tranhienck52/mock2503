import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setShowPopup(true);
    }
  };

  const handleConfirm = () => {
    setShowPopup(false);
    navigate("/resetpass"); // chuyển về trang đăng nhập
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {/* flex items-center justify-center min-h-screen bg-gray-100 */}
      <div className="bg-white shadow-md rounded-lg p-8 mb-6 w-full max-w-md">
        <h2 className="text-center text-2xl mb-4 text-gray-800">
          Khôi phục mật khẩu
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4 mt-2">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Nhập Email của bạn :
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

            <div className="mx-2">
              <p className="text-center text-sm px-2">
                Hệ thống sẽ gửi link khôi phục đến email của bạn.{" "}
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#8B4513] transition"
            >
              Khôi phục
            </button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-center text-sm">
            <Link to="/login" className="text-blue-500 hover:underline">
              TRỞ LẠI ĐĂNG NHẬP
            </Link>
          </p>
        </div>

        {showPopup && (
          <>
            {/* Overlay mờ nền */}
            <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-sm z-4 opacity-0 animate-fadeIn">
              {/* Pop-up */}
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center opacity-0 scale-90 animate-zoomIn">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Gửi thành công!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Xin hãy vui lòng kiểm tra lại Email của bạn!
                  </p>
                  <button
                    onClick={handleConfirm}
                    className="w-full bg-[#A0522D] text-white py-2 rounded-md hover:bg-[#8B4513] transition"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
