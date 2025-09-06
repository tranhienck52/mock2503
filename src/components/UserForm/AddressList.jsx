import { useEffect, useState } from "react";

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Load dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const saved = localStorage.getItem("addresses");
    if (saved) {
      setAddresses(JSON.parse(saved));
    } else {
      setAddresses([
        {
          id: 1,
          name: "NGUYỄN VĂN A",
          address: "Đường 1, Quận 2, Hà Nội",
          phone: "0123.456.789",
        },
        {
          id: 2,
          name: "NGUYỄN VĂN A",
          address: "Đường 4, Quận 5, Hà Nội",
          phone: "0123.456.789",
        },
        { id: 3, name: "NGUYỄN VĂN B", address: "HN", phone: "0123.456.789" },
      ]);
    }
  }, []);

  // Mỗi khi addresses thay đổi thì lưu vào localStorage
  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("addresses", JSON.stringify(addresses));
    }
  }, [addresses]);

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleOpenPopup = () => {
    setFormData({ name: "", address: "", phone: "" });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newAddress = {
      id: Date.now(),
      ...formData,
    };
    setAddresses([...addresses, newAddress]);
    setShowPopup(false);
  };

  return (
    <div className="w-2/3 p-6">
      <h1 className="text-2xl font-bold text-[#9c5136] mb-6 border-solid border-b-1 border-[#9c5136]/30">
        Danh sách địa chỉ nhận hàng
      </h1>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleOpenPopup}
          className="px-4 py-2 rounded text-white bg-[#9c5136] hover:bg-gray-500"
        >
          Nhập địa chỉ mới
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="border rounded-lg p-3 shadow-sm">
            <p className="font-bold">{addr.name}</p>
            <p>Địa chỉ : {addr.address}</p>
            <p>Số điện thoại : {addr.phone}</p>
            <button
              onClick={() => handleDelete(addr.id)}
              className="mt-2 px-3 py-1 bg-[#9c5136] text-white rounded hover:bg-gray-500"
            >
              Xóa địa chỉ
            </button>
          </div>
        ))}
      </div>

      {showPopup && (
        // <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-sm z-4 opacity-0 animate-fadeIn">
        <div className="fixed inset-0 bg-black/10 bg-opacity-30 backdrop-blur-sm z-4 opacity-0 animate-fadeIn">
          <div className="flex fixed inset-0 items-center justify-center  h-96 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 opacity-0 scale-90 animate-zoomIn">
              <h3 className="text-lg font-bold mb-4">Nhập địa chỉ mới</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Tên người nhận"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleClosePopup}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#9c5136] text-white rounded hover:bg-gray-500"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
