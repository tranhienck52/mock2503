import { useState } from "react";
import UserInfo from "./UserInfo";
import AddressList from "./AddressList";
import { Link, Outlet } from "react-router-dom";

export default function UserPage() {
  const [userInfo, setUserInfo] = useState({
    username: "nva0001",
    fullname: "NGUYỄN VĂN A",
    gender: "Nam",
    email: "nguyenvana@gmail.com",
    phone: "0123.456.789",
    dob: "29-2-1990",
    address: "VN",
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white min-h-screen shadow-lg rounded-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 text-[#9c5136] p-6 flex flex-col items-center border-gray-200 shadow-lg mr-4 rounded-2xl">
          <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-blue-600 text-4xl font-bold shadow-lg mb-4">
            {userInfo.fullname.charAt(0)}
          </div>
          <h2 className="text-lg font-semibold">{userInfo.fullname}</h2>
          <nav className="mt-6 w-full">
            <ul className="space-y-2">
              <li className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer border-b-2 border-dotted border-[#9c5136]/30">
                <Link to="/userPage/userInfo">Thông tin tài khoản</Link>
              </li>
              <li className=" hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer border-b-2 border-dotted border-[#9c5136]/30">
                <Link to="/userPage/address">Danh sách địa chỉ</Link>
              </li>
              <li className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer border-b-2 border-dotted border-[#9c5136]/30">
                <Link to="/userPage/passChange">Thay đổi mật khẩu</Link>
              </li>
              <li className="hover:bg-gray-100 hover:text-black px-4 py-2 cursor-pointer">
                <Link to="/userPage/userSupport">Hỗ trợ khách hàng</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
        <AddressList /> */}
        <Outlet context={{ userInfo, setUserInfo }} />
      </div>
    </div>
  );
}
