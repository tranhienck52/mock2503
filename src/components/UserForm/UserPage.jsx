import { useState } from "react";
import { Link, Outlet, useOutletContext, useNavigate } from "react-router-dom";

export default function UserPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State hiển thị popup logout

  // Lấy userInfo và setUserInfo từ Outlet context
  const { userInfo, setUserInfo } = useOutletContext();

  // Nếu chưa login, hiển thị thông báo
  if (!userInfo) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg">
        Bạn chưa đăng nhập.
      </p>
    );
  }

  // Mở/đóng popup đăng xuất
  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  // Logout: xóa token, reset userInfo, chuyển về trang login
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("jwt");
    setUserInfo(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white min-h-screen shadow-lg rounded-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Sidebar trái */}
        <div className="w-1/4 text-[#9c5136] p-6 flex flex-col items-center border-gray-200 shadow-lg mr-4 rounded-2xl">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl font-bold shadow-lg mb-4">
            {userInfo.fullName ? userInfo.fullName.charAt(0) : "?"}
          </div>
          <h2 className="text-lg font-semibold text-center">
            {userInfo.fullName || "Người dùng"}
          </h2>

          {/* Navigation menu */}
          <nav className="mt-6 w-full">
            <ul className="space-y-2">
              <li className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer border-b-2 border-dotted border-[#9c5136]/30">
                <Link to="/userPage/userInfo">Thông tin tài khoản</Link>
              </li>
              <li className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer border-b-2 border-dotted border-[#9c5136]/30">
                <Link to="/userPage/address">Danh sách địa chỉ</Link>
              </li>
              <li className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer border-b-2 border-dotted border-[#9c5136]/30">
                <Link to="/userPage/passChange">Thay đổi mật khẩu</Link>
              </li>
              <li className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer border-b-2 border-dotted border-[#9c5136]/30">
                <Link to="/userPage/userSupport">Hỗ trợ khách hàng</Link>
              </li>
              {/* Logout */}
              <li
                className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer"
                onClick={handleOpenPopup}
              >
                Đăng xuất
              </li>
            </ul>
          </nav>
        </div>

        {/* Popup logout */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">
                Bạn có muốn đăng xuất không?
              </h3>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleClosePopup}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Không
                </button>
                <button
                  onClick={handleLogout} // Logout thực tế
                  className="px-4 py-2 bg-[#9c5136] text-white rounded hover:bg-gray-500"
                >
                  Có
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main content (UserInfo, AddressList, etc.) */}
        <div className="flex-1 p-6">
          <Outlet context={{ userInfo, setUserInfo }} />
        </div>
      </div>
    </div>
  );
}
