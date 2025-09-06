import { useState } from "react";

export default function UserPassChange() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const storedPassword = "123456";

  const validate = () => {
    const newErrors = {};
    // Kiểm tra mật khẩu cũ
    if (!oldPassword) {
      newErrors.oldPassword = "Vui lòng nhập mật khẩu cũ";
    } else if (oldPassword !== storedPassword) {
      newErrors.oldPassword = "Mật khẩu cũ không đúng";
    }

    // Kiểm tra mật khẩu mới
    if (!newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }

    // Kiểm tra xác nhận mật khẩu
    if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Đổi mật khẩu thành công!");
      // TODO: gọi API update mật khẩu ở đây
    }
  };
  return (
    <div className="w-2/3 p-6">
      <h1 className="text-2xl font-bold text-[#9c5136] mb-6 border-solid border-b-1 border-[#9c5136]/30">
        Thay đổi mật khẩu
      </h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
            Nhập mật khẩu cũ :
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Nhập mật khẩu cũ"
            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 mt-2 text-sm font-medium text-gray-700">
            Nhập mật khẩu mới :
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            className="w-full px-2 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
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
    </div>
  );
}
