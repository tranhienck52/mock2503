import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function UserInfo() {
  const { userInfo, setUserInfo } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUserInfo(formData);
    setIsEditing(false);
  };

  const userFields = [
    { label: "Username", key: "username" },
    { label: "Họ và tên", key: "fullname" },
    { label: "Giới tính", key: "gender" },
    { label: "Email", key: "email" },
    { label: "Số điện thoại", key: "phone" },
    { label: "Ngày sinh", key: "dob" },
    { label: "Địa chỉ", key: "address" },
  ];
  return (
    <div className="w-2/3 p-6">
      <h1 className="text-2xl font-bold text-[#9c5136] mb-6 border-solid border-b-1 border-[#9c5136]/30">
        Tài khoản của bạn
      </h1>

      {!isEditing ? (
        <>
          <table className="w-full border border-[#9c5136] text-left rounded-lg overflow-hidden">
            <tbody>
              {userFields.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#9c5136]/20 last:border-b-0"
                >
                  <td className="p-2 font-medium bg-gray-100 w-1/3">
                    {item.label}
                  </td>
                  <td className="p-2">{userInfo[item.key]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 flex items-center gap-2 bg-[#9c5136] hover:bg-gray-500 text-white px-4 py-2 rounded-xl shadow"
          >
            Chỉnh sửa thông tin cá nhân
          </button>
        </>
      ) : (
        <>
          <form className="space-y-4">
            {userFields.map((item, index) => (
              <div key={index}>
                <label className="block font-medium mb-1">{item.label}</label>
                <input
                  type="text"
                  name={item.key}
                  value={formData[item.key]}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c5136]"
                />
              </div>
            ))}
          </form>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              className="bg-[#9c5136] hover:bg-gray-500 text-white px-4 py-2 rounded-xl shadow"
            >
              Lưu
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-xl shadow"
            >
              Hủy
            </button>
          </div>
        </>
      )}
    </div>
  );
}
