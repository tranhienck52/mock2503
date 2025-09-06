import { useState } from "react";
import { Link } from "react-router-dom";

export default function RsPassByEmail() {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
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

  // const handleConfirm = () => {
  //   setShowPopup(false);
  //   navigate("/");
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-md ">
        <h2 className="text-center text-2xl font-medium text-gray-700">
          ĐỔI MẬT KHẨU
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
              Nhập mật khẩu mới :
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

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nhập lại mật khẩu mới :
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

          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-2 my-2 rounded-md hover:bg-[#8B4513] transition"
          >
            Gửi
          </button>
        </form>

        <div className="mt-4">
          <p className="text-center text-sm">
            Quay lại trang{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              ĐĂNG NHẬP
            </Link>
          </p>
        </div>

        {showPopup && (
          <>
            <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-sm z-4 opacity-0 animate-fadeIn">
              {/* Pop-up */}
              <div className="fixed inset-0 flex items-center  justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg content-center w-80 h-50 text-center opacity-0 scale-90 animate-zoomIn">
                  <h3>Thay đổi mật khẩu thành công !</h3>
                  <div className="mt-4">
                    <p className="text-center text-sm">
                      <Link
                        to="/login"
                        className="text-blue-500 hover:underline"
                      >
                        Quay lại trang đăng nhập
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
