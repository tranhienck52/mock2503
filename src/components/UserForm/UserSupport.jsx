import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

const ticketsMock = [
  {
    id: 1,
    title: "Vé máy bay bị lỗi",
    status: "Đang xử lý",
    time: "07:04:27 17/6/2025",
    messages: [
      { sender: "user", text: "Tôi chưa nhận vé.", time: "07:04" },
      { sender: "admin", text: "bạn đợi mình xíu 😅", time: "22:08" },
    ],
  },
  {
    id: 2,
    title: "trả tiền những lỗi",
    status: "Đang xử lý",
    time: "22:08:34 3/7/2025",
    messages: [],
  },
  {
    id: 3,
    title: "fff",
    status: "Đang xử lý",
    time: "20:24:59 22/8/2025",
    messages: [],
  },
  {
    id: 4,
    title: "muốn đổi lịch khách sạn",
    status: "Đang xử lý",
    time: "21:47:43 23/8/2025",
    messages: [],
  },
];

export default function UserSupport() {
  const [tickets, setTickets] = useState(ticketsMock);
  const [activeTicket, setActiveTicket] = useState(ticketsMock[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const updatedTicket = {
      ...activeTicket,
      messages: [
        ...activeTicket.messages,
        { sender: "user", text: newMessage, time: "Now" },
      ],
    };
    setTickets((prev) =>
      prev.map((t) => (t.id === activeTicket.id ? updatedTicket : t))
    );
    setActiveTicket(updatedTicket);
    setNewMessage("");
  };

  return (
    <div className="h-screen w-2/3 p-6">
      <div className="flex items-center justify-between p-4 border-b border-[#9c5136]/30">
        <h2 className="font-bold text-lg">📂 Lịch sử hỗ trợ</h2>
        <button className="bg-[#9c5136]/100 hover:bg-gray-300 hover:text-black text-white text-sm px-3 py-1 rounded-lg">
          + Gửi yêu cầu mới
        </button>
      </div>
      <div>
        {/* Sidebar */}
        <div className="w-1/3 border-r bg-white shadow-md">
          <div className="overflow-y-auto h-full">
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTicket(t)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
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
        </div>

        {/* Chat box */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header */}
          <div className="p-4 border-b bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{activeTicket.title}</h3>
              <span className="text-sm opacity-90">{activeTicket.status}</span>
            </div>
            <MessageCircle size={20} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Nhập nội dung hỗ trợ..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg shadow flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
