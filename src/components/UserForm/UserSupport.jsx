import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";

// Dữ liệu mock ban đầu
const ticketsMock = [
  {
    id: 1,
    title: "Đặt bánh bị lỗi",
    status: "Đang xử lý",
    time: "07:04:27 7/8/2025",
    messages: [],
  },
  {
    id: 2,
    title: "trả tiền những lỗi",
    status: "Đang xử lý",
    time: "22:08:34 28/7/2025",
    messages: [],
  },
  {
    id: 3,
    title: "Tôi muốn hủy bánh",
    status: "Đang xử lý",
    time: "20:24:59 22/7/2025",
    messages: [],
  },
  {
    id: 4,
    title: "Làm sao để thanh toán được bằng vnpay",
    status: "Đang xử lý",
    time: "21:47:43 20/7/2025",
    messages: [],
  },
];

export default function UserSupport() {
  const [tickets, setTickets] = useState(ticketsMock); // State lưu danh sách ticket
  const [activeTicket, setActiveTicket] = useState(ticketsMock[0]); // Ticket đang active
  const [newMessage, setNewMessage] = useState(""); // Input message
  const [showPopup, setShowPopup] = useState(false); // Popup tạo ticket mới
  const [newTicketTitle, setNewTicketTitle] = useState(""); // Tiêu đề ticket mới
  const [newTicketMessage, setNewTicketMessage] = useState(""); // Nội dung ticket mới

  // Ref để auto scroll
  const messagesEndRef = useRef(null);
  const ticketEndRef = useRef(null);

  // Scroll xuống tin nhắn mới khi activeTicket.messages thay đổi
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket.messages]);

  // Scroll danh sách tickets khi có messages mới (không thực sự cần vì tickets.messages ko tồn tại)
  useEffect(() => {
    ticketEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [tickets.messages]);

  // Gửi tin nhắn mới
  const handleSend = () => {
    if (!newMessage.trim()) return; // Không gửi nếu rỗng
    const now = new Date().toLocaleString("vi-VN"); // Thời gian hiện tại
    const updatedTicket = {
      ...activeTicket,
      messages: [
        ...activeTicket.messages,
        { sender: "user", text: newMessage, time: now },
      ],
    };
    setTickets((prev) =>
      prev.map((t) => (t.id === activeTicket.id ? updatedTicket : t))
    );
    setActiveTicket(updatedTicket); // Cập nhật ticket active
    setNewMessage(""); // Xóa input
  };

  // Tạo ticket mới
  const handleCreateTicket = () => {
    if (!newTicketTitle.trim()) return; // Không tạo nếu title rỗng
    const now = new Date().toLocaleString("vi-VN");
    const newTicket = {
      id: Date.now(), // ID tạm thời
      title: newTicketTitle,
      status: "Đang xử lý",
      time: now,
      messages: newTicketMessage
        ? [{ sender: "user", text: newTicketMessage, time: now }]
        : [],
    };
    setTickets((prev) => [newTicket, ...prev]); // Thêm ticket mới lên đầu
    setActiveTicket(newTicket); // Chọn ticket mới
    setNewTicketTitle("");
    setNewTicketMessage("");
    setShowPopup(false); // Đóng popup
  };

  return (
    <div className="h-screen w-full p-6">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#9c5136]/30">
        <h2 className="font-bold text-lg">📂 Lịch sử hỗ trợ</h2>
        <button
          className="bg-[#9c5136]/100 hover:bg-gray-300 hover:text-black text-white text-sm px-3 py-1 rounded-lg"
          onClick={() => setShowPopup(true)}
        >
          + Gửi yêu cầu mới
        </button>
      </div>

      <div className="flex gap-3">
        {/* Sidebar danh sách tickets */}
        <div className="h-[80vh] w-1/3 bg-white mt-4">
          <div className="overflow-y-auto max-h-[460px]">
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTicket(t)}
                className={`p-4 border border-[#9c5136]/10 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  activeTicket.id === t.id ? "bg-purple-50" : ""
                }`}
              >
                <span className="text-yellow-600 text-xs bg-yellow-100 px-2 py-0.5 rounded">
                  {t.status}
                </span>
                <h3 className="font-semibold text-gray-800 mt-1">{t.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{t.time}</p>
              </div>
            ))}
          </div>
          <div ref={ticketEndRef}></div>
        </div>

        {/* Chat box */}
        <div className="flex-1 flex flex-col bg-white w-2/3 mt-4 rounded-lg h-[80vh]">
          {/* Header chat */}
          <div className="p-4 border-b bg-gradient-to-r from-amber-800 to-blue-800 text-white flex items-center justify-between rounded-lg">
            <div>
              <h3 className="font-semibold">{activeTicket.title}</h3>
              <span className="text-sm opacity-90">{activeTicket.status}</span>
            </div>
            <MessageCircle size={20} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px] border border-[#9c5136]/10">
            {activeTicket.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-xl shadow ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-xs mt-1 opacity-70 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input chat */}
          <div className="p-4 border border-[#9c5136]/10 flex gap-2">
            <input
              type="text"
              placeholder="Nhập nội dung hỗ trợ..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-amber-800 to-blue-800 text-white px-4 py-2 rounded-lg shadow flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Popup tạo ticket mới */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-96 p-6 rounded-2xl shadow-xl animate-zoomIn">
            <h3 className="text-lg font-bold mb-4">📩 Gửi yêu cầu mới</h3>
            <input
              type="text"
              placeholder="Tiêu đề yêu cầu"
              value={newTicketTitle}
              onChange={(e) => setNewTicketTitle(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Nội dung chi tiết"
              value={newTicketMessage}
              onChange={(e) => setNewTicketMessage(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateTicket}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-800 to-blue-800 text-white"
              >
                Tạo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
